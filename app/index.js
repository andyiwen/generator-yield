'use strict'

let yeoman = require('yeoman-generator')
let chalk = require('chalk')
let yosay = require('yosay')
let mkdir = require('mkdirp')

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json')
  },

  writing: {
    app: function() {
      this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'))
      this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'))

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
    },

    projectfiles: function() {
      this.fs.copy(this.templatePath('env'), this.destinationPath('.env'))
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'))
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
      this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'))
      this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'))
      this.fs.copy(this.templatePath('nodemon.json'), this.destinationPath('nodemon.json'))
      this.fs.copy(this.templatePath('nvmrc'), this.destinationPath('.nvmrc'))
    }
  },

  install: function() {
    this.npmInstall()
  }
})
