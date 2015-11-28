import events from '../models/events';

var SelectedTagsTracker = {

  getInitialState: function() {
    return { selectedTags: this.props.store.tags.getSelectedTags() };
  },

  componentWillMount: function() {
    this.props.store.tags.on( events.TAGS_CHANGED, this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.tags.removeListener( events.TAGS_CHANGED, this.onSelectedTags );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.tags.removeListener( events.TAGS_CHANGED, this.onSelectedTags );
      }
      props.store.tags.on( events.TAGS_CHANGED, this.onSelectedTags );
    }
  },

  onSelectedTags: function(tagString, cat) {
    if( !this.props.catID || cat === this.props.catID ) {
      this.setState( { selectedTags: tagString } );
    }
  },

};


module.exports = SelectedTagsTracker;

