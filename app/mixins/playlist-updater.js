
/*
  Implementors must implement 

    stateFromStore: function(store) {
      return { someStateDerivedFromStore: ... }
    }
*/
var PlaylistUpdater = {

  getInitialState: function() {
    return this.stateFromStore(this.props.store);
  },

  componentWillMount: function() {
    this.props.store.on('playlist',this.onPlaylistUpdate);
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('playlist',this.onPlaylistUpdate);
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener('playlist',this.onPlaylistUpdate);
      }
      props.store.on('playlist',this.onPlaylistUpdate);
      this.setState( this.stateFromStore(props.store) );
    }
  },

  onPlaylistUpdate: function() {
      this.setState( this.stateFromStore(this.props.store) );
  },

  storeSupportsOptions: function() {
    return typeof this.props.store.paramsDirty === 'function';
  }
};


module.exports = PlaylistUpdater;