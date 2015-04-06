let path = require('path')
let assert = require('yeoman-generator').assert
let helpers = require('yeoman-generator').test

describe('generator yield:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app')).withOptions({skipInstall: true}).withPrompts({someOption: true}).on('end', done)
  })

  it('creates files', function() {
    assert.file([
      'bower.json', 'package.json', '.editorconfig', '.jshintrc'
    ])
  })
})
