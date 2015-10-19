'use strict';

import Class from '../unicorns/class';

var Model = Class.extend({

  init: function(jsonData, bindParent) {

    for( var k in jsonData ) {
      this[k] = jsonData[k];
    }

    this._bindParent = bindParent;
  },

});

module.exports = Model;

