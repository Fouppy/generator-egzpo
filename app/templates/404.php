<?php get_template_part('templates/page', 'header'); ?>

<div class="alert">
  <?php _e('Sorry, but the page you were trying to view does not exist.', 'egzpo'); ?>
</div>

<p><?php _e('It looks like this was the result of either:', 'egzpo'); ?></p>
<ul>
  <li><?php _e('a mistyped address', 'egzpo'); ?></li>
  <li><?php _e('an out-of-date link', 'egzpo'); ?></li>
</ul>

<?php get_search_form(); ?>
