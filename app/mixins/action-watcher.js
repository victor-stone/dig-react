import StoreEvents  from './store-events';
import { oassign,
         camelize } from '../unicorns';
import events       from '../models/events';

var ActionWatcher = oassign( {}, StoreEvents, {

  getDefaultProps: function() {
    return { storeEvents: [events.ACTION_START,events.ACTION_END] };
  },

  onActionStart(name) {
    this._doActionHandler(name,'start');
  },

  onActionEnd(name) {
    this._doActionHandler(name,'end');
  },

  _doActionHandler(name,stage) {
    if( this.props.watchActions.contains(name) ) {
      var handlerName = camelize(`on_${name}_${stage}`);
      this[handlerName] && this[handlerName]();
    }

  }
});

module.exports = ActionWatcher;

