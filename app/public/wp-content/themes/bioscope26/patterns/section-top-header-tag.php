<?php
/**
 * Title: Section Top Header With Tag
 * Slug: bioscope/section-top-header-with-tag
 * Categories: Layout
 * Description: This pattern is for section top header with tag.
 */
?>

<!-- wp:group {"metadata":{"name":"Section Top Header With Tag"},"style":{"border":{"bottom":{"color":"var:preset|color|border-soft","style":"solid","width":"1px"},"top":[],"right":[],"left":[]},"spacing":{"margin":{"bottom":"28px"}},"@mobile":{"layout":{"verticalAlignment":"top","orientation":"horizontal"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
<div class="wp-block-group"
    style="border-bottom-color:var(--wp--preset--color--border-soft);border-bottom-style:solid;border-bottom-width:1px;margin-bottom:28px">
    <!-- wp:group {"style":{"spacing":{"blockGap":"14px","margin":{"bottom":"14px"}},"@mobile":{"layout":{"orientation":"vertical"},"spacing":{"blockGap":"var:preset|spacing|20"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
    <div class="wp-block-group" style="margin-bottom:14px">
        <!-- wp:heading {"level":3,"style":{"typography":{"fontStyle":"normal","fontWeight":"300"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}}},"textColor":"text","fontSize":"bioscope-large"} -->
        <h3 class="wp-block-heading has-text-color has-link-color has-bioscope-large-font-size"
            style="font-style:normal;font-weight:300">Family Table</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"fontSize":"9px","letterSpacing":"0.35rem","lineHeight":"1","textTransform":"uppercase"},"spacing":{"padding":{"top":"4px","bottom":"4px","left":"10px","right":"10px"}}},"backgroundColor":"gold-pale","textColor":"gold"} -->
        <p class="has-gold-color has-gold-pale-background-color has-text-color has-background has-link-color"
            style="padding-top:4px;padding-right:10px;padding-bottom:4px;padding-left:10px;font-size:9px;letter-spacing:0.35rem;line-height:1;text-transform:uppercase">
            Head Table Design</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:paragraph {"className":"is-style-default","style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"typography":{"fontStyle":"normal","fontWeight":"400"}},"textColor":"muted","fontSize":"bioscope-x-small"} -->
    <p class="is-style-default has-muted-color has-text-color has-link-color has-bioscope-x-small-font-size"
        style="font-style:normal;font-weight:400">4 designs</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->