<?php
/**
 * Clean up wp_head()
 *
 * Remove unnecessary <link>'s
 * Remove inline CSS used by Recent Comments widget
 * Remove inline CSS used by posts with galleries
 * Remove self-closing tag and change ''s to "'s on rel_canonical()
 */
function egzpo_head_cleanup() {
  // Originally from http://wpengineer.com/1438/wordpress-header/
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

  global $wp_widget_factory;
  remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));

  if (!class_exists('WPSEO_Frontend')) {
    remove_action('wp_head', 'rel_canonical');
    add_action('wp_head', 'egzpo_rel_canonical');
  }
}

function egzpo_rel_canonical() {
  global $wp_the_query;

  if (!is_singular()) {
    return;
  }

  if (!$id = $wp_the_query->get_queried_object_id()) {
    return;
  }

  $link = get_permalink($id);
  echo "\t<link rel=\"canonical\" href=\"$link\">\n";
}
add_action('init', 'egzpo_head_cleanup');

/**
 * Remove the WordPress version from RSS feeds
 */
add_filter('the_generator', '__return_false');

/**
 * Clean up language_attributes() used in <html> tag
 *
 * Remove dir="ltr"
 */
function egzpo_language_attributes() {
  $attributes = array();
  $output = '';

  if (is_rtl()) {
    $attributes[] = 'dir="rtl"';
  }

  $lang = get_bloginfo('language');

  if ($lang) {
    $attributes[] = "lang=\"$lang\"";
  }

  $output = implode(' ', $attributes);
  $output = apply_filters('egzpo_language_attributes', $output);

  return $output;
}
add_filter('language_attributes', 'egzpo_language_attributes');

/**
 * Manage output of wp_title()
 */
function egzpo_wp_title($title) {
  if (is_feed()) {
    return $title;
  }

  $title .= get_bloginfo('name');

  return $title;
}
add_filter('wp_title', 'egzpo_wp_title', 10);

/**
 * Clean up output of stylesheet <link> tags
 */
function egzpo_clean_style_tag($input) {
  preg_match_all("!<link rel='stylesheet'\s?(id='[^']+')?\s+href='(.*)' type='text/css' media='(.*)' />!", $input, $matches);
  // Only display media if it is meaningful
  $media = $matches[3][0] !== '' && $matches[3][0] !== 'all' ? ' media="' . $matches[3][0] . '"' : '';
  return '<link rel="stylesheet" href="' . $matches[2][0] . '"' . $media . '>' . "\n";
}
add_filter('style_loader_tag', 'egzpo_clean_style_tag');

/**
 * Add and remove body_class() classes
 */
function egzpo_body_class($classes) {
  // Add post/page slug
  if (is_single() || is_page() && !is_front_page()) {
    $classes[] = basename(get_permalink());
  }

  // Remove unnecessary classes
  $home_id_class = 'page-id-' . get_option('page_on_front');
  $remove_classes = array(
    'page-template-default',
    $home_id_class
  );
  $classes = array_diff($classes, $remove_classes);

  return $classes;
}
add_filter('body_class', 'egzpo_body_class');

/**
 * Wrap embedded media as suggested by Readability
 *
 * @link https://gist.github.com/965956
 * @link http://www.readability.com/publishers/guidelines#publisher
 */
function egzpo_embed_wrap($cache, $url, $attr = '', $post_ID = '') {
  return '<div class="entry-content-asset">' . $cache . '</div>';
}
add_filter('embed_oembed_html', 'egzpo_embed_wrap', 10, 4);

/**
 * Add Bootstrap thumbnail styling to images with captions
 * Use <figure> and <figcaption>
 *
 * @link http://justintadlock.com/archives/2011/07/01/captions-in-wordpress
 */
function egzpo_caption($output, $attr, $content) {
  if (is_feed()) {
    return $output;
  }

  $defaults = array(
    'id'      => '',
    'align'   => 'alignnone',
    'width'   => '',
    'caption' => ''
  );

  $attr = shortcode_atts($defaults, $attr);

  // If the width is less than 1 or there is no caption, return the content wrapped between the [caption] tags
  if ($attr['width'] < 1 || empty($attr['caption'])) {
    return $content;
  }

  // Set up the attributes for the caption <figure>
  $attributes  = (!empty($attr['id']) ? ' id="' . esc_attr($attr['id']) . '"' : '' );
  $attributes .= ' class="thumbnail wp-caption ' . esc_attr($attr['align']) . '"';
  $attributes .= ' style="width: ' . (esc_attr($attr['width']) + 10) . 'px"';

  $output  = '<figure' . $attributes .'>';
  $output .= do_shortcode($content);
  $output .= '<figcaption class="caption wp-caption-text">' . $attr['caption'] . '</figcaption>';
  $output .= '</figure>';

  return $output;
}
add_filter('img_caption_shortcode', 'egzpo_caption', 10, 3);

/**
 * Remove unnecessary dashboard widgets
 *
 * @link http://www.deluxeblogtips.com/2011/01/remove-dashboard-widgets-in-wordpress.html
 */
function egzpo_remove_dashboard_widgets() {
  remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
  remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
  remove_meta_box('dashboard_primary', 'dashboard', 'normal');
  remove_meta_box('dashboard_secondary', 'dashboard', 'normal');
}
add_action('admin_init', 'egzpo_remove_dashboard_widgets');

