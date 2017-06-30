/* eslint linebreak-style: ["error", "windows"] */
/* global describe, it */
'use strict';

var path = require('path');
var assert = require('assert');

describe('durandal generator', function () {
  it('load application', function () {
    var app = require(path.join(__dirname, '../generators/app'));
    assert(app !== undefined);
  });
});
