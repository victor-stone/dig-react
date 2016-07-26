import { bindAll,
         safeSetState } from '../unicorns';

const DelayLoadModel = target => class extends target {

  constructor() {
    super(...arguments);
    safeSetState( this, { model: null } );

    /*
      Checking 'super' seem to be insanely costly in 
      Babel. We curry the results here so we can
      just do a straight call.
    */

    const superCurry = meth => {
      let mySuperCall = super[meth];
      return mySuperCall 
                ? function() { mySuperCall.apply(this,arguments); }
                : () => false;
    };

    this.DLM_componentWillReceiveProps = superCurry('componentWillReceiveProps');
    this.DLM_shouldComponentUpdate = superCurry('shouldComponentUpdate');

    bindAll( this, 'onOpen', 'onClose' );
  }

  onOpen() {
    if( !this.state.model ) {
      this.refreshModel().then( model => this.setState( { model, open: true } ) ); 
    } else {
      this.setState( { open: true } );
    }
  }

  onClose() {
    this.setState( { open:false } );
  }

  componentWillReceiveProps(props) {
    this.DLM_componentWillReceiveProps(props);
    if( this.state.open ) {
      this.refreshModel(props.store).then( model => this.setState( { model } ) ); 
    } else {
      this.setState( { model: null } );
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.model !== nextState.model || 
           this.state.open !== nextState.open || 
           this.DLM_shouldComponentUpdate(...arguments);
  }

};

module.exports = DelayLoadModel;
