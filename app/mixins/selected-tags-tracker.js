import events        from '../models/events';
import { TagString } from '../unicorns';

var SelectedTagsTracker = {

  getInitialState: function() {
    return this._tagsFromParams( this.props.store.model.queryParams );
  },

  componentWillMount: function() {
    this.props.store.on( events.PARAMS_CHANGED, this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener( events.PARAMS_CHANGED, this.onSelectedTags );
  },

  componentWillReceiveProps: function( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.PARAMS_CHANGED, this.onSelectedTags );
      }
      props.store.on( events.PARAMS_CHANGED, this.onSelectedTags );
    }
  },

  onSelectedTags: function(queryParams) {
    this.setState( this._tagsFromParams(queryParams) );
  },

  _tagsFromParams: function(queryParams) {
    var qpTags = new TagString(queryParams.tags);
    if( !qpTags.isEmpty() && this.props.catID ) {
      return { selectedTags: this.filterTagsByCat(qpTags) };
    }
    return { selectedTags: qpTags };
  }
};


module.exports = SelectedTagsTracker;

