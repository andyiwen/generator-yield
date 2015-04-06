'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  let config = {
    src: './app',
    dist: './dist'
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    clean: {
      build: ['<%= config.dist %>']
    },

    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'static/images/**', 'views/**', 'index.jade'
            ],
            dest: '<%= config.dist %>/'
          }
        ]
      }
    },

    favicons: {
      icons: {
        src: '<%= config.src %>/static/icon.png',
        dest: '<%= config.dist %>/static/favicons/'
      }
    },

    watch: {
      scripts: {
        files: [
          '<%= config.src %>/**/*.js', '<%= config.src %>/**/*.jsx'
        ],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['<%= config.src %>/static/styles/**/*.less'],
        tasks: ['less:watch'],
        options: {
          livereload: true,
          nospawn: true
        }
      },
      static: {
        files: [
          '<%= config.src %>/static/images/**/*',
          '<%= config.src %>/views/**/*.jade',
          '<%= config.src %>/views/index.jade',
        ],
        tasks: ['copy'],
        options: {
          livereload: true,
          nospawn: true
        }
      }
    },

    less: {
      watch: {
        options: {
          strictImports: true,
          strictUnits: true,
          sourceMap: true,
          sourceMapURL: 'app.css.map',
          sourceMapBasepath: './styles',
          sourceMapRootpath: '/'
        },
        paths: ['<%= config.src %>/static/styles'],
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
          new (require('less-plugin-clean-css'))({advanced: true})
        ],
        files: {
          '<%= config.dist %>/static/styles/app.css': '<%= config.src %>/static/styles/app.less'
        }
      },
      all: {
        options: {
          compress: true,
          strictImports: true,
          strictUnits: true,
          sourceMap: false
        },
        paths: ['<%= config.src %>/static/styles'],
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
          new (require('less-plugin-clean-css'))({advanced: true})
        ],
        files: {
          '<%= config.dist %>/static/styles/app.css': '<%= config.src %>/static/styles/app.less'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '<%= config.src %>/**/*.js']
    },

    browserify: {
      watch: {
        files: {
          '<%= config.dist %>/static/scripts/app.js': [
            '<%= config.src %>/static/scripts/app.jsx'
          ]
        },
        options: {
          watch: true,
          transform: [
            [{stage: 1}, 'babelify']
          ],
          browserifyOptions: {
            debug: true,
            sourceMap: true,
            extensions: ['.jsx']
          }
        }
      },
      build: {
        files: {
          '<%= config.dist %>/static/scripts/app.js': [
            '<%= config.src %>/static/scripts/app.jsx'
          ]
        },
        options: {
          transform: [
            [{stage: 1}, 'babelify'], [{global: true}, 'uglifyify']
          ],
          browserifyOptions: {
            debug: false,
            sourceMap: false,
            extensions: ['.jsx']
          }
        }
      }
    },

    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              '**/*.js', '!static/**'
            ],
            dest: '<%= config.dist %>',
            ext: '.js'
          }
        ]
      }
    }

  })

  grunt.registerTask('dev', 'Run dev env', function() {
    let open = require('open')
    open('http://0.0.0.0:3000', 'Google Chrome')
    grunt.task.run(['browserify:watch', 'watch'])
  })

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'copy',
    'favicons',
    'babel',
    'less:all',
    'browserify:build'
  ])

}
