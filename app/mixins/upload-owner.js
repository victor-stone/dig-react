import events             from '../models/events';
import api                from '../services/ccmixter';

var UploadOwner = {

  getInitialState() {
    var owner = { user: null, loading: !global.IS_SERVER_REQUEST, store: this.props.store };
    return { owner };
  },

  componentWillMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }

                 api.on( events.USER_LOGIN,    this.onOwnerLogin );
    this.props.store.on( events.MODEL_UPDATED, this.onOwnerModelUpdate );

    api.user.currentUser().then( this.onOwnerLogin );
  },

  componentWillUnmount() {
                 api.removeListener( events.USER_LOGIN,    this.onOwnerLogin );
    this.props.store.removeListener( events.MODEL_UPDATED, this.onOwnerModelUpdate );
  },

  componentWillReceiveProps( props ) {
    if( this.props.store !== props.store || this.props.store.model.upload.id !== props.store.model.upload.id ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.MODEL_UPDATED, this.onOwnerModelUpdate );
      }
      props.store.on( events.MODEL_UPDATED, this.onOwnerModelUpdate );
      this._setOwnerState( {store:props.store} );
    }
  },

  onOwnerModelUpdate() {
    this._setOwnerState({store:this.props.store} );
  },

  onOwnerLogin( userId ) {
    if( userId ) {
      api.user.currentUserProfile().then( user => {
        this._setOwnerState( {user, isAdmin: user.isAdmin, loading: false} );
      });
    } else {
      this._setOwnerState( { user: null, loading: false } );
    }
  },

  _setOwnerState( state ) {
    var owner = Object.assign( {}, this.state.owner, state );
    this.setState( {owner}, () => {
      var ownerId  = this.state.owner.user && this.state.owner.user.id;
      var uploadId = this.state.owner.store.model.upload.id;
      var artistId = this.state.owner.store.model.upload.artist.id;
      if( ownerId && uploadId ) {
        api.upload.permissions(uploadId,ownerId).then( results => {
          owner = Object.assign( {}, this.state.owner, results, {isOwner:ownerId===artistId} );
          this.setState( {owner} );
        });
      }
    });
  }
};

module.exports = UploadOwner;

//