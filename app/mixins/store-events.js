import { camelize } from '../unicorns';
/*
  Implementors must implement 

    on<EventName>(...) { }

  name and arguments depends on event.

  Event name(s) can be setup in 

    getDefaultProps: function() {
      return { storeEvent: 'selectedTags' };
    }

    onSelectedTags: function() {}

  OR: 

    getDefaultProps: function() {
      return { storeEvents: ['foo', 'bar'] }; // <-- note the storeEvent(s)
    }

    onFoo: function() {}

    onBar: function() {}
  

*/
var StoreEvents = {

  componentWillMount: function() {
    this._storeEventHandlers = {};
    this._getStoreEvents().forEach( event => {
      var handlerName = 'on' + camelize(event);
      this._storeEventHandlers[event] = this[handlerName];
    });
    this._subscribeToStoreEvents(this.props.store);
  },

  componentWillUnmount: function() {
    this._unsubscribeFromStoreEvents(this.props.store);
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this._unsubscribeFromStoreEvents(this.props.store);
      }
      this._subscribeToStoreEvents(props.store);
    }
  },

  _subscribeToStoreEvents: function(store) {
    this._getStoreEvents().forEach( event => store.on(event,this._storeEventHandlers[event]));
  },

  _unsubscribeFromStoreEvents: function(store) {
    this._getStoreEvents().forEach( event => store.removeListener(event,this._storeEventHandlers[event]) );
  },

  _getStoreEvents: function() {
    if( this.props.storeEvent ) {
      return [ this.props.storeEvent ];
    } else {
      return this.props.storeEvents;
    }
  },

};

module.exports = StoreEvents;