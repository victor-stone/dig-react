import events      from 'models/events';
import StoreEvents from './store-events';
import { safeSetState } from 'unicorns';

/*
  
  Derivations note notification:

    stateFromStore(store) {
      return { someStateDerivedFromStore: ... }
    }

  This will come BEFORE your constructor 
*/

const ModelTracker = target => class extends StoreEvents(target) {
  constructor() {
    super(...arguments);
    safeSetState(this, this._stateFromStore(this.props.store));
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

