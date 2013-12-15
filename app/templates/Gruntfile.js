// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
            //../../www/wordpress-default/wp-content/themes/<%= pkg.name %>
        },

        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['compass', 'autoprefixer', 'csso', 'csslint', 'version', 'shell']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify', 'version', 'shell']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    '<%%= yeoman.dist %>/assets/css/app.css',
                    '<%%= yeoman.dist %>/assets/js/scripts.min.js',
                    '<%%= yeoman.dist %>/templates/*.php',
                    '*.php'
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/*',
                        '<%%= yeoman.dist %>/*'
                    ]
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/assets/js/{,*/}*.js',
                '!<%%= yeoman.app %>assets/js/vendor/*',
                '!<%%= yeoman.app %>/assets/js/plugins/*'
            ]
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: false
                },
                src: ['<%%= yeoman.dist %>/assets/css/app.css']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= _.slugify(themeName) %> <%= (new Date).toISOString().split('T')[0] %> */\n'
            },
            dist: {
                options: {
                    sourceMap: '<%%= yeoman.dist %>/assets/js/map/source-map.js',
                    sourceMappingURL: 'map/source-map.js'
                },
                files: {
                    '.tmp/assets/js/scripts.min.js': [
                        '<%%= yeoman.app %>/assets/js/plugins/*.js',
                        '<%%= yeoman.app %>/assets/js/main.js'
                    ]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: '<%%= yeoman.app %>/sass',
                    cssDir: '.tmp',
                    imagesDir: '<%%= yeoman.app %>/assets/img',
                    javascriptsDir: '<%%= yeoman.app %>/assets/js',
                    fontsDir: '<%%= yeoman.app %>/assets/fonts',
                    outputStyle: 'compressed',
                    generatedImagesDir: '.tmp/assets/img/generated',
                    debugInfo: false
                }
            }
        },
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '.tmp/assets/js/vendor/modernizr-custom.js',
            files: [
                '<%%= yeoman.app %>/assets/scripts/{,*/}*.js',
                '<%%= yeoman.app %>/sass/{,*/}*.scss',
                '!Gruntfile.js',
                '!bower_components/{,*/}*.js'
            ],
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/assets/img'
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/assets/img'
                }]
            }
        },
        concurrent: {
            dist: [
                'uglify',
                'compass',
                'modernizr',
                'svgmin',
                'imagemin'
            ]
        },
        autoprefixer: {
            singleFile: {
                src: '.tmp/app.css',
                dest: '.tmp/app.ai.css'
            }
        },
        csso: {
            compress: {
                files: {
                    '.tmp/assets/css/app.css': ['.tmp/app.ai.css']
                }
            }
        },
        version: {
            options: {
                file: '.tmp/lib/scripts.php',
                css: '.tmp/assets/css/app.css',
                cssHandle: 'egzpo_main',
                js: '.tmp/assets/js/scripts.min.js',
                jsHandle: 'egzpo_scripts',
                modernizr: '.tmp/assets/js/vendor/modernizr-custom.js',
                jsModernizr: 'modernizr'
            }
        },
        copy: {
            scripts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '.tmp',
                    src: [
                        'lib/scripts.php'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt,php,css}',
                        '.htaccess',
                        'assets/img/{,*/}*.{webp,gif,ico}',
                        'assets/fonts/*',
                        'assets/js/vendor/*',
                        'lang/*',
                        'lib/*',
                        'templates/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        'assets/**/*',
                        'lib/*'
                    ]
                },
                // }, {
                //     expand: true,
                //     cwd: 'WORDPRESS_ROOT',
                //     dest: '../../www/wordpress-default/',
                //     src: [
                //         '*.txt'
                //     ]
                // }, {
                {
                    expand: true,
                    cwd: 'bower_components/jquery',
                    dest: '<%%= yeoman.dist %>/assets/js/vendor',
                    src: [
                        'jquery.min.js'
                    ]
                }]
            }
        },
        plato: {
            complexity: {
                options : {
                    jshint : grunt.file.readJSON('.jshintrc')
                },
                files: {
                    '.tmp/reports/js-complexity': [
                        '<%%= yeoman.app %>/assets/js/{,*/}*.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'concurrent',
        'autoprefixer',
        'csso',
        'copy:scripts',
        'version',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build',
        'csslint',
        'plato'
    ]);

    grunt.registerTask('travis', [
        'jshint',
        'csslint'
    ]);
};
