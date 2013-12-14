<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php wp_title('|', true, 'right'); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php wp_head(); ?>

	<link href='//ajax.googleapis.com' rel='dns-prefetch' />
	<link href='<?php echo get_stylesheet_directory_uri(); ?>/humans.txt' rel='author' type='text/plain' />
    <% if (includeLogo) { %>
	<link href='<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo.svg' rel='logo' type='image/svg' />
    <% } %>
	<link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('name'); ?> Feed" href="<?php echo home_url(); ?>/feed/">

	<meta content='false' http-equiv='imagetoolbar' />
	<meta content='éGz - http://egztudio.com/' name='author' />
</head>
