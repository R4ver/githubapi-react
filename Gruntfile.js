/*global module:false*/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        react: {
            single_file_output: {
                files: {
                  'build/js/app.js': 'src/jsx/app.jsx'
                }
            }
        },

        sass: {
            dist: {
                files: {
                  'build/css/style.css' : 'src/sass/master.sass'
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'build/js/bundle.js': 'build/js/app.js'
                }
            }
        },

        watch: {
            react: {
                files: 'src/**/*.jsx',
                tasks: ['react']
            },

            css: {
                files: 'src/**/*.sass',
                tasks: ['sass']
            },

            browserify: {
                files: 'build/js/app.js',
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ["react", "sass", "browserify"]);
};