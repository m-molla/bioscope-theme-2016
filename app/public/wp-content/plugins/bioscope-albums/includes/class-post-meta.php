<?php
if (!defined('ABSPATH')) {
    exit;
}
class Bioscope_Albums_Post_Meta
{
    const KEY = '_bioscope_album_image_height';
    public static function init()
    {
        add_action('init', array(__CLASS__, 'register'));
        add_action('add_meta_boxes', array(__CLASS__, 'box'));
        add_action('save_post_post', array(__CLASS__, 'save'));
    }
    public static function register()
    {
        register_post_meta('post', self::KEY, array(
            'type' => 'integer',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'absint',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ));
    }
    public static function box()
    {
        add_meta_box('bioscope-album-height', 'Image Height', array(__CLASS__, 'field'), 'post', 'side', 'default');
    }
    public static function field($post)
    {
        wp_nonce_field('bioscope_album_height', 'bioscope_album_height_nonce');
        $value = (int) get_post_meta($post->ID, self::KEY, true); ?><label for="bioscope_album_image_height">Featured
            image height (px)</label><input style="width:100%;margin-top:6px" type="number" min="80" max="2000" step="1"
            id="bioscope_album_image_height" name="bioscope_album_image_height" value="<?php echo esc_attr($value); ?>"
            placeholder="Use natural image height">
        <p class="description">Set a custom height for this post's featured image. Leave blank to preserve its natural aspect
            ratio.</p>
    <?php }
    public static function save($post_id)
    {
        if (!isset($_POST['bioscope_album_height_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['bioscope_album_height_nonce'])), 'bioscope_album_height'))
            return;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return;
        if (!current_user_can('edit_post', $post_id))
            return;
        $v = isset($_POST['bioscope_album_image_height']) ? absint($_POST['bioscope_album_image_height']) : 0;
        if ($v >= 80 && $v <= 2000)
            update_post_meta($post_id, self::KEY, $v);
        else
            delete_post_meta($post_id, self::KEY);
    }
}
