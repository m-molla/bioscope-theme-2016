<?php
/**
 * Plugin Name: Bioscope Linked Group
 * Description: Adds a Gutenberg group-style block whose entire content links to a page URL or section anchor.
 * Version: 1.0.0
 * Author: Bioscope
 * Requires at least: 6.3
 * Requires PHP: 7.4
 * Text Domain: bioscope-linked-group
 */
if (!defined('ABSPATH')) {
    exit;
}

function bioscope_linked_group_register_block()
{
    $dir = plugin_dir_path(__FILE__);
    $url = plugin_dir_url(__FILE__);

    wp_register_script(
        'bioscope-linked-group-editor',
        $url . 'block.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'),
        filemtime($dir . 'block.js'),
        true
    );
    wp_register_style(
        'bioscope-linked-group-style',
        $url . 'style.css',
        array(),
        filemtime($dir . 'style.css')
    );
    wp_register_script(
        'bioscope-linked-group-view',
        $url . 'view.js',
        array(),
        filemtime($dir . 'view.js'),
        true
    );
    register_block_type('bioscope/linked-group', array(
        'api_version' => 3,
        'editor_script' => 'bioscope-linked-group-editor',
        'style' => 'bioscope-linked-group-style',
        'editor_style' => 'bioscope-linked-group-style',
    ));
}
add_action('init', 'bioscope_linked_group_register_block');

function bioscope_linked_group_enqueue_view_script($block_content, $block)
{
    if (!is_admin() && isset($block['blockName']) && 'bioscope/linked-group' === $block['blockName']) {
        wp_enqueue_script('bioscope-linked-group-view');
    }

    return $block_content;
}
add_filter('render_block', 'bioscope_linked_group_enqueue_view_script', 10, 2);
