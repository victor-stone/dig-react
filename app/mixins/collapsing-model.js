var CollapsingModel = {

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

  componentWillReceiveProps(nextProps) {
    if( this.state.model && this.state.open ) {
        this.refreshModel(nextProps).then( model => this.setState({model}));
    } else {
      this.setState({ model: null });
    }
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.model !== nextState.model || this.state.open !== nextState.open || this.speakNow(nextProps,nextState);
  },

};

module.exports = CollapsingModel;