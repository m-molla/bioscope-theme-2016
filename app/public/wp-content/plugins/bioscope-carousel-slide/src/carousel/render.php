<?php
if (!defined('ABSPATH')) {
	exit;
}

$defaults = array(
	'slidesPerViewDesktop' => 3,
	'slidesPerViewTablet' => 2,
	'slidesPerViewMobile' => 1,
	'spaceDesktop' => 24,
	'spaceTablet' => 18,
	'spaceMobile' => 12,
	'speed' => 500,
	'initialSlide' => 0,
	'loop' => false,
	'centeredSlides' => false,
	'autoHeight' => false,
	'direction' => 'horizontal',
	'navigation' => true,
	'pagination' => true,
	'scrollbar' => false,
	'autoplay' => false,
	'autoplayDelay' => 0,
	'pauseOnMouseEnter' => true,
	'disableOnInteraction' => false,
	'keyboard' => true,
	'mousewheel' => false,
	'grabCursor' => true,
	'lightbox' => true,
	'lightboxCaption' => true,
);

$settings = wp_parse_args($attributes, $defaults);

// The saved block already contains its wrapper and controls. Add runtime settings
// to that wrapper rather than nesting a second carousel around the saved markup.
$processor = new WP_HTML_Tag_Processor($content);

if (!$processor->next_tag(array('class_name' => 'bioscope-carousel'))) {
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	return;
}

$processor->set_attribute('data-bioscope-settings', wp_json_encode($settings));

if (!$settings['navigation']) {
	$processor->add_class('bioscope-carousel--no-navigation');
}

if ($settings['autoplay']) {
	$processor->add_class('marquee-swiper');
}

echo $processor->get_updated_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
