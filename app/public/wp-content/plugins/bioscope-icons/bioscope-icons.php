<?php
/**
 * Plugin Name: Bioscope Icons
 * Description: Lightweight Font Awesome icon block for Gutenberg with searchable icons and styling controls.
 * Version: 1.0.3
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Bioscope
 * License: GPL-2.0-or-later
 * Text Domain: bioscope-icons
 */
if (!defined('ABSPATH')) exit;

function bioscope_icons_register_block() {
    $dir = plugin_dir_path(__FILE__);
    $url = plugin_dir_url(__FILE__);
    wp_register_script(
        'bioscope-icons-editor', $url . 'assets/editor.js',
        array('wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components', 'wp-data'),
        filemtime($dir . 'assets/editor.js'), true
    );
    wp_localize_script('bioscope-icons-editor', 'BioscopeIconsData', array(
        'iconsUrl' => $url . 'assets/icons.json',
    ));
    wp_register_style('bioscope-icons-style', $url . 'assets/style.css', array(), filemtime($dir . 'assets/style.css'));
    register_block_type(__DIR__, array(
        'editor_script' => 'bioscope-icons-editor',
        'style' => 'bioscope-icons-style',
        'render_callback' => 'bioscope_icons_render_block',
    ));
}
add_action('init', 'bioscope_icons_register_block');


/** Allow hex colors and safe CSS custom-property references from theme.json palettes. */
function bioscope_icons_sanitize_css_color($value) {
    if (!is_string($value)) return '';
    $value = trim($value);
    $hex = sanitize_hex_color($value);
    if ($hex) return $hex;
    // Restrict var() to a simple custom property name; no arbitrary CSS values.
    if (preg_match('/^var\(--[a-zA-Z0-9_-]+\)$/', $value)) return $value;
    return '';
}

function bioscope_icons_render_block($attributes) {
    $name = isset($attributes['iconName']) ? sanitize_key($attributes['iconName']) : 'star';
    $unicode = isset($attributes['unicode']) ? preg_replace('/[^a-f0-9]/i', '', $attributes['unicode']) : 'f005';
    $style = isset($attributes['iconStyle']) && in_array($attributes['iconStyle'], array('solid','regular','brands'), true) ? $attributes['iconStyle'] : 'solid';
    $size = isset($attributes['size']) ? max(8, min(240, absint($attributes['size']))) : 32;
    $width = isset($attributes['width']) ? max(0, min(500, absint($attributes['width']))) : 0;
    $height = isset($attributes['height']) ? max(0, min(500, absint($attributes['height']))) : 0;
    $color = isset($attributes['color']) ? bioscope_icons_sanitize_css_color($attributes['color']) : '';
    $bg = isset($attributes['backgroundColor']) ? bioscope_icons_sanitize_css_color($attributes['backgroundColor']) : '';
    $padding = isset($attributes['padding']) ? max(0, min(80, absint($attributes['padding']))) : 0;
    $shape = isset($attributes['shape']) && in_array($attributes['shape'], array('none','square','rounded','circle'), true) ? $attributes['shape'] : 'none';
    $align = isset($attributes['align']) && in_array($attributes['align'], array('left','center','right'), true) ? $attributes['align'] : 'left';
    $label = isset($attributes['label']) ? sanitize_text_field($attributes['label']) : '';
    $style_attr = 'font-size:' . $size . 'px;';
    if ($color) $style_attr .= 'color:' . $color . ';';
    if ($bg) $style_attr .= 'background-color:' . $bg . ';';
    $style_attr .= 'padding:' . $padding . 'px;';
    if ($width) $style_attr .= 'width:' . $width . 'px;';
    if ($height) $style_attr .= 'height:' . $height . 'px;';
    if ($width || $height) $style_attr .= 'box-sizing:border-box;';
    $classes = 'bioscope-icon-block bioscope-icon-' . $style . ' bioscope-icon-shape-' . $shape . ' bioscope-icon-align-' . $align;
    $glyph = html_entity_decode('&#x' . $unicode . ';', ENT_QUOTES, 'UTF-8');
    $aria = $label !== '' ? ' role="img" aria-label="' . esc_attr($label) . '"' : ' aria-hidden="true"';
    return '<span class="' . esc_attr($classes) . '"><span class="bioscope-icon-glyph" style="' . esc_attr($style_attr) . '"' . $aria . '>' . esc_html($glyph) . '</span></span>';
}
