<?php
/**
 * Title: Decor Card
 * Slug: bioscope/decor-card
 * Categories: bioscope
 * Description: This pattern is built to use as a Decor Card inside carousel .
 */
?>
<!-- wp:group {"metadata":{"name":"other decor"},"className":"pos-relative other-decor-card","layout":{"type":"constrained"}} -->
<div class="wp-block-group pos-relative other-decor-card">
    <!-- wp:image {"aspectRatio":"4/3","scale":"cover","sizeSlug":"large","linkDestination":"none"} -->
    <figure class="wp-block-image size-large"><img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&amp;h=400&amp;fit=crop&amp;q=80"
            alt="" style="aspect-ratio:4/3;object-fit:cover" /></figure>
    <!-- /wp:image -->

    <!-- wp:group {"metadata":{"name":"Other Decor Info"},"className":" other-decor-info","style":{"spacing":{"padding":{"top":"16px","bottom":"16px","left":"16px","right":"16px"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group other-decor-info"
        style="padding-top:16px;padding-right:16px;padding-bottom:16px;padding-left:16px">
        <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"300"},"elements":{"link":{"color":{"text":"var:preset|color|white-full"}}}},"textColor":"white-full"} -->
        <h3 class="wp-block-heading has-white-full-color has-text-color has-link-color"
            style="font-size:18px;font-style:normal;font-weight:300">Grand Family Table</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase"},"elements":{"link":{"color":{"text":"var:preset|color|gold"}}}},"textColor":"gold","fontSize":"bioscope-x-small"} -->
        <p class="has-gold-color has-text-color has-link-color has-bioscope-x-small-font-size"
            style="text-transform:uppercase">Family Table</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->