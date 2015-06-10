module.exports = function (grunt) {

  // using jit-grunt instead of load-grunt-tasks
  // require('load-grunt-tasks')(grunt);
  require('jit-grunt')(grunt);

  var configs = {

    clean: {
      app: ["build/js/app*"],
      js: ["build/js/*", "!build/js/app*"],
      css: ["build/css"],
      tmp: [".tmp"]
    },

    concat : {
      options : {
        separator: "\n",
        banner: "(function($){",
        footer: "})(jQuery);",
        sourceMap :true,
        sourceMapName: '.tmp/app.js.map'
      },
      app: {
        src: [
           // base class and global options
          'app/js/app.js',

          // models, collections, and views in that order. dependencies, bro
          'app/js/models/*.js',
          'app/js/collections/*.js',
          'app/js/views/*.js',

          // add the master view last
          '!app/js/views/app.view.js',
          'app/js/views/app.view.js'
        ],
        dest: '.tmp/app.js'
      }
    },

    uglify : {
      app: {
        options : {
          sourceMap : true,
          sourceMapIncludeSources : true,
          sourceMapIn : '<%= concat.options.sourceMapName %>'
        },
        src  : '<%= concat.app.dest %>',
        dest : 'build/js/app.min.js'
      }
    },

    copy: {
      css: {
        expand: true,
        cwd: 'app/css',
        src: ['**/*'],
        dest: 'build/css'
      },
      js: {
        expand: true,
        cwd: 'app/js',
        src: ['*.js', '!app.js'],
        dest: 'build/js'
      },
    },

    watch: {
      app: {
        files: [
          'app/js/app.js',
          'app/js/models/**/*',
          'app/js/collections/**/*',
          'app/js/views/**/*'
        ],
        tasks: ['app'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['app/js/*.js', '!app/js/app.js'],
        tasks: ['custom_js'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['app/css/**/*.css'],
        tasks: ['custom_css']
      }
    }

  };
  grunt.initConfig(configs);

  grunt.registerTask("app", ['clean:app', 'concat:app', 'uglify:app', 'clean:tmp']);
  grunt.registerTask("custom_js", ['clean:js', 'copy:js']);
  grunt.registerTask("custom_css", ['clean:css', 'copy:css']);

  grunt.registerTask("default", ['app', 'custom_js', 'custom_css']);

};
