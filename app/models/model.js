
/*
  See ./serialize
*/

class Model {

  constructor(jsonData, bindParent) {
    Object.assign(this,jsonData);
    this._bindParent = bindParent;
  }

}

module.exports = Model;

