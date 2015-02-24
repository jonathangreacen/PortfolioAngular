module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      script:{
        src:['src/app/app.js', 'src/**/*.js'],
        dest:'dist/build.js',
        options:{
          separator:';'
        }
      },
      scss:{
        src:['src/sass/*.scss', 'src/**/*.scss'],
        dest:'dist/build.scss'
      },
      templates:{
        src:['src/**/*.tpl.html'],
        dest:'dist/templates.tpl.html'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/build.css' : 'dist/build.scss' 
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

    includes: { 
      build: {
        cwd: 'src',
        src: [ 'index.html'],
        dest: '.',
        options: {
          flatten: true,
          includePath:'dist'
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