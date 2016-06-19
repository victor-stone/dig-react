import events        from '../models/events';

var SelectedTagsTracker = {

  getInitialState: function() {
    return { tags: this.props.store.tags };
  },

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

module.exports = SelectedTagsTracker;

