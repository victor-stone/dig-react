import React            from 'react';
import TagStore         from '../stores/tags';
import { TagString }    from '../unicorns';
import StemsList        from './StemsList';
import Paging           from './Paging'; 
import ZIPContentViewer from './ZIPContentViewer';

import { QueryParamTagsRotate } from '../mixins';

import { SelectedTagSection,
          StemsTagList        } from './StemsTags';


function makeRegexFromTags(tags) {
  var arr = TagString.toArray(tags);
  var str = '^(' + arr.join('|') + ')$';
  return new RegExp(str);
}

var StemsBrowser = React.createClass({

  mixins: [QueryParamTagsRotate],

  componentWillMount: function() {
    var store = this.props.store;
    if( !store.tags ) {
      store.tags = new TagStore();
    }
    this._sub(store.tags);
    this.setState({ store });
  },

  componentWillReceiveProps: function(props) {
    if( props.store !== this.state.store ) {
      this._unsub(this.state.store.tags);
      if( !props.store.tags ) {
        props.store.tags = new TagStore();
      }
      this._sub(props.store.tags);
      this.setState( { store: props.store } );
    }
  },

  componentWillUnmount: function() {
    this._unsub(this.store.tags);
  },

  _sub: function(tagstore) {
    tagstore.on('selectedTags', this.onSelectedTags );
  },
  _unsub: function(tagstore) {
    tagstore.removeListener('selectedTags',this.onSelectedTags);
  },

  queryParam: {
    name: 'tags',
    filter: /----/,
    clean: true,
  },
  
  onSelectedTags: function(tag) {
    this.queryParam.filter = this.previousTags ? makeRegexFromTags(this.previousTags) : /---/;
    this.setStateAndPerform( {tag} );
    this.previousTags = tag; // this allows removal next time around
    this.defaultTag = tag;   // this prevents a 'reset' from wiping us out
  },

  render() {

    var store    = this.state.store;
    var tagStore = store.tags;

    return (
      <div className="stems-browser">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
              <SelectedTagSection store={tagStore} playlist={store} />
          </div>
        </div>
        <div className="row">
          <div  className="col-md-3">
            <StemsTagList store={tagStore} />
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Paging store={store} ref="paging" disableBumping />
            <StemsList store={store} />   
          </div>
          <div className="col-md-2">
            <ZIPContentViewer store={store} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = StemsBrowser;

