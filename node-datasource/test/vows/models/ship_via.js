/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XM:true, XV:true, module:true, require:true, assert: true */

var XVOWS = XVOWS || {};
(function () {
  "use strict";

  var vows = require("vows"),
    assert = require("assert"),
    zombieAuth = require("../lib/zombie_auth"),
    crud = require('../lib/crud');

  var data = {};

  data.createHash = {
    code: "TESTSHIPVIA",
    description: "Test Ship Via"
  };

  data.updateHash = {
    code: "UPDATETESTSHIPVIA"
  };

  vows.describe('XM.ShipVia CRUD test').addBatch({
    'INITIALIZE ': {
      topic: function () {
        var that = this,
          callback = function () {
            data.model = new XM.ShipVia();
            that.callback(null, data);
          };
        zombieAuth.loadApp(callback);
      },
      'The record type is XM.ShipVia': function (data) {
        assert.equal(data.model.recordType, "XM.ShipVia");
      }
    }
  }).addBatch({
    'CREATE ': crud.create(data, {
      '-> Set values': {
        topic: function (data) {
          data.model.set(data.createHash);
          return data;
        },
        'Last Error is null': function (data) {
          assert.isNull(data.model.lastError);
        },
        '-> Save': crud.save(data)
      }
    })
  }).addBatch({
    'READ': {
      topic: function () {
        return data;
      },
      'ID is a number': function (data) {
        assert.isNumber(data.model.id);
      },
      'Code is `TESTSHIPVIA`': function (data) {
        assert.equal(data.model.get('code'), data.createHash.code);
      },
      'Description is `Test Ship Via`': function (data) {
        assert.equal(data.model.get('description'), data.createHash.description);
      }
    }
  }).addBatch({
    'UPDATE ': crud.update(data, {
      '-> Set values': {
        topic: function () {
          data.model.set(data.updateHash);
          return data;
        },
        'Code is `UPDATETESTSHIPVIA`': function (data) {
          assert.equal(data.model.get('code'), data.updateHash.code);
        },
        '-> Commit': crud.save(data)
      }
    })
  }).addBatch({
    'DESTROY': crud.destroy(data)
  }).export(module);
  
}());
