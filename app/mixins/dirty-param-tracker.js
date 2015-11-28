import StoreEvents from './store-events';
import { oassign } from '../unicorns';
import events      from '../models/events';

var DirtyParamTracker = oassign( {}, StoreEvents, {

  getDefaultProps: function() {
    return { storeEvent: events.ARE_PARAMS_DIRTY };
  }
});

module.exports = DirtyParamTracker;

