import events        from '../models/events';

const SelectedTagsTracker = target => class extends target {
  constructor() {
    super(...arguments);
    this.state = { tags: this.props.store.tags };
    this.onSelectedTags = this.onSelectedTags.bind(this);
  }

  componentWillMount() {
    this.props.store.on( events.TAGS_SELECTED, this.onSelectedTags );
  }

  componentWillUnmount() {
    this.props.store.removeListener( events.TAGS_SELECTED, this.onSelectedTags );
  }

  componentWillReceiveProps( props ) {
    if( this.props.store !== props.store ) {
      if( this.props.store ) {
        this.props.store.removeListener( events.TAGS_SELECTED, this.onSelectedTags );
      }
      props.store.on( events.TAGS_SELECTED, this.onSelectedTags );
      if( this.props.store.tags.hash !== props.store.tags.hash ) {
        this.setState( {tags: props.store.tags } );
      }
    }
  }

  onSelectedTags() {
    this.setState( { tags: this.props.store.tags } );
  }  
};

module.exports = SelectedTagsTracker;

