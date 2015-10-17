'use strict';

const Class = require('./app/unicorns/class');


var Model = Class.extend({
  init: function(actualData) {

    for( var p in actualData ) {
      if( actualData.hasOwnProperty(p) ) {
        this[p] = actualData[p];      
      }
    }

    for( var k in this ) {
      // 'id' becomes an alias for 'upload_id'
      // idBinding: 'upload_id'
      //     becomes
      // id: 4994
      var boundName = k.match(/^(.*)Binding$/);
      if( boundName !== null ) {
        this[boundName[1]] = actualData[ this[k] ];
      } else {
        // 'getfullName' is calculated property and
        // cached here as 'fullName'
        //
        //     given
        // first_name: 'Snide',
        // last_name: 'Grass',
        // getfullName: function() { return this.first_name + ' ' + this.last_name; }
        //     becomes
        // fullName: "Snide Grass"
        //
        var propName = k.match(/^get(.*)$/);
        if( propName !== null ) {
          this[propName[1]] = this[k]();
        }
      }
    }
  },

});

var UpdloadBasic = Model.extend({

  idBinding: 'upload_id',
  getfullName: function() { return this.first_name + ' ' + this.last_name; }
})

var m = new UpdloadBasic({
  upload_id: 12345,
  last_name: 'Grass',
  first_name: 'Dudely',
})

p( m.fullName + ' (' + m.id + ') ');

function p() {
  console.log.apply(console.log,arguments);
}