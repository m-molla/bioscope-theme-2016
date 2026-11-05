<?php
if (!defined('ABSPATH')) {
    exit;
}
class Bioscope_Albums_Render
{
    public static function render($attributes = array(), $content = '', $block = null)
    {
        $a = wp_parse_args($attributes, array('postsPerPage' => 12, 'desktopColumns' => 3, 'tabletColumns' => 2, 'mobileColumns' => 1, 'gap' => 24, 'tabletGap' => 20, 'mobileGap' => 16, 'cardRadius' => 14, 'imageRadius' => 0, 'category' => '', 'showTitle' => true, 'showOccasion' => false, 'showCount' => false, 'showOpenLink' => true, 'emptyMessage' => __('No albums are available yet.', 'bioscope-albums')));
        $limit = (int) $a['postsPerPage'];
        $limit = $limit === -1 ? -1 : max(1, min(100, $limit));
        $args = array('post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => $limit, 'orderby' => array('menu_order' => 'ASC', 'date' => 'DESC'), 'ignore_sticky_posts' => true, 'no_found_rows' => true);
        if (!empty($a['category']))
            $args['category_name'] = sanitize_title($a['category']);
        $q = new WP_Query($args);
        if (!$q->have_posts())
            return '<p class="bioscope-albums-empty">' . esc_html($a['emptyMessage']) . '</p>';
        wp_enqueue_style('bioscope-albums-front', BIOSCOPE_ALBUMS_URL . 'assets/masonry.css', array(), BIOSCOPE_ALBUMS_VERSION);
        wp_enqueue_script('bioscope-albums-masonry', BIOSCOPE_ALBUMS_URL . 'assets/masonry.js', array(), BIOSCOPE_ALBUMS_VERSION, true);
        $d = max(1, min(6, (int) $a['desktopColumns']));
        $t = max(1, min(4, (int) $a['tabletColumns']));
        $m = max(1, min(2, (int) $a['mobileColumns']));
        $gap = max(0, min(100, (int) $a['gap']));
        $tg = max(0, min(100, (int) $a['tabletGap']));
        $mg = max(0, min(100, (int) $a['mobileGap']));
        $style = sprintf('--ba-columns:%d;--ba-tablet-columns:%d;--ba-mobile-columns:%d;--ba-gap:%dpx;--ba-tablet-gap:%dpx;--ba-mobile-gap:%dpx;--ba-card-radius:%dpx;--ba-image-radius:%dpx;', $d, $t, $m, $gap, $tg, $mg, max(0, min(40, (int) $a['cardRadius'])), max(0, min(40, (int) $a['imageRadius'])));
        $id = wp_unique_id('bioscope-albums-');
        ob_start(); ?>
        <div id="<?php echo esc_attr($id); ?>" class="bioscope-albums" style="<?php echo esc_attr($style); ?>">
            <div class="bioscope-albums__grid">
                <?php while ($q->have_posts()):
                    $q->the_post();
                    $pid = get_the_ID();
                    $title = get_the_title($pid);
                    $thumbnail_id = get_post_thumbnail_id($pid);
                    $image_url = $thumbnail_id ? wp_get_original_image_url($thumbnail_id) : false;
                    if (!$image_url && $thumbnail_id) {
                        $image_url = wp_get_attachment_image_url($thumbnail_id, 'full');
                    }
                    $count = get_post_meta($pid, '_bioscope_total_photos', true);
                    $count = is_scalar($count) ? trim((string) $count) : '';
                    $image_height = absint(get_post_meta($pid, Bioscope_Albums_Post_Meta::KEY, true));
                    if ($image_height < 80 || $image_height > 2000)
                        $image_height = 0;
                    $occasion = '';
                    if (!empty($a['showOccasion'])) {
                        $terms = get_the_category($pid);
                        if ($terms && !is_wp_error($terms))
                            $occasion = $terms[0]->name;
                    }
                    $link = get_post_meta($pid, '_bioscope_album_link', true);
                    $url = is_string($link) && filter_var($link, FILTER_VALIDATE_URL) ? $link : get_permalink($pid);
                    $target = (is_string($link) && filter_var($link, FILTER_VALIDATE_URL)) ? '_blank' : '_self';
                    ?>
                    <article class="bioscope-albums__card"><a class="bioscope-albums__link" target="_blank"
                            href="<?php echo esc_url($url); ?>" target="<?php echo esc_attr($target); ?>" <?php echo $target === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>
                            aria-label="<?php echo esc_attr(sprintf(__('Open album: %s', 'bioscope-albums'), $title)); ?>">
                            <div class="bioscope-albums__cover" <?php if ($image_height): ?>
                                    style="--ba-image-height:<?php echo esc_attr($image_height); ?>px" <?php endif; ?>>
                                <?php if ($image_url) {
                                    printf(
                                        '<img class="bioscope-albums__image" src="%s" alt="%s" loading="lazy" decoding="async">',
                                        esc_url($image_url),
                                        esc_attr($title)
                                    );
                                } else { ?>
                                    <div class="bioscope-albums__no-image" aria-hidden="true"></div><?php } ?>
                                <?php if (!empty($a['showCount']) && $count !== ''): ?><span
                                        class="bioscope-albums__count"><?php echo esc_html($count . ' ' . _n('Photo', 'Photos', is_numeric($count) ? (int) $count : 2, 'bioscope-albums')); ?></span><?php endif; ?>
                            </div>
                            <?php if (!empty($a['showTitle']) || $occasion || !empty($a['showOpenLink'])): ?>
                                <div class="bioscope-albums__info"><?php if (!empty($a['showTitle'])): ?>
                                        <h3 class="bioscope-albums__title"><?php echo esc_html($title); ?></h3>
                                    <?php endif; ?>                 <?php if ($occasion): ?>
                                        <p class="bioscope-albums__meta"><span><?php echo esc_html($occasion); ?></span></p>
                                    <?php endif; ?>                 <?php if (!empty($a['showOpenLink'])): ?><span
                                            class="bioscope-albums__open"><?php esc_html_e('Open Album', 'bioscope-albums'); ?></span><?php endif; ?>
                                </div><?php endif; ?>
                        </a></article>
                <?php endwhile; ?>
            </div>
        </div>
        <?php wp_reset_postdata();
        return ob_get_clean();
    }
}
