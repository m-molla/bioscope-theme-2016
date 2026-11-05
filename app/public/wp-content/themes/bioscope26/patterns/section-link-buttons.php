<?php
/**
 * Title: Bioscope Section Link Buttons
 * Slug: bioscope/section-link-buttons
 * Categories: Layout
 * Description: This pattern is for section link buttons.
 */
?>


<!-- wp:group {"metadata":{"name":"Section Link Buttons"},"style":{"spacing":{"padding":{"right":"56px","left":"56px","top":"0px","bottom":"0px"},"blockGap":"var:preset|spacing|20"},"border":{"bottom":{"color":"var:preset|color|border-soft","style":"solid","width":"1px"}},"@tablet":{"spacing":{"padding":{"right":"30px","left":"30px"}}},"@mobile":{"spacing":{"padding":{"right":"20px","left":"20px"}},"layout":{"flexWrap":"wrap","orientation":"horizontal"}}},"backgroundColor":"surface","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
<div class="wp-block-group has-surface-background-color has-background"
    style="border-bottom-color:var(--wp--preset--color--border-soft);border-bottom-style:solid;border-bottom-width:1px;padding-top:0px;padding-right:56px;padding-bottom:0px;padding-left:56px">
    <!-- wp:buttons {"className":"section-link-buttons","style":{"border":{"width":"0px","style":"none"}}} -->
    <div class="wp-block-buttons section-link-buttons" style="border-style:none;border-width:0px">
        <!-- wp:button {"className":"is-style-transparent-underline"} -->
        <div class="wp-block-button is-style-transparent-underline"><a class="wp-block-button__link wp-element-button"
                href="#walk-way">Walk Way</a></div>
        <!-- /wp:button -->

        <!-- wp:button {"className":"is-style-transparent-underline"} -->
        <div class="wp-block-button is-style-transparent-underline"><a class="wp-block-button__link wp-element-button"
                href="#stages">Stages</a></div>
        <!-- /wp:button -->

        <!-- wp:button {"className":"is-style-transparent-underline"} -->
        <div class="wp-block-button is-style-transparent-underline"><a class="wp-block-button__link wp-element-button"
                href="#other-decor">Other Decor</a></div>
        <!-- /wp:button -->

        <!-- wp:button {"className":"is-style-transparent-underline"} -->
        <div class="wp-block-button is-style-transparent-underline"><a class="wp-block-button__link wp-element-button"
                href="#accessories">Accessories</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
</div>
<!-- /wp:group -->