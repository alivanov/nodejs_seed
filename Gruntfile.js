module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: '3000'
          },
          cwd: __dirname
        }
      }
    },

    watch: {
      jade: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/**/*.js', 'app/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/assets/css/**'],
        options: {
          livereload: true
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    jshint: {
      server: {
        files: {
          src: ['config/**/*.js', 'app/**/*.js', 'server.js']
        },
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: ['should', 'test/server/config', 'test/server/blanket'],
          timeout: 5000
        },
        src: ['test/server/spec/**/*.spec.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'test/server/coverage/server-side-coverage.html'
        },
        src: ['test/server/spec/**/*.spec.js']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'concurrent']);
  grunt.registerTask('build', ['jshint', 'mochaTest']);
  grunt.registerTask('mocha', ['mochaTest']);

};
