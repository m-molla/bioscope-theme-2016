<?php
/**
 * Title: Contact Info & Map
 * Slug: bioscope/contact-info-map
 * Categories: Contact
 * Description: Contact Info and Map Section pattern , it'll be used as contact info section.
 * Keywords: contact, message
 */
?>

<!-- wp:group {"style":{"@tablet":{"layout":{"selfStretch":"fit","flexSize":null,"verticalAlignment":"top","orientation":"vertical","justifyContent":"stretch"},"spacing":{"blockGap":"var:preset|spacing|40"}},"@mobile":{"layout":{"columnCount":1,"verticalAlignment":"top","orientation":"vertical","justifyContent":"stretch"},"spacing":{"blockGap":"var:preset|spacing|40"}},"spacing":{"blockGap":"var:preset|spacing|50"}},"layout":{"type":"grid","columnCount":10}} -->
<div class="wp-block-group">
    <!-- wp:group {"style":{"layout":{"columnSpan":4},"@mobile":{"layout":{"columnSpan":10}}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group">
        <!-- wp:group {"metadata":{"patternName":"core/block/791","name":"Contact Info"},"className":"contact-info","style":{"dimensions":{"minWidth":"39%"},"layout":{"selfStretch":"fixedNoShrink","flexSize":"39%"},"border":{"width":"1px","style":"solid"},"spacing":{"padding":{"top":"42px","bottom":"42px","left":"36px","right":"36px"}},"@tablet":{"spacing":{"padding":{"right":"24px","left":"24px","top":"32px","bottom":"32px"}}},"@mobile":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"24px","right":"24px"}}}},"backgroundColor":"surface","borderColor":"border-soft","layout":{"type":"constrained","justifyContent":"left"}} -->
        <div class="wp-block-group contact-info has-border-color has-border-soft-border-color has-surface-background-color has-background"
            style="border-style:solid;border-width:1px;min-width:39%;padding-top:42px;padding-right:36px;padding-bottom:42px;padding-left:36px">
            <!-- wp:heading {"className":"is-style-default","style":{"spacing":{"margin":{"bottom":"10px"}},"typography":{"fontSize":"42px"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}}},"textColor":"text"} -->
            <h2 class="wp-block-heading is-style-default has-text-color has-link-color"
                style="margin-bottom:10px;font-size:42px">Contact <em><mark style="background-color:rgba(0, 0, 0, 0)"
                        class="has-inline-color has-gold-color">Info</mark></em></h2>
            <!-- /wp:heading -->

            <!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"bottom":"28px"}},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted","fontSize":"bioscope-large"} -->
            <h3 class="wp-block-heading has-muted-color has-text-color has-link-color has-bioscope-large-font-size"
                style="margin-bottom:28px"><em>Bioscope Photography &amp; </em><br><em>Cinematography</em></h3>
            <!-- /wp:heading -->

            <!-- wp:group {"metadata":{"name":"Address"},"style":{"spacing":{"blockGap":"18px"}},"layout":{"type":"flex","orientation":"vertical"}} -->
            <div class="wp-block-group">
                <!-- wp:group {"style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"blockGap":"12px"}},"textColor":"muted","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                <div class="wp-block-group has-muted-color has-text-color has-link-color">
                    <!-- wp:bioscope/icon {"iconName":"map","unicode":"f279","iconStyle":"regular","size":18,"color":"var(\u002d\u002dbioscope-gold)"} /-->

                    <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"margin":{"top":"-2px","left":"0"}}},"textColor":"muted","fontSize":"bioscope-small"} -->
                    <p class="has-muted-color has-text-color has-link-color has-bioscope-small-font-size"
                        style="margin-top:-2px;margin-left:0">24800 Warner Ave Suite 105<br>Warren, MI 48091</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->

                <!-- wp:group {"style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"typography":{"textDecoration":"none"},"spacing":{"blockGap":"12px"}},"textColor":"muted","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                <div class="wp-block-group has-muted-color has-text-color has-link-color" style="text-decoration:none">
                    <!-- wp:bioscope/icon {"iconName":"envelope","unicode":"f0e0","iconStyle":"regular","size":18,"color":"var(\u002d\u002dbioscope-gold)"} /-->

                    <!-- wp:paragraph {"className":"decoration-none","style":{"typography":{"textDecoration":"none"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"margin":{"top":"-2px"}}},"textColor":"muted","fontSize":"bioscope-small"} -->
                    <p class="decoration-none has-muted-color has-text-color has-link-color has-bioscope-small-font-size"
                        style="margin-top:-2px;text-decoration:none"><a
                            href="mailto:info@bioscope.us">info@bioscope.us</a></p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->

                <!-- wp:group {"style":{"css":"gap:10px;","elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"blockGap":"12px"}},"textColor":"muted","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                <div class="wp-block-group has-custom-css has-muted-color has-text-color has-link-color">
                    <!-- wp:bioscope/icon {"iconName":"phone","unicode":"f095","size":18,"color":"var(\u002d\u002dbioscope-gold)"} /-->

                    <!-- wp:paragraph {"className":"decoration-none","style":{"spacing":{"margin":{"top":"-2px"}},"typography":{"textDecoration":"none"}},"fontSize":"bioscope-small"} -->
                    <p class="decoration-none has-bioscope-small-font-size"
                        style="margin-top:-2px;text-decoration:none"><a href="tel:13133279985">+1 (313) 327-9985</a></p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"style":{"layout":{"columnSpan":6},"border":{"width":"1px","style":"solid"},"@mobile":{"layout":{"columnSpan":10}}},"borderColor":"border-soft","layout":{"type":"constrained"}} -->
    <div class="wp-block-group has-border-color has-border-soft-border-color"
        style="border-style:solid;border-width:1px"><!-- wp:bioscope/google-map {"height":360} -->
        <div class="wp-block-bioscope-google-map bioscope-google-map-block" style="width:100%;max-width:100%"><iframe
                src="https://maps.google.com/maps?q=Dhaka%2C%20Bangladesh&amp;z=14&amp;output=embed" title="Google Map"
                width="100%" height="360" style="width:100%;height:360px;border:0;border-radius:0px;display:block"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
        <!-- /wp:bioscope/google-map -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->