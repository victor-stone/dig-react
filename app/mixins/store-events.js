
/*
  Implementors must implement 

    onStoreEvent(...) /

  arguments depends on event.

  Event name(s) can be setup in 

    getDefaultProps: function() {
      return { storeEvent: 'selectedTags' };
    }

  For multiple events (er, practical??) 

    getDefaultProps: function() {
      return { storeEvents: ['foo', 'bar'] };
    }

  N.B. onStoreEvent will be called without really knowing
       which event was invoke. (er, not practical )

*/
var StoreEvents = {

  componentWillMount: function() {
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
    this._getStoreEvents().forEach( event => store.on(event,this.onStoreEvent) );
  },

  _unsubscribeFromStoreEvents: function(store) {
    this._getStoreEvents().forEach( event => store.removeListener(event,this.onStoreEvent) );
  },

  _getStoreEvents: function() {
    if( this.props.storeEvent ) {
      return [ this.props.storeEvent ];
    } else {
      if( !this.props.storeEvents.isArray() ) {
        return [ this.props.storeEvents ];
      }
      return this.props.storeEvents;
    }
  },

};

module.exports = StoreEvents;