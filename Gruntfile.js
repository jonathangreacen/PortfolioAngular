module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      script:{
        src:['src/app/app.js', 'src/**/*.js'],
        dest:'dist/js/build.js',
        options:{
          separator:';'
        }
      },
      scss:{
        src:['src/sass/*.scss', 'src/**/*.scss'],
        dest:'dist/css/build.scss'
      },
      templates:{
        src:['src/**/*.tpl.html'],
        dest:'dist/tpl/templates.tpl.html'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/build.css' : 'dist/css/build.scss' 
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/build.min.js': ['dist/js/build.js']
        }
      },
      options:{
        mangle:false,
        compress:false
      }
    },

    includes: { 
      build: {
        cwd: 'src',
        src: [ 'index.html'],
        dest: 'dist',
        options: {
          flatten: true,
          includePath:'dist/tpl'
        }
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
      },
      html:{
        files: 'src/**/*.html',
        tasks: ['includes']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat', 'sass', 'uglify', 'includes', 'watch']);

};