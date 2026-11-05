<?php
/**
 * Plugin Name:       Bioscope Carousel Slide
 * Description:       A professional Gutenberg carousel with nested slide content, responsive Swiper controls and image lightbox.
 * Version:           1.0.0
 * Author:            Bioscope
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * License:           GPL-2.0-or-later
 * Text Domain:       bioscope-carousel-slide
 */

if (!defined('ABSPATH')) {
	exit;
}

define('BIOSCOPE_CAROUSEL_VERSION', '1.0.0');
define('BIOSCOPE_CAROUSEL_FILE', __FILE__);
define('BIOSCOPE_CAROUSEL_DIR', plugin_dir_path(__FILE__));
define('BIOSCOPE_CAROUSEL_URL', plugin_dir_url(__FILE__));

function bioscope_carousel_register_blocks()
{
	register_block_type(BIOSCOPE_CAROUSEL_DIR . 'build/carousel');
	register_block_type(BIOSCOPE_CAROUSEL_DIR . 'build/slide');
}
add_action('init', 'bioscope_carousel_register_blocks');

function bioscope_carousel_enqueue_editor_assets()
{
	$asset_file = BIOSCOPE_CAROUSEL_DIR . 'build/editor.asset.php';

	if (!file_exists($asset_file)) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_script(
		'bioscope-carousel-editor',
		BIOSCOPE_CAROUSEL_URL . 'build/editor.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

	wp_enqueue_style(
		'bioscope-carousel-editor',
		BIOSCOPE_CAROUSEL_URL . 'build/editor.css',
		array(),
		$asset['version']
	);
}
add_action('enqueue_block_editor_assets', 'bioscope_carousel_enqueue_editor_assets');
