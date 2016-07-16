import { bindAll } from '../unicorns';

const DelayLoadModel = target => class extends target {

  constructor() {
    super(...arguments);
    if( 'state' in this ) {
      this.state.model = null;
    } else {
      this.state = { model: null };
    }
    this.hasComponentWillReceiveProps = !!super.componentWillReceiveProps;
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
    this.hasComponentWillReceiveProps && super.componentWillReceiveProps(props);
    if( this.state.open ) {
      this.refreshModel(props.store).then( model => this.setState( { model } ) ); 
    } else {
      this.setState( { model: null } );
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.model !== nextState.model || 
          this.state.open !== nextState.open || 
          this.speakNow && this.speakNow(nextProps,nextState);
  }

};

module.exports = DelayLoadModel;
