import QueryFilter  from '../query-filter';
import qc           from '../query-configs';

class Sort extends QueryFilter
{
  constructor() {
    super(...arguments);
    this._propName    = 'digrank';
    this._displayName = 'Sort';
    this._setsDefaultFromNative = true;
  }
}

Object.assign(Sort,{
  propertyName: 'digrank',
  
  options: {
      [qc.magicSort.digrank]: 'magic sort',
      [qc.recent.digrank   ]: 'recent    ',
      [qc.alltime.digrank  ]: 'all time  ',
      [qc.latest.digrank   ]: 'latest    ',
  }
});

module.exports = Sort;