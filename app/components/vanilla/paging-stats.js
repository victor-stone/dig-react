import { numericize } from '../../unicorns';

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
  constructor({offset,limit,total,length})
  {
    this.stats = numericize({ offset, limit, total, length });
  }

  get total() {
    return this.stats.total;
  }

  get _isValidOffset() {
    return (this.stats.offset > this.stats.total) === false;
  }

  get _printableOffset() {
    return Number(this.stats.offset) + 1;
  }

  get shouldShow() {
    return (this.showPrev || this.showNext) && this._isValidOffset;
  }

  get showPrev() {
    return this.stats.offset > 0;    
  }
  
  get showNext() {
    return  this.stats.offset + this.stats.limit < this.stats.total;
  }

  get prevValue() {
    var val = this.stats.offset - this.stats.limit;
    if(  val < 0 ) {
      val = 0;
    }
    return val;
  }

  get nextValue() {
    return this.stats.offset + this.stats.limit;
  }

  get lastValue() {
    const { offset, length, limit } = this.stats;
    return offset + ( length < limit ? length : limit);
  }

  get lastPage() {
    const { total, offset, limit } = this.stats;

    if( total - limit > offset ) { 
      return total - limit;
    }
    return false;
  }

  get showFirst() {
    return !!this.stats.offset;
  }

  get showLast() {
    return !!this.lastPage;
  }

  get printableOffset() {
    return commaize(this._printableOffset);
  }

  get printableLastValue() {
    return commaize(this.lastValue);
  }

  get printableTotal() {
    return commaize(this.stats.total);
  }
}

module.exports = function(props) {
  return new PagingStats(props);
};


