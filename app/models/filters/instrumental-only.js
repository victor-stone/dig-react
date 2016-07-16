import TagToggle        from './tag-toggle';
import { instrumental } from '../query-configs';

class InstrumentalOnly extends TagToggle
{
  constructor() {
    super( 'reqtags', false, instrumental.reqtags );
    this._propName     = InstrumentalOnly.filterName;
    this._displayName  = 'Instrumental Only';
  }
}

Object.assign(InstrumentalOnly,{

  filterName: 'instrumentalOnly',
  
  fromQueryParams(qp) {
    const filter = new InstrumentalOnly();
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;    
  }

});

module.exports = InstrumentalOnly;