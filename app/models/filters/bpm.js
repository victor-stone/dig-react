import TagSwap from './tag-swap';

const TAG_FILTER     = /^bpm_([0-9]{3})_([0-9]{3})$/;
const ONE_HUNDRED    = 100;
const BPM_TAG_RANGE  = 5;
const MIN_BPM        = 60;
const DEFAULT_VALUE  = '';

const valueFromTag = tag => Number(tag.replace(TAG_FILTER, '$1'));

const pad0 = v => v < ONE_HUNDRED 
                     ? '0' + v 
                     : '' + v;

const tagFromValue = val => Number(val) >= MIN_BPM 
                              ? `bpm_${pad0(Number(val))}_${pad0(Number(val)+BPM_TAG_RANGE)}` 
                              : DEFAULT_VALUE;

class BPM extends TagSwap 
{
  constructor() {
    super('reqtags',TAG_FILTER,DEFAULT_VALUE);
    this._propName     = BPM.filterName;
    this._displayName  = 'BPM';
  }

  get value() {
    return valueFromTag(this._value);
  }

  set value(val) {
    super.value = tagFromValue(val);
  }
}

Object.assign(BPM,{

  filterName: 'bpm',

  fromQueryParams(qp) {
    const filter = new BPM();
    filter.aquireFromQueryParams(qp);
    filter._defaultValue = filter._value;
    return filter;
  }
});

module.exports = BPM;