
var SelectedTagsTracker = {

  getInitialState: function() {
    this._tagStore = this.props.store.tags || this.props.store;
    return this.tagsFromStore(this._tagStore);
  },

  componentWillMount: function() {
    this._subSelectedTags(this._tagStore);
  },

  componentWillUnmount: function() {
    this._unsubSelectedTags();
  },

  componentWillReceiveProps: function(newProps) {
    var newStore = newProps.store.tags || newProps.store;
    if( this._tagStore !== newStore ) {
      this._tagStore = newProps;
      this.setState( this.tagsFromStore(newStore) );
      this._unsubSelectedTags();
      this._subSelectedTags(newStore);
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
    var store = this._tagStore;
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

