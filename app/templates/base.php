<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?>>

  <!--[if lt IE 8]>
    <div class="alert alert-warning">
      <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'egzpo'); ?>
    </div>
  <![endif]-->

  <?php
    do_action('get_header');
    get_template_part('templates/header');
  ?>

  <div class="wrap container" role="document">
    <div class="content grid row">
      <main class="main <?php echo egzpo_main_class(); ?>" role="main">
        <?php include egzpo_template_path(); ?>
      </main><!-- /.main -->
      <?php if (egzpo_display_sidebar()) : ?>
        <aside class="sidebar <?php echo egzpo_sidebar_class(); ?>" role="complementary">
          <?php include egzpo_sidebar_path(); ?>
        </aside><!-- /.sidebar -->
      <?php endif; ?>
    </div><!-- /.content -->
  </div><!-- /.wrap -->

  <?php get_template_part('templates/footer'); ?>
  <!-- browserSync -->
</body>
</html>
