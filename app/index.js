let yeoman = require('yeoman-generator')
let chalk = require('chalk')
let yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json')
  },

  writing: {
    app: function() {
      this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'))
      this.mkdir('docs')
      this.mkdir('app/middleware')
      this.mkdir('app/routes')
      this.mkdir('app/static')
      this.mkdir('app/views')
    },

    projectfiles: function() {
      this.fs.copy(this.templatePath('env'), this.destinationPath('.env'))
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'))
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
      this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'))
      this.fs.copy(this.templatePath('nodemon.json'), this.destinationPath('nodemon.json'))
      this.fs.copy(this.templatePath('nvmrc'), this.destinationPath('.nvmrc'))
    }
  },

  install: function() {
    this.installDependencies()
  }
})
