<?php
/**
 * Title: Main Services
 * Slug: bioscope/main-services
 * Categories: Service
 * Description: This pattern is as services section for home page.
 */
?>

<!-- wp:group {"metadata":{"name":"Services"},"className":"services-section is-style-section is-style-section-spacing","style":{"@tablet":{"spacing":{"blockGap":"var:preset|spacing|50"}},"@mobile":{"spacing":{"blockGap":"var:preset|spacing|40"}},"spacing":{"margin":{"top":"0px","bottom":"0px"},"blockGap":"3rem"},"border":{"bottom":{"color":"var:preset|color|border-soft","style":"solid","width":"1px"},"top":[],"right":[],"left":[]}},"backgroundColor":"background","layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group services-section is-style-section is-style-section-spacing has-background-background-color has-background"
    style="border-bottom-color:var(--wp--preset--color--border-soft);border-bottom-style:solid;border-bottom-width:1px;margin-top:0px;margin-bottom:0px">
    <!-- wp:group {"style":{"layout":{"selfStretch":"fit","flexSize":null},"spacing":{"blockGap":"0","padding":{"right":"100px"}},"@mobile":{"spacing":{"margin":{"top":"0px","bottom":"0px"}}},"@tablet":{"spacing":{"blockGap":"0"}}},"layout":{"type":"default"}} -->
    <div class="wp-block-group" style="padding-right:100px">
        <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"textTransform":"uppercase","fontSize":"10px","letterSpacing":"0.5em"},"spacing":{"margin":{"bottom":"12px"}},"@mobile":{"spacing":{"margin":{"bottom":"8px"}}}},"textColor":"gold"} -->
        <p class="has-gold-color has-text-color has-link-color"
            style="margin-bottom:12px;font-size:10px;letter-spacing:0.5em;text-transform:uppercase">What we offer</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"className":"is-style-section-heading","style":{"typography":{"fontSize":"48px","fontStyle":"normal","fontWeight":"400","lineHeight":"1"},"elements":{"link":{"color":{"text":"var:preset|color|ink"}}}},"textColor":"ink","fontFamily":"cormorant"} -->
        <h2 class="wp-block-heading is-style-section-heading has-ink-color has-text-color has-link-color has-cormorant-font-family"
            style="font-size:48px;font-style:normal;font-weight:400;line-height:1">Our <em><mark
                    style="background-color:rgba(0, 0, 0, 0)"
                    class="has-inline-color has-gold-color">Services</mark></em></h2>
        <!-- /wp:heading -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"style":{"@tablet":{"layout":{"columnCount":2}},"@mobile":{"layout":{"columnCount":1}},"spacing":{"blockGap":"1rem"}},"layout":{"type":"grid","columnCount":4}} -->
    <div class="wp-block-group">
        <!-- wp:group {"metadata":{"name":"Service Card","categories":["Service"],"patternName":"bioscope/service-card"},"align":"full","className":"service-card","style":{"border":{"width":"1px"},"spacing":{"padding":{"right":"0px","left":"0px","top":"0px","bottom":"0px"}}},"backgroundColor":"surface","borderColor":"footer-border","layout":{"type":"default"}} -->
        <div class="wp-block-group alignfull service-card has-border-color has-footer-border-border-color has-surface-background-color has-background"
            style="border-width:1px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <!-- wp:cover {"url":"http://bioscope26.local/wp-content/uploads/2026/09/Photography_tngfs2-1024x682.jpg","id":199,"dimRatio":0,"isUserOverlayColor":true,"minHeight":224,"minHeightUnit":"px","sizeSlug":"large","style":{"dimensions":{"aspectRatio":"4/3"}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-cover" style="min-height:224px"><img
                    class="wp-block-cover__image-background wp-image-199 size-large" alt=""
                    src="http://bioscope26.local/wp-content/uploads/2026/09/Photography_tngfs2-1024x682.jpg"
                    data-object-fit="cover" /><span aria-hidden="true"
                    class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
                <div class="wp-block-cover__inner-container">
                    <!-- wp:paragraph {"placeholder":"Write title…","style":{"typography":{"textAlign":"center"}},"fontSize":"large"} -->
                    <p class="has-text-align-center has-large-font-size"></p>
                    <!-- /wp:paragraph -->
                </div>
            </div>
            <!-- /wp:cover -->

            <!-- wp:group {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"28px","bottom":"28px","left":"24px","right":"24px"}},"@tablet":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}},"@mobile":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}}},"layout":{"type":"default"}} -->
            <div class="wp-block-group"
                style="margin-top:0px;margin-bottom:0px;padding-top:28px;padding-right:24px;padding-bottom:28px;padding-left:24px">
                <!-- wp:heading {"level":3,"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}},"spacing":{"margin":{"bottom":"10px"}}},"textColor":"text","fontFamily":"cormorant-garamond"} -->
                <h3 class="wp-block-heading is-style-default has-text-color has-link-color has-cormorant-garamond-font-family"
                    style="margin-bottom:10px;font-size:26px;font-style:normal;font-weight:400">Photography</h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"className":"is-style-section-details","style":{"spacing":{"margin":{"bottom":"20px","top":"0px"}},"typography":{"fontSize":"13px"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                <p class="is-style-section-details has-muted-color has-text-color has-link-color"
                    style="margin-top:0px;margin-bottom:20px;font-size:13px">Artistic portraits and candid moments woven
                    into an
                    enduring visual story of your day.</p>
                <!-- /wp:paragraph -->

                <!-- wp:paragraph {"className":"is-style-hyperlink","style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"textTransform":"uppercase","fontSize":"10px","letterSpacing":"0.5em"}},"textColor":"gold"} -->
                <p class="is-style-hyperlink has-gold-color has-text-color has-link-color"
                    style="font-size:10px;letter-spacing:0.5em;text-transform:uppercase"><a
                        href="http://bioscope.local/photography/" data-type="page" data-id="198">Explore</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"metadata":{"name":"Service Card","categories":["Service"],"patternName":"bioscope/service-card"},"align":"full","className":"service-card","style":{"border":{"width":"1px"},"spacing":{"padding":{"right":"0px","left":"0px","top":"0px","bottom":"0px"}}},"backgroundColor":"surface","borderColor":"footer-border","layout":{"type":"default"}} -->
        <div class="wp-block-group alignfull service-card has-border-color has-footer-border-border-color has-surface-background-color has-background"
            style="border-width:1px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <!-- wp:cover {"url":"http://bioscope26.local/wp-content/uploads/2026/09/Cinematography1_q5yfnl-1024x683.jpg","id":201,"dimRatio":0,"isUserOverlayColor":true,"minHeight":224,"minHeightUnit":"px","sizeSlug":"large","style":{"dimensions":{"aspectRatio":"4/3"}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-cover" style="min-height:224px"><img
                    class="wp-block-cover__image-background wp-image-201 size-large" alt=""
                    src="http://bioscope26.local/wp-content/uploads/2026/09/Cinematography1_q5yfnl-1024x683.jpg"
                    data-object-fit="cover" /><span aria-hidden="true"
                    class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
                <div class="wp-block-cover__inner-container">
                    <!-- wp:paragraph {"placeholder":"Write title…","style":{"typography":{"textAlign":"center"}},"fontSize":"large"} -->
                    <p class="has-text-align-center has-large-font-size"></p>
                    <!-- /wp:paragraph -->
                </div>
            </div>
            <!-- /wp:cover -->

            <!-- wp:group {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"28px","bottom":"28px","left":"24px","right":"24px"}},"@tablet":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}},"@mobile":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}}},"layout":{"type":"default"}} -->
            <div class="wp-block-group"
                style="margin-top:0px;margin-bottom:0px;padding-top:28px;padding-right:24px;padding-bottom:28px;padding-left:24px">
                <!-- wp:heading {"level":3,"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}},"spacing":{"margin":{"bottom":"10px"}}},"textColor":"text","fontFamily":"cormorant-garamond"} -->
                <h3 class="wp-block-heading is-style-default has-text-color has-link-color has-cormorant-garamond-font-family"
                    style="margin-bottom:10px;font-size:26px;font-style:normal;font-weight:400">Photography</h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"className":"is-style-section-details","style":{"spacing":{"margin":{"bottom":"20px","top":"0px"}},"typography":{"fontSize":"13px"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                <p class="is-style-section-details has-muted-color has-text-color has-link-color"
                    style="margin-top:0px;margin-bottom:20px;font-size:13px">Artistic portraits and candid moments woven
                    into an
                    enduring visual story of your day.</p>
                <!-- /wp:paragraph -->

                <!-- wp:paragraph {"className":"is-style-hyperlink","style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"textTransform":"uppercase","fontSize":"10px","letterSpacing":"0.5em"}},"textColor":"gold"} -->
                <p class="is-style-hyperlink has-gold-color has-text-color has-link-color"
                    style="font-size:10px;letter-spacing:0.5em;text-transform:uppercase"><a
                        href="http://bioscope.local/photography/" data-type="page" data-id="198">Explore</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"metadata":{"name":"Service Card","categories":["Service"],"patternName":"bioscope/service-card"},"align":"full","className":"service-card","style":{"border":{"width":"1px"},"spacing":{"padding":{"right":"0px","left":"0px","top":"0px","bottom":"0px"}}},"backgroundColor":"surface","borderColor":"footer-border","layout":{"type":"default"}} -->
        <div class="wp-block-group alignfull service-card has-border-color has-footer-border-border-color has-surface-background-color has-background"
            style="border-width:1px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <!-- wp:cover {"url":"http://bioscope26.local/wp-content/uploads/2026/09/decor_myk82o-1-1-1024x571.webp","id":200,"dimRatio":0,"isUserOverlayColor":true,"minHeight":224,"minHeightUnit":"px","isDark":false,"sizeSlug":"large","style":{"dimensions":{"aspectRatio":"4/3"}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-cover is-light" style="min-height:224px"><img
                    class="wp-block-cover__image-background wp-image-200 size-large" alt=""
                    src="http://bioscope26.local/wp-content/uploads/2026/09/decor_myk82o-1-1-1024x571.webp"
                    data-object-fit="cover" /><span aria-hidden="true"
                    class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
                <div class="wp-block-cover__inner-container">
                    <!-- wp:paragraph {"placeholder":"Write title…","style":{"typography":{"textAlign":"center"}},"fontSize":"large"} -->
                    <p class="has-text-align-center has-large-font-size"></p>
                    <!-- /wp:paragraph -->
                </div>
            </div>
            <!-- /wp:cover -->

            <!-- wp:group {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"28px","bottom":"28px","left":"24px","right":"24px"}},"@tablet":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}},"@mobile":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}}},"layout":{"type":"default"}} -->
            <div class="wp-block-group"
                style="margin-top:0px;margin-bottom:0px;padding-top:28px;padding-right:24px;padding-bottom:28px;padding-left:24px">
                <!-- wp:heading {"level":3,"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}},"spacing":{"margin":{"bottom":"10px"}}},"textColor":"text","fontFamily":"cormorant-garamond"} -->
                <h3 class="wp-block-heading is-style-default has-text-color has-link-color has-cormorant-garamond-font-family"
                    style="margin-bottom:10px;font-size:26px;font-style:normal;font-weight:400">Photography</h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"className":"is-style-section-details","style":{"spacing":{"margin":{"bottom":"20px","top":"0px"}},"typography":{"fontSize":"13px"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                <p class="is-style-section-details has-muted-color has-text-color has-link-color"
                    style="margin-top:0px;margin-bottom:20px;font-size:13px">Artistic portraits and candid moments woven
                    into an
                    enduring visual story of your day.</p>
                <!-- /wp:paragraph -->

                <!-- wp:paragraph {"className":"is-style-hyperlink","style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"textTransform":"uppercase","fontSize":"10px","letterSpacing":"0.5em"}},"textColor":"gold"} -->
                <p class="is-style-hyperlink has-gold-color has-text-color has-link-color"
                    style="font-size:10px;letter-spacing:0.5em;text-transform:uppercase"><a
                        href="http://bioscope.local/photography/" data-type="page" data-id="198">Explore</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"metadata":{"name":"Service Card","categories":["Service"],"patternName":"bioscope/service-card"},"align":"full","className":"service-card","style":{"border":{"width":"1px"},"spacing":{"padding":{"right":"0px","left":"0px","top":"0px","bottom":"0px"}}},"backgroundColor":"surface","borderColor":"footer-border","layout":{"type":"default"}} -->
        <div class="wp-block-group alignfull service-card has-border-color has-footer-border-border-color has-surface-background-color has-background"
            style="border-width:1px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <!-- wp:cover {"url":"http://bioscope26.local/wp-content/uploads/2026/09/Photobooth_DJ_kpiwf6.jpg","id":343,"dimRatio":0,"isUserOverlayColor":true,"minHeight":224,"minHeightUnit":"px","isDark":false,"sizeSlug":"full","style":{"dimensions":{"aspectRatio":"4/3"}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-cover is-light" style="min-height:224px"><img
                    class="wp-block-cover__image-background wp-image-343 size-full" alt=""
                    src="http://bioscope26.local/wp-content/uploads/2026/09/Photobooth_DJ_kpiwf6.jpg"
                    data-object-fit="cover" /><span aria-hidden="true"
                    class="wp-block-cover__background has-background-dim-0 has-background-dim"></span>
                <div class="wp-block-cover__inner-container">
                    <!-- wp:paragraph {"placeholder":"Write title…","style":{"typography":{"textAlign":"center"}},"fontSize":"large"} -->
                    <p class="has-text-align-center has-large-font-size"></p>
                    <!-- /wp:paragraph -->
                </div>
            </div>
            <!-- /wp:cover -->

            <!-- wp:group {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px"},"padding":{"top":"28px","bottom":"28px","left":"24px","right":"24px"}},"@tablet":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}},"@mobile":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}}}},"layout":{"type":"default"}} -->
            <div class="wp-block-group"
                style="margin-top:0px;margin-bottom:0px;padding-top:28px;padding-right:24px;padding-bottom:28px;padding-left:24px">
                <!-- wp:heading {"level":3,"className":"is-style-default","style":{"typography":{"fontStyle":"normal","fontWeight":"400","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|text"}}},"spacing":{"margin":{"bottom":"10px"}}},"textColor":"text","fontFamily":"cormorant-garamond"} -->
                <h3 class="wp-block-heading is-style-default has-text-color has-link-color has-cormorant-garamond-font-family"
                    style="margin-bottom:10px;font-size:26px;font-style:normal;font-weight:400">Photography</h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"className":"is-style-section-details","style":{"spacing":{"margin":{"bottom":"20px","top":"0px"}},"typography":{"fontSize":"13px"},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                <p class="is-style-section-details has-muted-color has-text-color has-link-color"
                    style="margin-top:0px;margin-bottom:20px;font-size:13px">Artistic portraits and candid moments woven
                    into an
                    enduring visual story of your day.</p>
                <!-- /wp:paragraph -->

                <!-- wp:paragraph {"className":"is-style-hyperlink","style":{"elements":{"link":{"color":{"text":"var:preset|color|gold"}}},"typography":{"textTransform":"uppercase","fontSize":"10px","letterSpacing":"0.5em"}},"textColor":"gold"} -->
                <p class="is-style-hyperlink has-gold-color has-text-color has-link-color"
                    style="font-size:10px;letter-spacing:0.5em;text-transform:uppercase"><a
                        href="http://bioscope.local/photography/" data-type="page" data-id="198">Explore</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->