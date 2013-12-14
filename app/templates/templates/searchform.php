<form role="search" method="get" class="search-form form-inline" action="<?php echo home_url('/'); ?>">
	<input type="search" value="<?php if (is_search()) { echo get_search_query(); } ?>" name="s" class="search-field form-control" placeholder="<?php _e('Search', 'egzpo'); ?> <?php bloginfo('name'); ?>">
	<label class="hide"><?php _e('Search for:', 'egzpo'); ?></label>
	<button type="submit" class="search-submit btn btn-default"><?php _e('Search', 'egzpo'); ?></button>
</form>
