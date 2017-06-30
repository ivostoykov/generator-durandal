/* global beforeEach, describe, it */
'use strict';
// https://github.com/yeoman/generator-generator/blob/master/__tests__/app.js
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('testing generator', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appname: 'test',
        appid: '123',
        author: 'Ivo',
        features: ['bootstrap', 'fontawesome', 'modernizr', 'less']
      })
      .withOptions({'skip-install': true});
  });

  it('creates files', function () {
    const expected = [
      // Add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'index.html',
      'app/viewmodels/shell.js',
      'app/viewmodels/home.js',
      'app/views/shell.html',
      'app/views/home.html',
      'css/app.less'
    ];
    assert.file(expected);
    assert.fileContent('app/views/shell.html', /<a class="navbar-brand" href="#">test<\/a>/);
  });

  it('create README', function () {
    assert.file(['README.md']);
    assert.fileContent('README.md', /# test/);
  });

  it('create main.js', function () {
    assert.file(['app/main.js']);
    assert.fileContent('app/main.js', /app\.title\s{0,}=\s{0,}"test";/);
    assert.fileContent('app/main.js', /'bootstrap':\s{0,}'\.\.\/bower_components\/bootstrap\/dist\/js\/bootstrap'/);
  });
});
