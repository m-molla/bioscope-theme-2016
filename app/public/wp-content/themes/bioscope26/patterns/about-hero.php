<?php
/**
 * Title: Bioscope About Hero
 * Slug: bioscope/about-hero
 * Categories: hero, banner
 * Description: This pattern is built to use as a hero section for the about page.
 */
?>
<!-- wp:group {"metadata":{"name":"About Hero"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:cover {"url":"http://bioscope26.local/wp-content/uploads/2026/10/Aboutus_hero_ecbtag-scaled.webp","id":559,"isUserOverlayColor":true,"minHeight":100,"minHeightUnit":"vh","customGradient":"linear-gradient(185deg,rgba(4,2,1,0.52) 0%,rgba(4,2,1,0.4) 36%,rgba(4,2,1,0.77) 100%)","metadata":{"categories":["Hero"],"patternName":"bioscope/hero","name":"Bioscope Hero Section"},"className":"hero","style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"0px","bottom":"0px","left":"0px","right":"0px"}}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-cover hero"
        style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;min-height:100vh">
        <img class="wp-block-cover__image-background wp-image-559" alt=""
            src="http://bioscope26.local/wp-content/uploads/2026/10/Aboutus_hero_ecbtag-scaled.webp"
            data-object-fit="cover" /><span aria-hidden="true"
            class="wp-block-cover__background has-background-dim-100 has-background-dim wp-block-cover__gradient-background has-background-gradient"
            style="background:linear-gradient(185deg,rgba(4,2,1,0.52) 0%,rgba(4,2,1,0.4) 36%,rgba(4,2,1,0.77) 100%)"></span>
        <div class="wp-block-cover__inner-container">
            <!-- wp:group {"style":{"dimensions":{"minHeight":"100vh"},"spacing":{"padding":{"top":"0px"}}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","verticalAlignment":"center"}} -->
            <div class="wp-block-group" style="min-height:100vh;padding-top:0px">
                <!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
                <div class="wp-block-group">
                    <!-- wp:group {"metadata":{"name":"Home Hero Content"},"className":"home-hero-content-wrap","style":{"@mobile":{"spacing":{"padding":{"right":"20px","left":"20px"}}},"@tablet":{"spacing":{"padding":{"right":"20px","left":"20px"}}}},"layout":{"type":"constrained","contentSize":"900px"}} -->
                    <div class="wp-block-group home-hero-content-wrap">
                        <!-- wp:paragraph {"placeholder":"Write title…","metadata":{"name":"Est. and location"},"style":{"typography":{"textAlign":"center","fontSize":"13px","textTransform":"uppercase","letterSpacing":"0.54em"},"elements":{"link":{"color":{"text":"var:preset|color|gold-light"}}},"spacing":{"margin":{"bottom":"30px"}},"@tablet":{"spacing":{"margin":{"bottom":"20px"}}},"@mobile":{"typography":{"textAlign":"center"},"spacing":{"margin":{"top":"0px","bottom":"12px"}}}},"textColor":"gold-light"} -->
                        <p class="has-text-align-center has-gold-light-color has-text-color has-link-color"
                            style="margin-bottom:30px;font-size:13px;letter-spacing:0.54em;text-transform:uppercase">
                            Est.
                            2015 · Michigan</p>
                        <!-- /wp:paragraph -->

                        <!-- wp:heading {"level":1,"style":{"typography":{"textAlign":"center","fontStyle":"normal","fontWeight":"300"},"@tablet":{"typography":{"fontSize":"var:preset|font-size|bioscope-big-title","lineHeight":"1.2"}},"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"fontSize":"bioscope-big-title"} -->
                        <h1 class="wp-block-heading has-text-align-center has-bioscope-big-title-font-size"
                            style="margin-bottom:var(--wp--preset--spacing--50);font-style:normal;font-weight:300">
                            About<br><em><mark style="background-color:rgba(0, 0, 0, 0)"
                                    class="has-inline-color has-gold-color">Us</mark></em></h1>
                        <!-- /wp:heading -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->

                <!-- wp:group {"className":"hero-bottom","style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"0px","bottom":"0px"}}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","verticalAlignment":"bottom"}} -->
                <div class="wp-block-group hero-bottom"
                    style="margin-top:0px;margin-bottom:0px;padding-top:0px;padding-bottom:0px">
                    <!-- wp:group {"metadata":{"name":"scroll"},"style":{"spacing":{"margin":{"top":"52px"},"blockGap":"20px","padding":{"bottom":"var:preset|spacing|60"}},"@tablet":{"spacing":{"margin":{"top":"30px"}}},"@mobile":{"spacing":{"padding":{"bottom":"var:preset|spacing|40"}}}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
                    <div class="wp-block-group" style="margin-top:52px;padding-bottom:var(--wp--preset--spacing--60)">
                        <!-- wp:html {"metadata":{"name":"Scroll Line"}} -->
                        <div class="scroll-line"></div>
                        <!-- /wp:html -->

                        <!-- wp:paragraph {"style":{"typography":{"fontSize":"8px","letterSpacing":"0.45em"},"elements":{"link":{"color":{"text":"var:preset|color|white-33"}}}},"textColor":"white-33"} -->
                        <p class="has-white-33-color has-text-color has-link-color"
                            style="font-size:8px;letter-spacing:0.45em">SCROLL</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
    </div>
    <!-- /wp:cover -->
</div>
<!-- /wp:group -->