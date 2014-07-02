module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      script:{
        src:['src/**/*.js'],
        dest:'dist/build.js',
        options:{
          separator:';'
        }
      },
      scss:{
        src:['src/**/*.scss', '!src/build.scss'],
        dest:'src/build.scss'
      }     
    },
    sass: {
      dist: {
        files: {
          'dist/build.css' : 'src/build.scss' 
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      },
      options:{
        mangle:false,
        compress:false
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: 'src/**/*.scss',
        tasks: ['concat', 'sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat', 'sass', 'uglify', 'watch']);

};