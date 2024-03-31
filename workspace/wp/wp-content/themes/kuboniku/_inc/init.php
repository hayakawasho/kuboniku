<?php

/*
  * Let WordPress manage the document title.
  * By adding theme support, we declare that this theme does not use a
  * hard-coded <title> tag in the document head, and expect WordPress to
  * provide it for us.
  */

// add_theme_support('title-tag');

// cleanup
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'feed_links_extra', 3); // コメントのRSS
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_oembed_add_host_js');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');

// head内のインラインスタイル削除
function remove_inline_style() {
  global $wp_widget_factory;
  remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}

add_filter('widgets_init', 'remove_inline_style');

// head内のdns-prefetchを削除
function remove_dns_prefetch($hints, $relation_type) {
  if ('dns-prefetch' === $relation_type) {
    return array_diff(wp_dependencies_unique_hosts(), $hints);
  }
  return $hints;
}

add_filter('wp_resource_hints', 'remove_dns_prefetch', 10, 2);

add_filter('show_admin_bar', '__return_false');

add_action('wp_enqueue_scripts', 'dequeue_plugins_style', 10);

add_image_size('thumbnail', 0, 0);
add_image_size('medium', 750, 9999);
add_image_size('medium_large', 1080, 9999);
add_image_size('large', 1280, 9999);
add_image_size('1536x1536', 1680, 9999);
add_image_size('2048x2048', 2048, 9999);

add_filter('big_image_size_threshold', '__return_false');

// 
add_action('rest_api_init', 'register_rest_images' );

function register_rest_images(){
  register_rest_field( array('post'),
    'featured_image',
    array(
      'get_callback' => 'get_rest_featured_image',
      'update_callback' => null,
      'schema' => null,
    )
  );
}

function get_rest_featured_image( $object, $field_name, $request ) {
  if ($object['featured_media']) {
    $img = wp_get_attachment_image_src( $object['featured_media'], 'full' );

    return [
      'src' => $img[0],
      'width' => $img[1],
      'height' => $img[2],
    ];
  }

  return false;
}

// function my_customize_rest_cors() {
// 	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
// 	add_filter( 'rest_pre_serve_request', function( $value ) {
// 		header( 'Access-Control-Allow-Origin: *' );
// 		header( 'Access-Control-Allow-Methods: GET' );
// 		header( 'Access-Control-Allow-Credentials: true' );
// 		header( 'Access-Control-Expose-Headers: Link', false );
//
// 		return $value;
// 	} );
// }
//
// add_action( 'rest_api_init', 'my_customize_rest_cors', 15 );