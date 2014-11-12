module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          cwd: __dirname,
          ignore: ['README.md', 'node_modules', 'public', 'test'],
          ext: 'js',
          delay: 1000,
          legacyWatch: true
        }
      },
      exec: {
        options: {
          exec: 'jshint'
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
        files: ['public/**/*.js'],
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
          require: ['should', 'test/server/blanket'],
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
    },

    env : {
      dev : {
        NODE_ENV: 'development',
        PORT: 3000,
        ROOT_FOLDER: __dirname
      },
      test : {
        NODE_ENV: 'test',
        PORT: 3001,
        ROOT_FOLDER: __dirname
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'mocha', 'env:dev', 'concurrent']);
  grunt.registerTask('build', ['jshint', 'mochaTest']);
  grunt.registerTask('mocha', ['env:test', 'mochaTest']);

};
