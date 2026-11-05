<?php
/**
 * Plugin Name:       Bioscope Event Showcase
 * Description:       A flexible, interactive image showcase block for event galleries.
 * Version:           1.0.0
 * Author:            Bioscope 
 * Text Domain:       bioscope-event-showcase
 */

if (!defined('ABSPATH')) {
    exit;
}

function bioscope_event_showcase_register_block()
{
    register_block_type(__DIR__ . '/block.json');
    register_block_type(__DIR__ . '/image-block.json');
}
add_action('init', 'bioscope_event_showcase_register_block');