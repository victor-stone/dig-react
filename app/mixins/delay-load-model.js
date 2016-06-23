var DelayLoadModel = {

  getDefaulProps() {
    return { onOpen: this.onOpen, onClose: this.onClose };
  },

  onOpen() {
    if( !this.state.model ) {
      this.refreshModel().then( model => this.setState( { model, open: true } ) ); 
    } else {
      this.setState( { open: true } );
    }
  },

  onClose() {
    this.setState({open:false});
  },

  getInitialState() {
    return { model: null };
  },

  componentWillReceiveProps(props) {
    if( this.state.open ) {
      this.refreshModel(props.store).then( model => this.setState( { model } ) ); 
    } else {
      this.setState({ model: null });
    }
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.model !== nextState.model || this.state.open !== nextState.open || this.speakNow && this.speakNow(nextProps,nextState);
  },

};

module.exports = DelayLoadModel;