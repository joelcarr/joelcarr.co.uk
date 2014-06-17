module.exports = function(grunt) {

    grunt.initConfig({
        // read in the project settings from package.json into pkg propert. This allows us to refer
        // to the values of properties within our package.json
        pkg: grunt.file.readJSON("package.json"),

        // the configuration object for a task lives as a property on the configuration object,
        // that"s named the same as the task - so "watch" task goes in our config object under the "watch" key

        // watch task detects changes to files and runs specified tasks
        watch: {
            css: {
                files: "assets/scss/**/*.scss",
                tasks: ["sass"],
                options: {
                    livereload: true
                }
            },
            images: {
                files: "assets/imgs_src/**/*.{png,jpg,gif}",
                tasks: ["imagemin"]
            },
            scripts: {
                files: "assets/js/*.js",
                tasks: ["jshint"],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    "assets/css/*.css",
                    "assets/js/*/**.js"
                ]
            }
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
                jshintrc: ".jshintrc"
            },
            files: {
                src: ["Gruntfile.js", "assets/js/**/*.js", "!assets/js/libs/*.js"]

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

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask("default", [
        "watch"
    ]);

};