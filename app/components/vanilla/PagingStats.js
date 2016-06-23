'use strict';


function commaize(value) {
  if( value === 0 || value === '0' ) {
      return '0';
  } else if( value ) {
      var regex = /([0-9]+)(([0-9]{3})($|,))/g;
      var str;
      var commaized = (value.string || value) + '';

      do {
          str = commaized;
          commaized = str.replace(regex,'$1,$2');
      } while( str !== commaized );

      return commaized;
  }
}
class PagingStats
{
  constructor(props)
  {
    /*
      props provide:
        offset
        limit
        total
        length
    */
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

    ['Prev','Next','First','Last'].forEach( k => {
      var y = 'show' + k;
      this.stats[y] = this.stats[y] && this.stats.shouldShow;
    });
  }

  _isValidOffset() {
    return (this.stats.offset > this.stats.total) === false;
  }

  shouldShow() {
    var show = this.stats.showPrev || this.stats.showNext;
    return show && this._isValidOffset();
  }

  _printableOffset() {
    return Number(this.stats.offset) + 1;
  }

  showPrev() {
    return this.stats.offset > 0;    
  }
  
  showNext() {
    return  this.stats.offset + this.stats.limit < this.stats.total;
  }

  prevValue() {
    var val = this.stats.offset - this.stats.limit;
    if(  val < 0 ) {
      val = 0;
    }
    return val;
  }

  nextValue() {
    return this.stats.offset + this.stats.limit;
  }

  lastValue() {
    var off   = this.stats.offset;
    var count = this.stats.length;
    var limit = this.stats.limit;
    return off + ( count < limit ? count : limit);
  }

  lastPage() {
    var total = this.stats.total;
    var off   = this.stats.offset;
    var limit = this.stats.limit;
    if( total - limit > off ) { 
      return total - limit;
    }
    return false;
  }

  showFirst() {
    return !!this.stats.offset;
  }

  showLast() {
    return !!this.lastPage();
  }

  printableOffset() {
    return commaize(this._printableOffset());
  }

  printableLastValue() {
    return commaize(this.stats.lastValue);
  }

  printableTotal() {
    return commaize(this.stats.total);
  }
}

module.exports = function(props) {
  return new PagingStats(props).stats;
};


