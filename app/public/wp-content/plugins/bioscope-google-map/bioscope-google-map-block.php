<?php
/**
 * Plugin Name: Bioscope Google Map
 * Description: A Gutenberg block to embed a responsive Google Map with live editor preview and adjustable dimensions.
 * Version: 1.0.0
 * Requires at least: 6.7
 * Requires PHP: 7.4
 * Author: Bioscope
 * Text Domain: bioscope-google-map
 */

if (!defined('ABSPATH')) {
	exit;
}

function bioscope_google_map_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'bioscope_google_map_block_init');
