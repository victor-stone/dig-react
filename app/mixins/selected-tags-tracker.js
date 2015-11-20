


var SelectedTagsTracker = {

  getInitialState: function() {
    return this.tagsFromStore(this.props.store);
  },

  componentWillMount: function() {
    this._subSelectedTags(this.props.store);
  },

  componentWillUnmount: function() {
    this._unsubSelectedTags();
  },

  componentWillReceiveProps: function(newProps) {
    if( this.props.store !== newProps.store ) {
      this.setState( this.tagsFromStore(newProps.store) );
      this._unsubSelectedTags();
      this._subSelectedTags(newProps.store);
    }
  },

  tagsFromStore: function(store) {
    return { selectedTags: store.getSelectedTags(this.props.catID) };
  },

  onSelectedTags: function(tagString, cat) {
    if( !this.props.catID || cat === this.props.catID ) {
      this.setState( { selectedTags: tagString } );
    }
  },

  _unsubSelectedTags: function() {
    var store = this.props.store;
    if( this.props.catID ) {
      store.removeListener('selectedCatTags', this.onSelectedTags );
    } else {
      store.removeListener('selectedTags', this.onSelectedTags );
    }
  },

  _subSelectedTags: function(store) {
    if( this.props.catID ) {
      store.on('selectedCatTags', this.onSelectedTags );
    } else {
      store.on('selectedTags', this.onSelectedTags );
    }
  },

};


module.exports = SelectedTagsTracker;

