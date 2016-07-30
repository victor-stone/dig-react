import TagToggle        from './lib/tag-toggle';
import { instrumental } from '../query-configs';

class InstrumentalOnly extends TagToggle
{
  constructor() {
    super( 'reqtags', false, instrumental.reqtags );
    this._displayName  = 'instrumental only';
  }
}

InstrumentalOnly.propertyName = 'instrumentalOnly';

module.exports = InstrumentalOnly;