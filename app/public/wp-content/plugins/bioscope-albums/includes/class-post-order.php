<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
class Bioscope_Albums_Post_Order {
    public static function init() {
        add_action( 'init', function(){ add_post_type_support( 'post', 'page-attributes' ); } );
        add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'assets' ) );
        add_action( 'wp_ajax_bioscope_albums_save_order', array( __CLASS__, 'save' ) );
    }
    public static function menu() { add_submenu_page( 'edit.php', 'Reorder Posts', 'Reorder Posts', 'edit_others_posts', 'bioscope-albums-order', array( __CLASS__, 'page' ) ); }
    public static function assets( $hook ) {
        if ( 'posts_page_bioscope-albums-order' !== $hook ) return;
        wp_enqueue_script('jquery-ui-sortable'); wp_enqueue_style('bioscope-albums-admin', BIOSCOPE_ALBUMS_URL.'assets/admin.css', array(), BIOSCOPE_ALBUMS_VERSION);
        wp_enqueue_script('bioscope-albums-admin', BIOSCOPE_ALBUMS_URL.'assets/admin.js', array('jquery','jquery-ui-sortable'), BIOSCOPE_ALBUMS_VERSION, true);
        wp_localize_script('bioscope-albums-admin','BioscopeAlbumsOrder',array('ajaxUrl'=>admin_url('admin-ajax.php'),'nonce'=>wp_create_nonce('bioscope_albums_order'),'saving'=>'Saving…','saved'=>'Order saved.','error'=>'Could not save order.'));
    }
    public static function page() {
        if ( ! current_user_can('edit_others_posts') ) wp_die('Permission denied.');
        $posts=get_posts(array('post_type'=>'post','post_status'=>'publish','posts_per_page'=>-1,'orderby'=>array('menu_order'=>'ASC','date'=>'DESC'))); ?>
        <div class="wrap bioscope-pom-wrap"><h1>Reorder Posts</h1><p>Drag posts to set their order. The Albums block uses this order.</p>
        <?php if($posts): ?><ul id="bioscope-pom-sortable" class="bioscope-pom-list"><?php foreach($posts as $p): ?><li class="bioscope-pom-item" data-post-id="<?php echo esc_attr($p->ID); ?>"><span class="bioscope-pom-handle">⠿</span><span class="bioscope-pom-thumb"><?php echo get_the_post_thumbnail($p->ID,'thumbnail'); ?></span><span class="bioscope-pom-title"><?php echo esc_html(get_the_title($p->ID) ?: '(no title)'); ?></span><a href="<?php echo esc_url(get_edit_post_link($p->ID)); ?>">Edit</a></li><?php endforeach; ?></ul><p><button class="button button-primary" id="bioscope-pom-save">Save Order</button> <span id="bioscope-pom-status" role="status"></span></p><?php else: ?><p>No published posts.</p><?php endif; ?></div><?php
    }
    public static function save() {
        check_ajax_referer('bioscope_albums_order','nonce');
        if(!current_user_can('edit_others_posts')) wp_send_json_error(array('message'=>'Permission denied'),403);
        $raw=isset($_POST['post_ids'])?wp_unslash($_POST['post_ids']):array(); if(!is_array($raw)) wp_send_json_error(array('message'=>'Invalid order'),400);
        foreach(array_values(array_unique(array_filter(array_map('absint',$raw)))) as $position=>$id){$p=get_post($id);if($p && 'post'===$p->post_type && 'publish'===$p->post_status) wp_update_post(array('ID'=>$id,'menu_order'=>$position));}
        wp_send_json_success(array('message'=>'Saved'));
    }
}
