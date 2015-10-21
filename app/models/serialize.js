'use strict';

function pathValue(obj, propName) {
  var names = propName.split('.');
  var value = obj[names[0]];
  for( var i = 1; i < names.length; i++ ) {
    value = value[names[i]];
  }
  return value;
}

function _serialize(jsonData,model,bindParent) {

  if( Array.isArray(jsonData) ) {
    return jsonData.map( j => _serialize(j,model,bindParent) );
  }
  model = new model(jsonData,bindParent);
  var target = {};
  
  for( var k in model ) {

    var boundName = k.match(/^(.*)Binding$/);

    if( boundName !== null ) {
      boundName = boundName[1];
      if( !target[boundName] ) {
        target[boundName] = pathValue( model, model[k] );
      }

    } else if( k == '_modelSubtree' ) {
    
      var subTree = model[k];

      for( var propName in subTree ) {

        target[propName] = _serialize( jsonData[propName] || {}, subTree[propName], jsonData );
      }

    } else if( k.match(/^set/) ) {

      target[k] = model[k];
      
    } else {

        var propName2 = k.match(/^get(.*)$/);

        if( propName2 !== null ) {
          var s = propName2[1];
          propName2 = s[0].toLowerCase() + s.substr(1);

          target[propName2] = model[k]();
        }
    }
  }
    
  return target;
}

/**
  serialize omnibus function can be called in two ways:
  
  serialize( modelClass)
  
    - this returns a function that takes a single argument 
      (perfect for .then() !) that will serialize the incoming
      result(s) in the model specified. If the incoming
      result is an array, each result will be serialized 
      in place.
      
  serialize( objectToSerialize, modelClass ) 
  
    - This will perform the serialization immediately
      on the first parameter. If that object is an
      array, it will serialize each item in place
      and return the array.
      
**/

function serialize(jsonDataOrModel,model) {
  if( typeof(model) === 'undefined' ) {
    return jsonData => _serialize(jsonData,jsonDataOrModel);
  }
  return _serialize(jsonDataOrModel,model);
}

module.exports = serialize;
