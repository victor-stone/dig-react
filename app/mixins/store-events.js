import changeCase    from 'change-case';
import { quickLoop } from 'unicorns';

/*
  Event name(s) must be returned in 'storeEvents' property

    get storeEvents() {
      return [ events.SELECTED_TAGS, events.SOME_OTHER_EVENT ];
    }

  and handled thusly

    onSelectedTags() {
  
    }

    onSomeOtherEvent() {
  
    }

  N.B. Do NOT .bind(this) the handlers (that will happen in this mixin)

*/
var StoreEvents = target => class extends target {

  componentWillMount() {
    this._modelTrackMounted = true;
    super.componentWillMount && super.componentWillMount();
    this._subscribeToStoreEvents(this.props.store);
  }

  get storeEvents() {
    throw new Error('derived class from mixin must implement "storeEvents" property');
  }

  componentWillUnmount() {
    this._modelTrackMounted = false;
    super.componentWillUnmount && super.componentWillUnmount();
    this._unsubscribeFromStoreEvents(this.props.store);
  }

  componentWillReceiveProps( props ) {
    super.componentWillReceiveProps && super.componentWillReceiveProps(props);
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this._unsubscribeFromStoreEvents(this.props.store);
      }
      this._subscribeToStoreEvents(props.store);
    }
  }

  _subscribeToStoreEvents(store) {
    quickLoop( this.storeEvents, event => store.on( event, this._safeGenericCallback.bind(this,event) ) );
  }

  _unsubscribeFromStoreEvents(store) {
    quickLoop( this.storeEvents, event => store.removeListener( event, this._safeGenericCallback.bind(this,event) ) );
  }

  _safeGenericCallback(event,...args) {
    if( this._modelTrackMounted ) {
      const handler = 'on' + changeCase.pascalCase(event);
      this[handler].apply(this,args);
    }
  }

};

module.exports = StoreEvents;