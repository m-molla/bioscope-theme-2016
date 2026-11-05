<?php
/**
 * Plugin Name: Bioscope Wistia Video Player
 * Description: A Gutenberg block for self-hosted or Wistia-delivered MP4 videos with Bioscope's custom responsive controls.
 * Version: 1.0.0
 * Requires at least: 6.2
 * Requires PHP: 7.4
 * Author: Bioscope
 * Text Domain: bioscope-wistia-player
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function bwp_register_block() {
    $dir = plugin_dir_path( __FILE__ );
    $url = plugin_dir_url( __FILE__ );

    wp_register_script(
        'bwp-editor',
        $url . 'assets/editor.js',
        array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
        file_exists( $dir . 'assets/editor.js' ) ? filemtime( $dir . 'assets/editor.js' ) : '1.0.0',
        true
    );
    wp_register_script(
        'bwp-player',
        $url . 'assets/player.js',
        array(),
        file_exists( $dir . 'assets/player.js' ) ? filemtime( $dir . 'assets/player.js' ) : '1.0.0',
        true
    );
    wp_register_style(
        'bwp-player',
        $url . 'assets/player.css',
        array(),
        file_exists( $dir . 'assets/player.css' ) ? filemtime( $dir . 'assets/player.css' ) : '1.0.0'
    );

    register_block_type( 'bioscope/wistia-player', array(
        'api_version'     => 2,
        'editor_script'   => 'bwp-editor',
        'style'           => 'bwp-player',
        'editor_style'    => 'bwp-player',
        'render_callback' => 'bwp_render_player',
        'attributes'      => array(
            'videoUrl' => array( 'type' => 'string', 'default' => '' ),
            'posterUrl' => array( 'type' => 'string', 'default' => '' ),
            'qualities' => array( 'type' => 'string', 'default' => '' ),
            'aspectRatio' => array( 'type' => 'string', 'default' => '16:9' ),
            'borderRadius' => array( 'type' => 'number', 'default' => 12 ),
            'preload' => array( 'type' => 'string', 'default' => 'metadata' ),
        ),
    ) );
}
add_action( 'init', 'bwp_register_block' );

function bwp_render_player( $attributes ) {
    $video_url = isset( $attributes['videoUrl'] ) ? esc_url( trim( $attributes['videoUrl'] ) ) : '';
    if ( ! $video_url ) {
        if ( is_admin() ) { return '<div class="bwp-empty">Add a Wistia MP4 delivery URL in the block settings.</div>'; }
        return '';
    }
    $poster = isset( $attributes['posterUrl'] ) ? esc_url( trim( $attributes['posterUrl'] ) ) : '';
    $ratio = isset( $attributes['aspectRatio'] ) ? $attributes['aspectRatio'] : '16:9';
    $ratio_map = array( '16:9' => '56.25%', '4:3' => '75%', '1:1' => '100%', '9:16' => '177.7778%', 'custom' => '56.25%' );
    $padding = isset( $ratio_map[$ratio] ) ? $ratio_map[$ratio] : '56.25%';
    $radius = isset( $attributes['borderRadius'] ) ? max( 0, min( 60, absint( $attributes['borderRadius'] ) ) ) : 12;
    $preload = isset( $attributes['preload'] ) && in_array( $attributes['preload'], array( 'none', 'metadata', 'auto' ), true ) ? $attributes['preload'] : 'metadata';

    $quality_lines = isset( $attributes['qualities'] ) ? preg_split( '/\r\n|\r|\n/', $attributes['qualities'] ) : array();
    $qualities = array();
    foreach ( $quality_lines as $line ) {
        $parts = explode( '|', $line, 2 );
        if ( count( $parts ) === 2 ) {
            $label = sanitize_text_field( trim( $parts[0] ) );
            $url = esc_url_raw( trim( $parts[1] ) );
            if ( $label && $url && in_array( wp_parse_url( $url, PHP_URL_SCHEME ), array( 'http', 'https' ), true ) ) {
                $qualities[] = array( 'label' => $label, 'url' => $url );
            }
        }
    }

    wp_enqueue_script( 'bwp-player' );
    wp_enqueue_style( 'bwp-player' );

    $style = 'padding-top:' . esc_attr( $padding ) . ';border-radius:' . $radius . 'px;';
    $html  = '<div class="film-video-wrap bwp-player-wrap" style="' . $style . '" tabindex="0">';
    $html .= '<video class="custom-video" preload="' . esc_attr( $preload ) . '" playsinline';
    if ( $poster ) { $html .= ' poster="' . $poster . '"'; }
    $html .= '><source src="' . $video_url . '" type="video/mp4"></video>';
    if ( $qualities ) {
        $html .= '<select class="native-video-quality" aria-label="Video quality">';
        $found_current = false;
        foreach ( $qualities as $quality ) {
            $selected = ( $quality['url'] === $video_url && ! $found_current ) ? ' selected' : '';
            if ( $selected ) { $found_current = true; }
            $html .= '<option value="' . esc_url( $quality['url'] ) . '"' . $selected . '>' . esc_html( $quality['label'] ) . '</option>';
        }
        // Include the initial source in the menu if it is not one of the listed qualities.
        if ( ! $found_current ) {
            $html .= '<option value="' . $video_url . '" selected>Default</option>';
        }
        $html .= '</select>';
    }
    $html .= '</div>';
    return $html;
}
