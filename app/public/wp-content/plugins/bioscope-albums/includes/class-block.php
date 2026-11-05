<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
class Bioscope_Albums_Block {
    public static function init() {
        add_action('init',array(__CLASS__,'register'));
        add_action('enqueue_block_editor_assets',array(__CLASS__,'enqueue_editor_assets'));
    }
    public static function register() { register_block_type(BIOSCOPE_ALBUMS_DIR.'blocks/albums',array('render_callback'=>array('Bioscope_Albums_Render','render'))); }
    public static function enqueue_editor_assets() {
        wp_enqueue_script('bioscope-albums-editor-masonry',BIOSCOPE_ALBUMS_URL.'assets/masonry.js',array(),BIOSCOPE_ALBUMS_VERSION,true);
    }
}
