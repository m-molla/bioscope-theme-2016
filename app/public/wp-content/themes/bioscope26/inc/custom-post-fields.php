<?php
/**
 * Custom Meta Box for Default Posts (Album Link & Total Photos)
 */

// 1. Register the Meta Box
function bioscope_extra_post_meta_box()
{
    add_meta_box(
        'bioscope_album_details_box',     // ID
        'Album Details',                  // Box Title
        'bioscope_album_meta_callback',   // Callback function
        'post',                           // Post Type (Default Post)
        'normal',                         // Context
        'high'                            // Priority
    );
}
add_action('add_meta_boxes', 'bioscope_extra_post_meta_box');

// 2. Render HTML Form for Meta Box Fields
function bioscope_album_meta_callback($post)
{
    // Fetch previously saved values
    $album_link = get_post_meta($post->ID, '_bioscope_album_link', true);
    $total_photos = get_post_meta($post->ID, '_bioscope_total_photos', true);

    // Nonce field for security verification
    wp_nonce_field('bioscope_save_album_meta', 'bioscope_album_nonce');
    ?>
    <div style="margin-bottom: 15px;">
        <label for="bioscope_album_link" style="display:block; font-weight:600; margin-bottom:5px; color:#1d2327;">Album
            Link:</label>
        <input type="url" id="bioscope_album_link" name="bioscope_album_link" value="<?php echo esc_url($album_link); ?>"
            placeholder="https://example.com/album"
            style="width:100%; padding:8px; border:1px solid #8c8f94; border-radius:4px;" />
    </div>

    <div>
        <label for="bioscope_total_photos" style="display:block; font-weight:600; margin-bottom:5px; color:#1d2327;">Total
            Photos:</label>
        <input type="text" id="bioscope_total_photos" name="bioscope_total_photos"
            value="<?php echo esc_attr($total_photos); ?>" placeholder="e.g. 45"
            style="width:100%; padding:8px; border:1px solid #8c8f94; border-radius:4px;" />
    </div>
    <?php
}

// 3. Save Meta Box Data on Post Publish or Update
function bioscope_save_album_meta_data($post_id)
{
    // Security and autosave checks
    if (!isset($_POST['bioscope_album_nonce']) || !wp_verify_nonce($_POST['bioscope_album_nonce'], 'bioscope_save_album_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Sanitize and save Album Link
    if (isset($_POST['bioscope_album_link'])) {
        update_post_meta($post_id, '_bioscope_album_link', esc_url_raw($_POST['bioscope_album_link']));
    }

    // Sanitize and save Total Photos
    if (isset($_POST['bioscope_total_photos'])) {
        update_post_meta($post_id, '_bioscope_total_photos', sanitize_text_field($_POST['bioscope_total_photos']));
    }
}
add_action('save_post', 'bioscope_save_album_meta_data');