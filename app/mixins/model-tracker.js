import events      from '../models/events';
import StoreEvents from './store-events';

/*
  Implementors must implement 

    stateFromStore(store) {
      return { someStateDerivedFromStore: ... }
    }
*/

const ModelTracker = target => class extends StoreEvents(target) {
  constructor() {
    super(...arguments);
    const myState = this._stateFromStore(this.props.store);
    if( this.state ) {
      Object.assign(this.state,myState);
    } else {
      this.state = myState;  
    }
  }

  get storeEvents() {
    return [events.MODEL_UPDATED];
  }

  componentWillReceiveProps( props ) {
    super.componentWillReceiveProps(props);
    if( this.props.store !== props.store ) {
      this.setState( this._stateFromStore(props.store) );
    }
  }

  onModelUpdated() {
    this.setState( this._stateFromStore(this.props.store) );
  }

  _stateFromStore(store) {
    return this.stateFromStore ? this.stateFromStore(store) : {store};
  }
};

module.exports = ModelTracker;

