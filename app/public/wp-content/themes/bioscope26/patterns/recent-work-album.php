<?php
/**
 * Title: Recent Work Album
 * Slug: bioscope/recent-work
 * Categories: gallery, banner
 * Description: This pattern is built to use as a recent section for the about page.
 */
?>

<!-- wp:group {"metadata":{"name":"Recent Work Album"},"className":"is-style-section-spacing","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-section-spacing">
    <!-- wp:group {"metadata":{"name":"Section Head","categories":["header"],"patternName":"bioscope/section-header-center"},"style":{"layout":{"columnSpan":5,"rowSpan":1},"@tablet":{"layout":{"columnSpan":5}},"spacing":{"blockGap":"var:preset|spacing|20","margin":{"bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","wideSize":"620px"}} -->
    <div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--70)">
        <!-- wp:paragraph {"className":"is-style-section-tag","style":{"typography":{"textAlign":"center"}}} -->
        <p class="has-text-align-center is-style-section-tag">Recent work</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"className":"is-style-section-heading","style":{"typography":{"textAlign":"center"}}} -->
        <h2 class="wp-block-heading has-text-align-center is-style-section-heading">Choose an <em><mark
                    style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-gold-color">Album</mark></em>
        </h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"className":"is-style-section-details","style":{"typography":{"textAlign":"center"}}} -->
        <p class="has-text-align-center is-style-section-details">A glimpse into five unforgettable celebrations — each
            one
            a unique story told through our lens.</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:bioscope/albums {"gap":34} /-->
</div>
<!-- /wp:group -->