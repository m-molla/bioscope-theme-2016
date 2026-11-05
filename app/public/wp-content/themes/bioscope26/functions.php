<?php
/**
 * Bioscope Theme Setup & Assets Enqueue
 */

if (!function_exists('bioscope_setup')):
    function bioscope_setup()
    {
        // Core Block Theme Supports
        add_theme_support('wp-block-styles');
        add_theme_support('editor-styles');
        add_editor_style('style.css');

        // Layout & Feature Supports
        add_theme_support('post-thumbnails');
        add_theme_support('responsive-embeds');
        add_theme_support('align-wide');
    }
endif;
add_action('after_setup_theme', 'bioscope_setup');

// Apply a saved color scheme before the browser paints the page to prevent a flash.
function bioscope_apply_saved_theme_before_paint()
{
    ?>
    <script>
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            document.documentElement.classList.add(savedTheme);
        }
    </script>
    <?php
}
add_action('wp_head', 'bioscope_apply_saved_theme_before_paint', 0);

/**
 * Enqueue Styles and Scripts
 */





function bioscope_enqueue_assets()
{
    // filemtime() 
    $css_path = get_template_directory() . '/style.css';
    $js_path = get_template_directory() . '/assets/js/dark-mode.js';
    $checkbox_js_path = get_template_directory() . '/assets/js/checkbox.js';
    $navigation_js_path = get_template_directory() . '/assets/js/navigation.js';

    $css_version = file_exists($css_path) ? filemtime($css_path) : '1.0.0';
    $js_version = file_exists($js_path) ? filemtime($js_path) : '1.0.0';
    $checkbox_js_version = file_exists($checkbox_js_path) ? filemtime($checkbox_js_path) : '1.0.0';
    $navigation_js_version = file_exists($navigation_js_path) ? filemtime($navigation_js_path) : '1.0.0';

    // Enqueue Theme Main Style 
    wp_enqueue_style(
        'bioscope-style',
        get_stylesheet_uri(),
        array(),
        $css_version
    );

    // Enqueue Dark Mode JS
    wp_enqueue_script(
        'bioscope-dark-mode',
        get_template_directory_uri() . '/assets/js/dark-mode.js',
        array(),
        $js_version,
        true
    );
    wp_enqueue_script(
        'bioscope-checkbox-logic',
        get_template_directory_uri() . '/assets/js/checkbox.js',
        array(),
        $checkbox_js_version,
        true
    );
    wp_enqueue_script(
        'bioscope-navigation',
        get_template_directory_uri() . '/assets/js/navigation.js',
        array(),
        $navigation_js_version,
        true
    );
    wp_enqueue_script(
        'bioscope-mix',
        get_template_directory_uri() . '/assets/js/script.js',
        array(),
        $navigation_js_version,
        true
    );

}
add_action('wp_enqueue_scripts', 'bioscope_enqueue_assets');

function bioscope_cloudinary_image_url($url, $width)
{
    if (!preg_match('~^(https?:)?//(res\.cloudinary\.com/[^/]+/image/upload/)(v\d+/.*)$~i', $url, $matches)) {
        return $url;
    }

    $width = min(2560, max(320, absint($width)));

    return ($matches[1] ?: 'https:') . '//' . $matches[2] . 'f_auto,q_auto,w_' . $width . '/' . $matches[3];
}

function bioscope_optimize_cloudinary_image_tag($image)
{
    if (!preg_match('~\bsrc="([^"]+)"~i', $image, $matches)) {
        return $image;
    }

    if (preg_match('~\bsrcset="[^"]+"~i', $image)) {
        return $image;
    }

    $original_url = html_entity_decode($matches[1], ENT_QUOTES, get_bloginfo('charset'));
    $optimized_src = bioscope_cloudinary_image_url($original_url, 1280);

    if ($optimized_src === $original_url) {
        return $image;
    }

    $image = preg_replace(
        '~\bsrc="[^"]+"~i',
        'src="' . esc_url($optimized_src) . '"',
        $image,
        1
    );

    $widths = array(480, 768, 1024, 1280, 1600, 1920, 2560);
    $srcset = array();

    foreach ($widths as $width) {
        $srcset[] = esc_url(bioscope_cloudinary_image_url($original_url, $width)) . ' ' . $width . 'w';
    }

    $attributes = ' srcset="' . esc_attr(implode(', ', $srcset)) . '"';
    if (!preg_match('~\bsizes="[^"]*"~i', $image)) {
        $attributes .= ' sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"';
    }
    $image = preg_replace_callback(
        '~\s*/?>$~',
        function ($tag_end) use ($attributes) {
            return $attributes . $tag_end[0];
        },
        $image,
        1
    );

    return $image;
}
add_filter('wp_content_img_tag', 'bioscope_optimize_cloudinary_image_tag', 10, 1);


// Service Validation 
function bioscope_validate_services_needed($result, $tags)
{
    $service_tag = null;

    foreach ($tags as $tag) {
        if ($tag->name === 'services-needed' && $tag->type === 'checkbox') {
            $service_tag = $tag;
            break;
        }
    }

    if (!$service_tag) {
        return $result;
    }

    $submission = WPCF7_Submission::get_instance();
    $selected_services = $submission ? $submission->get_posted_data('services-needed') : null;

    if (empty($selected_services)) {
        $result->invalidate(
            $service_tag,
            __('Please select at least one service.', 'bioscope26')
        );
    }

    return $result;
}
add_filter('wpcf7_validate', 'bioscope_validate_services_needed', 20, 2);



// font awesome 
function my_theme_enqueue_fontawesome()
{
    $queried_object = get_queried_object();
    $content = $queried_object instanceof WP_Post ? $queried_object->post_content : '';

    if (strpos($content, 'fa-') === false) {
        return;
    }

    // Enqueue for front-end
    wp_enqueue_style(
        'font-awesome-local',
        get_template_directory_uri() . '/assets/fontawesome/css/all.min.css',
        array(),
        '6.5.0'
    );
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_fontawesome');

// Also load inside Gutenberg block editor
function my_theme_editor_fontawesome()
{
    add_editor_style('assets/fontawesome/css/all.min.css');
}
add_action('after_setup_theme', 'my_theme_editor_fontawesome');


// custom post fileds link

require_once get_template_directory() . '/inc/custom-post-fields.php';

function bioscope_post_meta_callback($post)
{
    $subtitle_value = get_post_meta($post->ID, '_bioscope_post_subtitle', true);
    wp_nonce_field('bioscope_save_post_meta', 'bioscope_post_nonce');
    ?>
    <p>
        <label for="bioscope_post_subtitle" style="display:block; font-weight:600; margin-bottom:5px;">Post Subtitle / Extra
            Info:</label>
        <input type="text" id="bioscope_post_subtitle" name="bioscope_post_subtitle"
            value="<?php echo esc_attr($subtitle_value); ?>" style="width:100%; padding:8px;" />
    </p>
    <?php
}

function bioscope_save_default_post_meta($post_id)
{
    if (!isset($_POST['bioscope_post_nonce']) || !wp_verify_nonce($_POST['bioscope_post_nonce'], 'bioscope_save_post_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['bioscope_post_subtitle'])) {
        update_post_meta($post_id, '_bioscope_post_subtitle', sanitize_text_field($_POST['bioscope_post_subtitle']));
    }
}
add_action('save_post', 'bioscope_save_default_post_meta');