/**
 * Clean up the_excerpt()
 */
function egzpo_excerpt_length($length) {
  return POST_EXCERPT_LENGTH;
}

function egzpo_excerpt_more($more) {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'egzpo') . '</a>';
}
add_filter('excerpt_length', 'egzpo_excerpt_length');
add_filter('excerpt_more', 'egzpo_excerpt_more');

/**
 * Remove unnecessary self-closing tags
 */
function egzpo_remove_self_closing_tags($input) {
  return str_replace(' />', '>', $input);
}
add_filter('get_avatar',          'egzpo_remove_self_closing_tags'); // <img />
add_filter('comment_id_fields',   'egzpo_remove_self_closing_tags'); // <input />
add_filter('post_thumbnail_html', 'egzpo_remove_self_closing_tags'); // <img />

/**
 * Don't return the default description in the RSS feed if it hasn't been changed
 */
function egzpo_remove_default_description($bloginfo) {
  $default_tagline = 'Just another WordPress site';
  return ($bloginfo === $default_tagline) ? '' : $bloginfo;
}
add_filter('get_bloginfo_rss', 'egzpo_remove_default_description');

/**
 * Redirects search results from /?s=query to /search/query/, converts %20 to +
 *
 * @link http://txfx.net/wordpress-plugins/nice-search/
 */
function egzpo_nice_search_redirect() {
  global $wp_rewrite;
  if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->using_permalinks()) {
    return;
  }

  $search_base = $wp_rewrite->search_base;
  if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false) {
    wp_redirect(home_url("/{$search_base}/" . urlencode(get_query_var('s'))));
    exit();
  }
}
if (current_theme_supports('nice-search')) {
  add_action('template_redirect', 'egzpo_nice_search_redirect');
}

/**
 * Fix for empty search queries redirecting to home page
 *
 * @link http://wordpress.org/support/topic/blank-search-sends-you-to-the-homepage#post-1772565
 * @link http://core.trac.wordpress.org/ticket/11330
 */
function egzpo_request_filter($query_vars) {
  if (isset($_GET['s']) && empty($_GET['s']) && !is_admin()) {
    $query_vars['s'] = ' ';
  }

  return $query_vars;
}
add_filter('request', 'egzpo_request_filter');

/**
 * Tell WordPress to use searchform.php from the templates/ directory
 */
function egzpo_get_search_form($argument) {
  $form = '';
  locate_template('/templates/searchform.php', true, false);
  return $form;
}
add_filter('get_search_form', 'egzpo_get_search_form');

/**
 * Add favicons to head
 */
function egzpo_favicon_link() {
  echo "<link rel='shortcut icon' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/favicon.ico' />" . "\n";
  // For iPad with high-resolution Retina display running iOS ≥ 7
  echo "<link rel='apple-touch-icon-precomposed' sizes='152x152' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-152x152-precomposed.png' />" . "\n";
  // For iPad with high-resolution Retina display running iOS ≤ 6
  echo "<link rel='apple-touch-icon-precomposed' sizes='144x144' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-144x144-precomposed.png' />" . "\n";
  // For iPhone with high-resolution Retina display running iOS ≥ 7
  echo "<link rel='apple-touch-icon-precomposed' sizes='120x120' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-120x120-precomposed.png' />" . "\n";
  // For iPhone with high-resolution Retina display running iOS ≤ 6
  echo "<link rel='apple-touch-icon-precomposed' sizes='114x114' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-114x114-precomposed.png' />" . "\n";
  // For the iPad mini and the first- and second-generation iPad on iOS ≥ 7
  echo "<link rel='apple-touch-icon-precomposed' sizes='76x76' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-76x76-precomposed.png' />" . "\n";
  // For the iPad mini and the first- and second-generation iPad on iOS ≤ 6
  echo "<link rel='apple-touch-icon-precomposed' sizes='72x72' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-72x72-precomposed.png' />" . "\n";
  // For non-Retina iPhone, iPod Touch, and Android 2.1+ devices
  echo "<link rel='apple-touch-icon-precomposed' href='" . get_stylesheet_directory_uri() . "/assets/img/favicons/apple-touch-icon-precomposed.png' />" . "\n";
}
add_action( 'wp_head', 'egzpo_favicon_link' );

/**
 * Add excerpts to pages
 */

function egzpo_excerpts_to_pages() {
     add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'egzpo_excerpts_to_pages' );

/**
 * Clean up contact methods and add some
 */

function egzpo_contact_methods( $contactmethods ) {
 
    // Remove we what we don't want
    unset( $contactmethods[ 'aim' ] );
    unset( $contactmethods[ 'yim' ] );
    unset( $contactmethods[ 'jabber' ] );
 
    // Add some useful ones
    $contactmethods[ 'twitter' ]    = 'Twitter Username';
    $contactmethods[ 'facebook' ]   = 'Facebook Profile URL';
    $contactmethods[ 'linkedin' ]   = 'LinkedIn Public Profile URL';
    $contactmethods[ 'googleplus' ] = 'Google+ Profile URL';
 
    return $contactmethods;
} 
add_filter( 'user_contactmethods', 'egzpo_contact_methods' );

/**
 * Remove wp version param from any enqueued scripts
 */

function egzpo_remove_wp_ver_css_js( $src ) {
    if ( strpos( $src, 'ver=' ) )
        $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'egzpo_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'egzpo_remove_wp_ver_css_js', 9999 );