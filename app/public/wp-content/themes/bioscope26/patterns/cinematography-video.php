<?php
/**
 * Title: Cinematography Video 
 * Slug: bioscope/cinematography-video
 * Categories: hero,video, banner
 * Description: This pattern is built to use as a youtube video section for the cinematography page with limited control.
 */
?>

<!-- wp:group {"metadata":{"name":"Cinematography Video Grid","categories":["hero","video","banner"],"patternName":"bioscope/cinematography-video"},"style":{"spacing":{"blockGap":"var:preset|spacing|60"},"@tablet":{"spacing":{"blockGap":"var:preset|spacing|40"}},"@mobile":{"layout":{"columnCount":1},"spacing":{"blockGap":"var:preset|spacing|40"}}},"layout":{"type":"grid","columnCount":12}} -->
<div class="wp-block-group"><!-- wp:group {"style":{"layout":{"columnSpan":7}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group">
        <!-- wp:bioscope/wistia-player {"videoUrl":"https://embed-ssl.wistia.com/deliveries/948ecedfbd676f75c602e75d8bfb024495708146/file.mp4"} /-->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"style":{"layout":{"columnSpan":5},"@mobile":{"layout":{"columnSpan":1}}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center"}} -->
    <div class="wp-block-group">
        <!-- wp:paragraph {"metadata":{"name":"Number"},"style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"margin":{"bottom":"4px"}}},"textColor":"muted","fontSize":"bioscope-x-small"} -->
        <p class="has-muted-color has-text-color has-link-color has-bioscope-x-small-font-size"
            style="margin-bottom:4px">01</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|text"}}},"typography":{"lineHeight":"1","fontStyle":"normal","fontWeight":"300"},"spacing":{"margin":{"bottom":"8px"}}},"textColor":"text","fontSize":"bioscope-x-large","fontFamily":"cormorant-garamond"} -->
        <h3 class="wp-block-heading has-text-color has-link-color has-cormorant-garamond-font-family has-bioscope-x-large-font-size"
            style="margin-bottom:8px;font-style:normal;font-weight:300;line-height:1">Sarah &amp; Ahmed</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"spacing":{"margin":{"bottom":"4px"}}},"textColor":"gold","fontSize":"bioscope-small"} -->
        <p class="has-gold-color has-text-color has-link-color has-bioscope-small-font-size" style="margin-bottom:4px">
            June 14, 2025</p>
        <!-- /wp:paragraph -->

        <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","textTransform":"uppercase"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
        <p class="has-muted-color has-text-color has-link-color" style="font-size:12px;text-transform:uppercase">The
            Dearborn Inn, Michigan</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->