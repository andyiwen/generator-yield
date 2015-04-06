'use strict'

let yeoman = require('yeoman-generator')
let chalk = require('chalk')
let yosay = require('yosay')
let mkdir = require('mkdirp')
let context

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.log(yosay('ES6, React, Less, Babel, Browserify, Grunt'))
    this.pkg = require('../package.json')
  },

  prompting: function() {
    let done = this.async()
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        store: true
      }, {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: '0.0.1',
        store: true
      }, {
        type: 'input',
        name: 'port',
        message: 'Your development port',
        default: 3000,
        store: true
      }, {
        type: 'confirm',
        name: 'livereload',
        message: 'Use livereload',
        default: true,
        store: true
      }, {
        type: 'list',
        name: 'engine',
        message: 'Which Node.js/iojs version you wanna use?',
        choices: [
          'v0.10.36',
          'v0.11.14',
          'v0.12.0',
          'iojs-v1.5.0',
          'iojs-v1.6.2',
          'iojs-v1.6.3',
          'iojs-v1.6.4',
          'default',
          'node',
          'iojs',
          'stable',
          'unstable'
        ],
        default: 'iojs-v1.6.4',
        store: true
      }
    ], function(answers) {
      context = answers
      done()
    }.bind(this))
  },

  configuring: {
    configurations: function() {
      this.log(chalk.yellow('Setup configurations'))
      this.template(this.templatePath('env'), this.destinationPath('.env'), context)
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'))
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
      this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'))
      this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'))
      this.fs.copy(this.templatePath('nodemon.json'), this.destinationPath('nodemon.json'))
      this.template(this.templatePath('nvmrc'), this.destinationPath('.nvmrc'), context)
    }
  },

  writing: {
    app: function() {
      this.log(chalk.yellow('Copy templates'))
      this.template(this.templatePath('_package.json'), this.destinationPath('package.json'), context)
      this.template(this.templatePath('README.md'), this.destinationPath('README.md'), context)

      mkdir(this.destinationPath('docs'))

      mkdir(this.destinationPath('app'))
      this.fs.copy(this.templatePath('app.js'), this.destinationPath('app/app.js'))
      this.fs.copy(this.templatePath('cluster.js'), this.destinationPath('app/cluster.js'))
      this.fs.copy(this.templatePath('config.js'), this.destinationPath('app/config.js'))

      mkdir(this.destinationPath('app/middleware'))
      this.fs.copy(this.templatePath('middleware/error.js'), this.destinationPath('app/middleware/error.js'))
      this.fs.copy(this.templatePath('middleware/index.js'), this.destinationPath('app/middleware/index.js'))

      mkdir(this.destinationPath('app/routes'))
      this.fs.copy(this.templatePath('routes/index.js'), this.destinationPath('app/routes/index.js'))

      mkdir(this.destinationPath('app/static'))
      this.fs.copy(this.templatePath('icon.png'), this.destinationPath('app/static/icon.png'))

      mkdir(this.destinationPath('app/static/images'))

      mkdir(this.destinationPath('app/static/scripts'))
      this.fs.copy(this.templatePath('scripts/app.jsx'), this.destinationPath('app/static/scripts/app.jsx'))
      this.fs.copy(this.templatePath('scripts/routes.jsx'), this.destinationPath('app/static/scripts/routes.jsx'))

      mkdir(this.destinationPath('app/static/scripts/actions'))

      mkdir(this.destinationPath('app/static/scripts/dispatcher'))
      this.fs.copy(this.templatePath('scripts/dispatcher/app.js'), this.destinationPath('app/static/scripts/dispatcher/app.js'))

      mkdir(this.destinationPath('app/static/scripts/stores'))

      mkdir(this.destinationPath('app/static/scripts/views'))
      this.fs.copy(this.templatePath('scripts/views/layouts/default.jsx'), this.destinationPath('app/static/scripts/views/layouts/default.jsx'))

      mkdir(this.destinationPath('app/static/styles'))
      this.fs.copy(this.templatePath('styles/app.less'), this.destinationPath('app/static/styles/app.less'))

      mkdir(this.destinationPath('app/static/styles/atoms'))
      mkdir(this.destinationPath('app/static/styles/molecules'))
      mkdir(this.destinationPath('app/static/styles/organisms'))
      mkdir(this.destinationPath('app/static/styles/templates'))
      mkdir(this.destinationPath('app/static/styles/utils'))
      this.fs.copy(this.templatePath('styles/utils/base.less'), this.destinationPath('app/static/styles/utils/base.less'))
      this.fs.copy(this.templatePath('styles/utils/vars.less'), this.destinationPath('app/static/styles/utils/vars.less'))

      mkdir(this.destinationPath('app/views'))
      this.fs.copy(this.templatePath('views/index.jade'), this.destinationPath('app/views/index.jade'))

      mkdir(this.destinationPath('app/views/includes'))
      this.fs.copy(this.templatePath('views/includes/head.jade'), this.destinationPath('app/views/includes/head.jade'))
      this.fs.copy(this.templatePath('views/includes/scripts.jade'), this.destinationPath('app/views/includes/scripts.jade'))

      mkdir(this.destinationPath('app/views/layouts'))
      this.fs.copy(this.templatePath('views/layouts/default.jade'), this.destinationPath('app/views/layouts/default.jade'))
    }
  },

  install: function() {
    this.log(chalk.yellow('Install dependencies'))
    this.npmInstall()
  },

  end: function() {
    this.log(chalk.green('Everything fine'))
  }
})
