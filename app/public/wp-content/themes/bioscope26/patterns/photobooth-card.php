<?php
/**
 * Title: Photobooth Card
 * Slug: bioscope/photobooth-card
 * Categories: Services, featured
 * Description: Standard grid card pattern featuring image and content layout for Bioscope website.
 * Keywords: card, photobooth, standard, philosophy
 */
?>

<!-- wp:group {"metadata":{"name":"Booth Card","categories":["Services","featured"],"patternName":"bioscope/photobooth-card"},"style":{"spacing":{"blockGap":"48px"},"@tablet":{"layout":{"orientation":"vertical","justifyContent":"stretch"},"spacing":{"blockGap":"var:preset|spacing|40"}},"@mobile":{"layout":{"orientation":"vertical"},"spacing":{"blockGap":"var:preset|spacing|40"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
    <!-- wp:group {"metadata":{"name":"Image Wrap"},"className":"showcase-image pos-relative","style":{"layout":{"selfStretch":"fixedNoShrink","flexSize":"50%"}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group showcase-image pos-relative">
        <!-- wp:image {"lightbox":{"enabled":true},"id":697,"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img
                src="http://bioscope26.local/wp-content/uploads/2026/10/photobooth-1.jpg" alt="" class="wp-image-697" />
        </figure>
        <!-- /wp:image -->

        <!-- wp:paragraph {"metadata":{"name":"Number"},"className":"pos-absolute","style":{"spacing":{"padding":{"top":"6px","bottom":"6px","left":"14px","right":"14px"}},"css":"display:inline;\ntop:20px;\nright:20px","typography":{"letterSpacing":"0.35rem","fontStyle":"normal","fontWeight":"300","lineHeight":"1"},"elements":{"link":{"color":{"text":"var:preset|color|white-33"}}}},"textColor":"white-33","fontSize":"bioscope-section-title","fontFamily":"cormorant-garamond"} -->
        <p class="pos-absolute has-custom-css has-white-33-color has-text-color has-link-color has-cormorant-garamond-font-family has-bioscope-section-title-font-size"
            style="padding-top:6px;padding-right:14px;padding-bottom:6px;padding-left:14px;font-style:normal;font-weight:300;letter-spacing:0.35rem;line-height:1">
            01</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"metadata":{"name":"Content Wrap"},"layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group">
        <!-- wp:paragraph {"className":"is-style-category-badge","style":{"typography":{"textAlign":"left"}}} -->
        <p class="has-text-align-left is-style-category-badge">Most Popular</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"className":"is-style-section-heading","style":{"spacing":{"margin":{"bottom":"16px"}}}} -->
        <h2 class="wp-block-heading is-style-section-heading" style="margin-bottom:16px">360 <em><mark
                    style="background-color:rgba(0, 0, 0, 0)"
                    class="has-inline-color has-gold-color">Photobooth</mark></em></h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"className":"is-style-section-details","style":{"spacing":{"margin":{"bottom":"28px"}},"@tablet":{"spacing":{"margin":{"bottom":"var:preset|spacing|20"}}}}} -->
        <p class="is-style-section-details" style="margin-bottom:28px">Step onto the platform and let the camera orbit
            around you in stunning slow-motion. Our 360 photobooth captures cinematic videos your guests will share
            instantly — complete with custom overlays, music, and branded templates. The ultimate social media moment.
        </p>
        <!-- /wp:paragraph -->

        <!-- wp:group {"metadata":{"name":"Features Wrap"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"},"@mobile":{"layout":{"columnCount":1,"orientation":"horizontal","justifyContent":"left"}},"@tablet":{"layout":{"flexWrap":"wrap"}},"css":"flex-wrap:wrap;"},"layout":{"type":"grid","columnCount":2}} -->
        <div class="wp-block-group has-custom-css">
            <!-- wp:group {"metadata":{"name":"Feature Tag"},"className":"photobooth-feature-tag","style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"16px","right":"16px"},"blockGap":"8px"},"border":{"width":"1px"},"typography":{"textTransform":"uppercase","fontSize":"11px"}},"textColor":"muted","borderColor":"border-soft","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group photobooth-feature-tag has-border-color has-border-soft-border-color has-muted-color has-text-color has-link-color"
                style="border-width:1px;padding-top:10px;padding-right:16px;padding-bottom:10px;padding-left:16px;font-size:11px;text-transform:uppercase">
                <!-- wp:group {"style":{"spacing":{"blockGap":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|gold"}}}},"textColor":"gold","layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group has-gold-color has-text-color has-link-color">
                    <!-- wp:image {"aspectRatio":"1","scale":"cover","sizeSlug":"large","style":{"layout":{"selfStretch":"fixedNoShrink","flexSize":"18px"}}} -->
                    <figure class="wp-block-image size-large"><img
                            src="https://s.w.org/images/core/emoji/17.0.2/svg/1f3ac.svg" alt="🎬"
                            style="aspect-ratio:1;object-fit:cover" /></figure>
                    <!-- /wp:image -->

                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px","left":"0px","right":"0px"}},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                    <p class="has-muted-color has-text-color has-link-color"
                        style="margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px">Slow-motion video</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->

            <!-- wp:group {"metadata":{"name":"Feature Tag"},"className":"photobooth-feature-tag","style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"16px","right":"16px"},"blockGap":"8px"},"border":{"width":"1px"},"typography":{"textTransform":"uppercase","fontSize":"11px"}},"textColor":"muted","borderColor":"border-soft","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group photobooth-feature-tag has-border-color has-border-soft-border-color has-muted-color has-text-color has-link-color"
                style="border-width:1px;padding-top:10px;padding-right:16px;padding-bottom:10px;padding-left:16px;font-size:11px;text-transform:uppercase">
                <!-- wp:group {"style":{"spacing":{"blockGap":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|gold"}}}},"textColor":"gold","layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group has-gold-color has-text-color has-link-color">
                    <!-- wp:image {"aspectRatio":"1","scale":"cover","sizeSlug":"large","style":{"layout":{"selfStretch":"fixedNoShrink","flexSize":"18px"}}} -->
                    <figure class="wp-block-image size-large"><img
                            src="https://s.w.org/images/core/emoji/17.0.2/svg/1f4f1.svg" alt="📱"
                            style="aspect-ratio:1;object-fit:cover" /></figure>
                    <!-- /wp:image -->

                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px","left":"0px","right":"0px"}},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                    <p class="has-muted-color has-text-color has-link-color"
                        style="margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px"> Custom Playlists</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->

            <!-- wp:group {"metadata":{"name":"Feature Tag"},"className":"photobooth-feature-tag","style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"16px","right":"16px"},"blockGap":"8px"},"border":{"width":"1px"},"typography":{"textTransform":"uppercase","fontSize":"11px"}},"textColor":"muted","borderColor":"border-soft","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group photobooth-feature-tag has-border-color has-border-soft-border-color has-muted-color has-text-color has-link-color"
                style="border-width:1px;padding-top:10px;padding-right:16px;padding-bottom:10px;padding-left:16px;font-size:11px;text-transform:uppercase">
                <!-- wp:group {"style":{"spacing":{"blockGap":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|gold"}}}},"textColor":"gold","layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group has-gold-color has-text-color has-link-color">
                    <!-- wp:image {"aspectRatio":"1","scale":"cover","sizeSlug":"large","style":{"layout":{"selfStretch":"fixedNoShrink","flexSize":"18px"}}} -->
                    <figure class="wp-block-image size-large"><img
                            src="https://s.w.org/images/core/emoji/17.0.2/svg/1f3a8.svg" alt="🎨"
                            style="aspect-ratio:1;object-fit:cover" /></figure>
                    <!-- /wp:image -->

                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px","left":"0px","right":"0px"}},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                    <p class="has-muted-color has-text-color has-link-color"
                        style="margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px">Custom overlays</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->

            <!-- wp:group {"metadata":{"name":"Feature Tag"},"className":"photobooth-feature-tag","style":{"elements":{"link":{"color":{"text":"var:preset|color|muted"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"16px","right":"16px"},"blockGap":"8px"},"border":{"width":"1px"},"typography":{"textTransform":"uppercase","fontSize":"11px"}},"textColor":"muted","borderColor":"border-soft","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group photobooth-feature-tag has-border-color has-border-soft-border-color has-muted-color has-text-color has-link-color"
                style="border-width:1px;padding-top:10px;padding-right:16px;padding-bottom:10px;padding-left:16px;font-size:11px;text-transform:uppercase">
                <!-- wp:group {"style":{"spacing":{"blockGap":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|gold"}}}},"textColor":"gold","layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group has-gold-color has-text-color has-link-color">
                    <!-- wp:image {"aspectRatio":"1","scale":"cover","sizeSlug":"large","style":{"layout":{"selfStretch":"fixedNoShrink","flexSize":"18px"}}} -->
                    <figure class="wp-block-image size-large"><img
                            src="https://s.w.org/images/core/emoji/17.0.2/svg/1f3b5.svg" alt="🎵"
                            style="aspect-ratio:1;object-fit:cover" /></figure>
                    <!-- /wp:image -->

                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0px","bottom":"0px","left":"0px","right":"0px"}},"elements":{"link":{"color":{"text":"var:preset|color|muted"}}}},"textColor":"muted"} -->
                    <p class="has-muted-color has-text-color has-link-color"
                        style="margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px">Music &amp; effects
                    </p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->