'use strict';

import { commaize } from '../unicorns';

function PagingStats(props) {

  this.stats = {
      showPrev: false,
      showNext: true,
      prevValue: 0,
      nextValue: 0,
      lastValue: 0,
      lastPage: 0,
      showFirst: false,
      showLast: false,
      shouldShow: true,
      printableOffset: '',
      printableLastValue: '',
      printableTotal: ''
    };

  var keys = Object.keys(this.stats);

  for( var p in props ) {
    this.stats[p] = Number(props[p]);
  }

  keys.forEach( k => this.stats[k] = this[k]() );

}

PagingStats.prototype._isValidOffset = function() {
  return (this.stats.offset > this.stats.total) === false;
},

PagingStats.prototype.shouldShow = function() {
  var show = this.stats.showPrev || this.stats.showNext;
  return show && this._isValidOffset();
},

PagingStats.prototype._printableOffset = function() {
  return Number(this.stats.offset) + 1;
},

PagingStats.prototype.showPrev = function() {
  return this.stats.offset > 0;    
},
  
PagingStats.prototype.showNext = function() {
  return  this.stats.offset + this.stats.limit < this.stats.total;
},

PagingStats.prototype.prevValue = function() {
  var val = this.stats.offset - this.stats.limit;
  if(  val < 0 ) {
    val = 0;
  }
  return val;
},

PagingStats.prototype.nextValue = function() {
  return this.stats.offset + this.stats.limit;
},

PagingStats.prototype.lastValue = function() {
  var off   = this.stats.offset;
  var count = this.stats.length;
  var limit = this.stats.limit;
  return off + ( count < limit ? count : limit);
},

PagingStats.prototype.lastPage = function() {
  var total = this.stats.total;
  var off   = this.stats.offset;
  var limit = this.stats.limit;
  if( total - limit > off ) { 
    return total - limit;
  }
  return false;
},

PagingStats.prototype.showFirst = function() {
  return !!this.stats.offset;
},

PagingStats.prototype.showLast = function() {
  return !!this.lastPage();
},

PagingStats.prototype.printableOffset = function() {
  return commaize(this._printableOffset());
},

PagingStats.prototype.printableLastValue = function() {
  return commaize(this.stats.lastValue);
},

PagingStats.prototype.printableTotal = function() {
  return commaize(this.stats.total);
},

module.exports = function(props) {
  return new PagingStats(props).stats;
};


