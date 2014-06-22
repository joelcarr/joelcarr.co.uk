'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * How to use jekyll and livereload:
         * http://kctang.github.io/jekyll/livereload/2014/01/25/github-pages-with-jekyll-and-livereload.html/
         */

        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '_site'
                }
            }
        },

        watch: {
            livereload: {
                files: [
                    '_config.yml',
                    'index.html',
                    '_layouts/**',
                    '_posts/**',
                    '_includes/**',
                    'assets/css/**',
                    'assets/imgs/**',
                    'assets/js/**'
                ],
                tasks: ['shell:jekyllBuild'],
                options: {
                    livereload: true
                },
            },
            scss: {
                files: 'assets/scss/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: false
                }
            },
            images: {
                files: 'assets/imgs_src/**/*.{png,jpg,gif}',
                tasks: ['imagemin']
            },
            scripts: {
                files: 'assets/js/**/*.js',
                tasks: ['jshint'],
            },
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/main.css': 'assets/scss/main.scss'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: ['Gruntfile.js', 'assets/js/**/*.js', '!assets/js/libs/*.js', '!assets/js/require.js', '!assets/js/require-min.js']

            }
        },

        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'assets/imgs_src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/imgs/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', [
        'shell',
        'connect',
        'watch'
    ]);
};