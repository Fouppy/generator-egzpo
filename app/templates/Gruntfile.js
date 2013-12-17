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
            dist: 'dist',
            tmp: '.tmp'
        },

        pkg: grunt.file.readJSON('package.json'),

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            compass: {
                files: ['<%%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass', 'autoprefixer', 'version']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['uglify', 'version']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
                    '<%%= yeoman.dist %>/assets/js/{,*/}*.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.tmp %>/**/*',
                        '<%%= yeoman.dist %>/**',
                        '!<%%= yeoman.tmp %>/reports/**'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/assets/js/{,*/}*.js',
                '!<%%= yeoman.app %>/assets/js/plugins/*',
                '!<%%= yeoman.dist %>/assets/js/{,*/}*.js'
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

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/sass',
                cssDir: '<%%= yeoman.dist %>/assets/css',
                generatedImagesDir: '<%%= yeoman.tmp %>/assets/img/generated',
                imagesDir: '<%%= yeoman.app %>/assets/img',
                javascriptsDir: '<%%= yeoman.app %>/assets/js',
                fontsDir: '<%%= yeoman.app %>/assets/fonts',
                importPath: 'bower_components',
                httpImagesPath: '/assets/img',
                httpGeneratedImagesPath: '/assets/img/generated',
                httpFontsPath: '/assets/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>/assets/css',
                    src: '{,*/}*.css',
                    dest: '<%%= yeoman.dist %>/assets/css'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img',
                    src: '{,*/}*.{gif,png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/assets/img'
                }]
            }
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

        // Uglifies script files
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
                    '<%%= yeoman.dist %>/assets/js/scripts.min.js': [
                        '<%%= yeoman.app %>/assets/js/plugins/*.js',
                        '<%%= yeoman.app %>/assets/js/main.js'
                    ]
                }
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/assets/js/vendor/modernizr-custom.js',
            files: [
                '<%%= yeoman.dist %>/assets/js/{,*/}*.js',
                '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
                '!Gruntfile.js',
                '!<%%= yeoman.app %>/*',
                '!<%%= yeoman.dist %>/assets/js/vendor/*'
            ],
            uglify: true
        },

        // Compress css files
        // csso: {
        //     compress: {
        //         files: {
        //             '<%%= yeoman.tmp %>/assets/css/app.css': ['<%%= yeoman.tmp %>/app.ai.css']
        //         }
        //     }
        // },

        // Renames files for browser caching purposes
        version: {
            options: {
                file: '<%%= yeoman.dist %>/lib/scripts.php',
                css: '<%%= yeoman.dist %>/assets/css/app.css',
                cssHandle: 'egzpo_main',
                js: '<%%= yeoman.dist %>/assets/js/scripts.min.js',
                jsHandle: 'egzpo_scripts',
                modernizr: '<%%= yeoman.dist %>/assets/js/vendor/modernizr-custom.js',
                jsModernizr: 'modernizr'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt,php,css}',
                        'assets/img/{,*/}*.{webp,ico}',
                        'assets/fonts/{,*/}*.*',
                        'lang/*',
                        'lib/*',
                        'templates/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%%= yeoman.tmp %>/',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        'assets/**/*',
                        'lib/*'
                    ]
                },
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

        // Generate reports about script files
        plato: {
            complexity: {
                options : {
                    jshint : grunt.file.readJSON('.jshintrc')
                },
                files: {
                    '<%%= yeoman.tmp %>/reports/js-complexity': [
                        '<%%= yeoman.app %>/assets/js/{,*/}*.js'
                    ]
                }
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: [
                'uglify',
                'compass',
                'modernizr',
                'svgmin',
                'imagemin'
            ]
        }
    });

    grunt.registerTask('build', [
        'clean',
        'concurrent',
        'autoprefixer',
        'copy',
        'version'
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
