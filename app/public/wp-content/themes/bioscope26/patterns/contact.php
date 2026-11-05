<?php
/**
 * Title: Contact
 * Slug: bioscope/contact
 * Categories: Contact
 * Description: Contact section pattern , it'll be used as contact seciton.
 * Keywords: contact, message
 */
?>

<!-- wp:group {"metadata":{"name":"Contact Form Wrap"},"className":"bioscope-contact-wrap ","style":{"spacing":{"padding":{"top":"48px","bottom":"48px","left":"52px","right":"52px"}},"color":{"background":"#ffffffd6"},"border":{"style":"solid","width":"1px"},"@tablet":{"spacing":{"padding":{"top":"36px","bottom":"36px","left":"30px","right":"30px"}}},"@mobile":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"20px","right":"20px"}}}},"borderColor":"border-soft","layout":{"type":"default"}} -->
<div class="wp-block-group bioscope-contact-wrap has-border-color has-border-soft-border-color has-background"
    style="border-style:solid;border-width:1px;background-color:#ffffffd6;padding-top:48px;padding-right:52px;padding-bottom:48px;padding-left:52px">
    <!-- wp:heading {"style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"fontStyle":"normal","fontWeight":"300","textAlign":"center"},"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"textColor":"gold","fontSize":"bioscope-section-title"} -->
    <h2 class="wp-block-heading has-text-align-center has-gold-color has-text-color has-link-color has-bioscope-section-title-font-size"
        style="margin-bottom:var(--wp--preset--spacing--50);font-style:normal;font-weight:300">SEND US A MESSAGE</h2>
    <!-- /wp:heading -->

    <!-- wp:shortcode -->
    [contact-form-7 id="f5d1c3d" title="Contact Form"]
    <!-- /wp:shortcode -->
</div>
<!-- /wp:group -->