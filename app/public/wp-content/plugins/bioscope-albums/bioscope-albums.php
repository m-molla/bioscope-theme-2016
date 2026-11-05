<?php
/**
 * Plugin Name: Bioscope Albums
 * Description: Responsive, ordered masonry albums as a Gutenberg block using per-post featured-image heights.
 * Version: 2.0.5
 * Author: Bioscope
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: bioscope-albums
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
define( 'BIOSCOPE_ALBUMS_VERSION', '2.0.5' );
define( 'BIOSCOPE_ALBUMS_FILE', __FILE__ );
define( 'BIOSCOPE_ALBUMS_DIR', plugin_dir_path( __FILE__ ) );
define( 'BIOSCOPE_ALBUMS_URL', plugin_dir_url( __FILE__ ) );
require_once BIOSCOPE_ALBUMS_DIR . 'includes/class-post-order.php';
require_once BIOSCOPE_ALBUMS_DIR . 'includes/class-post-meta.php';
require_once BIOSCOPE_ALBUMS_DIR . 'includes/class-block.php';
require_once BIOSCOPE_ALBUMS_DIR . 'includes/class-render.php';
Bioscope_Albums_Post_Order::init();
Bioscope_Albums_Post_Meta::init();
Bioscope_Albums_Block::init();
// Backward compatibility: existing shortcode pages continue to work.
add_shortcode( 'bioscope_masonry_posts', function( $atts ) {
    $atts = shortcode_atts( array( 'posts_per_page'=>12, 'columns'=>3, 'tablet_columns'=>2, 'mobile_columns'=>1, 'gap'=>24, 'category'=>'', 'show_title'=>'yes' ), $atts, 'bioscope_masonry_posts' );
    return Bioscope_Albums_Render::render( array(
        'postsPerPage'=>(int)$atts['posts_per_page'], 'desktopColumns'=>(int)$atts['columns'],
        'tabletColumns'=>(int)$atts['tablet_columns'], 'mobileColumns'=>(int)$atts['mobile_columns'],
        'gap'=>(int)$atts['gap'], 'category'=>sanitize_title($atts['category']),
        'showTitle'=>strtolower((string)$atts['show_title']) !== 'no',
    ) );
} );
