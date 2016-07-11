import events from '../models/events';
import StoreEvents from './store-events';
/*
  If you want to know when params change implement:
    stateFromParams(queryParams)

  if you implement a param with a default implement
    onGetParamsDefault()

  if you imlement a param that gets dirty implement
    onAreParamsDirty()

*/
const QueryParamTracker = target => class extends StoreEvents(target) {
  constructor() {
    super(...arguments);
    if( this.stateFromParams ) {
      this.state = this.stateFromParams(this.props.store.queryParams);
    }
  }

  get storeEvents() {
    const arr = [];
    this.stateFromParams && arr.push(events.PARAMS_CHANGED);
    this.onGetParamsDefault && arr.push(events.GET_PARAMS_DEFAULT);
    this.onAreParamsDirty && arr.push(events.ARE_PARAMS_DIRTY);
    return arr;
  }

  onParamsChanged(queryParams) {
    this.setState( this.stateFromParams(queryParams) );
  }

  refresh(opts) {
    this.props.store.refresh(opts);
  }

  refreshModel(opts) {
    this.props.store.refreshModel(opts);
  }
  
};

module.exports = QueryParamTracker;

