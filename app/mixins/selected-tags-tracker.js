import events        from '../models/events';

const _methods = {
  componentWillMount: function() {
    this.props.store.on( events.TAGS_SELECTED, this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.TAGS_SELECTED, this.onSelectedTags );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.TAGS_SELECTED, this.onSelectedTags );
      }
      props.store.on( events.TAGS_SELECTED, this.onSelectedTags );
      if( this.props.store.tags.hash !== props.store.tags.hash ) {
        this.setState( {tags: props.store.tags } );
      }
    }
  },

  onSelectedTags() {
    this.setState( { tags: this.props.store.tags } );
  }  
};

const SelectedTagsTracker = Object.assign({

  getInitialState: function() {
    return { tags: this.props.store.tags };
  }
},_methods);

const _classMixin = target => class extends target {
  constructor() {
    super(...arguments);
    this.state = { tags: this.props.store.tags };
    this.onSelectedTags = this.onSelectedTags.bind(this);
  }

  componentWillMount() {
   _methods.componentWillMount.call(this);
  }

  componentWillUnmount() {
   _methods.componentWillUnmount.call(this);
  }

  componentWillReceiveProps( props ) {
   _methods.componentWillReceiveProps.call(this,props);
  }

  onSelectedTags() {
    _methods.onSelectedTags.call(this);
  }

};

SelectedTagsTracker.stt = _classMixin;

module.exports = SelectedTagsTracker;

