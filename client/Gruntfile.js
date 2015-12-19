/**
 * Created by dimon on 27.09.2015.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                options: {
                    banner: '$(function() {\n',
                    footer: '\n});',
                    separator: '\n'
                },
                src: ['views/**/*.js', 'core/core.js'],
                dest: 'index.js'
            },
            html: {
                src: ['devIndex.html', 'templates/htmls/**/*.html'],
                dest: 'index.html'
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: {
                    'dist/index.js': ['index.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    src: ['index.css'],
                    dest: 'dist'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'index.css': 'templates/styles/**/*.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['templates/styles/**/*.scss'],
                tasks: ['precess_css']
            },
            html: {
                files: ['devIndex.html', 'templates/htmls/**/*.html'],
                tasks: ['precess_html']
            },
            js: {
                files: ['models/**/*.js', 'collections/**/*.js', 'views/**/*.js', 'core/**/*.js'],
                tasks: ['precess_js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('precess_js', ['newer:concat', 'uglify']);
    grunt.registerTask('precess_html', ['newer:concat', 'htmlmin']);
    grunt.registerTask('precess_css', ['newer:sass', 'cssmin']);

    grunt.registerTask('default', ['concat', 'sass', 'uglify', 'cssmin', 'htmlmin', 'watch']);
};