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

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            tmp: '.tmp',
            ip: '127.0.0.1'
        },

        pkg: grunt.file.readJSON('package.json'),

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            compass: {
                files: ['<%%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:dist', 'autoprefixer:dist']
            },
            js: {
                files: ['<%%= jshint.all %>'],
                tasks: ['uglify:dist', 'newer:jshint']
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

        // Synchronize all connected browsers
        'browser_sync': {
            files: {
                src : [
                    '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
                    '<%%= yeoman.dist %>/assets/js/{,*/}*.js'
                ]
            },
            options: {
                host : '<%%= yeoman.ip %>',
                watchTask: true,
                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        },

        // Conditionnally load livereload and browserSync scripts. Configure ports if needed
        'string-replace': {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/base.php': '<%%= yeoman.app %>/base.php'
                },
                options: {
                    replacements: [{
                        pattern: '<!-- browserSync -->',
                        replacement: '<script src="http://<%%= yeoman.ip %>:35729/livereload.js"></script><script src="http://<%%= yeoman.ip %>:3000/socket.io/socket.io.js"></script><script src="http://<%%= yeoman.ip %>:3001/browser-sync-client.min.js"></script>'
                    }]
                }
            },
            prod: {
                files: {
                  '<%%= yeoman.dist %>/base.php': '<%%= yeoman.app %>/base.php'
                },
                options: {
                    replacements: [{
                        pattern: '<!-- browserSync -->',
                        replacement: ''
                    }]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.tmp %>/**/*',
                        '<%%= yeoman.dist %>/**'<% if (includePlato) { %>,
                        '!<%%= yeoman.tmp %>/reports/**'<% } %>
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
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
                src: ['<%%= yeoman.dist %>/assets/css/{,*/}*.css']
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/sass',
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
                    cssDir: '<%%= yeoman.dist %>/assets/css',
                    outputStyle: 'nested',
                    debugInfo: true
                }
            },
            prod: {
                options: {
                    cssDir: '<%%= yeoman.tmp %>/assets/css',
                    outputStyle: 'compressed',
                    debugInfo: false
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
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.tmp %>/assets/css',
                    src: '{,*/}*.css',
                    dest: '<%%= yeoman.tmp %>/assets/css'
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
                banner: '/*! <%= _.slugify(themeName) %> <%%= grunt.template.today("dd-mm-yyyy") %> */\n'
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
            },
            prod: {
                options: {
                    sourceMap: '',
                    sourceMappingURL: ''
                },
                files: {
                    '<%%= yeoman.dist %>/assets/js/scripts.min.js': [
                        '<%%= yeoman.app %>/assets/js/plugins/*.js',
                        '<%%= yeoman.app %>/assets/js/main.js'
                    ]
                }
            }
        },
<% if (includeModernizr) { %>
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
        },<% } %>

        // Compress css files
        csso: {
            compress: {
                files: {
                    '<%%= yeoman.dist %>/assets/css/app.css': ['<%%= yeoman.tmp %>/assets/css/app.css']
                }
            }
        },

        // Renames files for browser caching purposes
        version: {
            assets: {
                options: {
                    rename: true
                },
                src: [
                    '<%%= yeoman.dist %>/assets/css/app.css',
                    '<%%= yeoman.dist %>/assets/js/scripts.min.js'<% if (includeModernizr) { %>,
                    '<%%= yeoman.dist %>/assets/js/vendor/modernizr-custom.js'<% } %>
                ],
                dest: '<%%= yeoman.dist %>/lib/scripts.php'
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
<% if (includePlato) { %>
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
        },<% } %>

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: [
                'uglify:dist',
                'compass:dist',<% if (includeModernizr) { %>
                'modernizr',<% } %>
                'svgmin',
                'imagemin'
            ],
            prod: [
                'uglify:prod',
                'compass:prod',<% if (includeModernizr) { %>
                'modernizr',<% } %>
                'svgmin',
                'imagemin'
            ]
        }
    });

    grunt.registerTask('default', [
        'clean',
        'concurrent:dist',
        'autoprefixer:dist',
        'copy',
        'string-replace:dist'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'concurrent:prod',
        'autoprefixer:prod',
        'csso',
        'copy',
        'version',
        'string-replace:prod'
    ]);

    grunt.registerTask('report', [
        'newer:jshint',
        'default',
        'csslint'<% if (includePlato) { %>,
        'plato'<% } %>
    ]);

    grunt.registerTask('sync', [
        'browser_sync',
        'watch'
    ]);

    grunt.registerTask('travis', [
        'jshint',
        'csslint'
    ]);
};
