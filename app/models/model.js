'use strict';

class Model {

  constructor(jsonData, bindParent) {

    for( var k in jsonData ) {
      this[k] = jsonData[k];
    }

    this._bindParent = bindParent;
  }

}

module.exports = Model;

