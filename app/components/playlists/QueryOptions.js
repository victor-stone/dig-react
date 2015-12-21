import React     from 'react';

import InstrumentalOnlyFilter  from '../InstrumentalOnlyFilter';
import ArtistFilter            from '../ArtistFilter';
import TagFilter               from '../TagFilter';
import Glyph                   from '../Glyph';
import { TagString }           from '../../unicorns';
import { QueryParamTracker }   from '../../mixins';
import { LicenseFilter,
         SortFilter,
         OptionsWrap }    from '../QueryOptions';
     
var ExtraTags = React.createClass({

  mixins: [QueryParamTracker],

  getInitialState: function() {
    return { value: '' };
  },

  stateFromParams: function(queryParams) {
    if( this.state && this.state.value ) {
      var qptags = new TagString(queryParams.tags);
      return { value: qptags.intersection(this.state.value).toString() };
    }
    return {};
  },

  onSave: function() {
    var tags    = new TagString(this.state.value);
    var oldtags = this.state.value;
    this.setState( { value: tags.toString() }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.replace( oldtags, this.state.value);
      store.applyHardParams( { tags: qptags.toString() } );
    });
  },

  onClear: function() {
    var oldtags = this.state.value;
    this.setState( { value: '' }, () => {
      var store   = this.props.store;
      var qptags  = store.queryParams.tags.remove(oldtags);
      store.applyHardParams( { tags: qptags.toString() } );
    });
  },

  handleChange: function(event) {
    this.setState({value: event.target.value} );
  },

  render: function() {

    return (
      <div className="input-group input-group-sm">
        <input type="text" onChange={this.handleChange} value={this.state.value} className="form-control input-sm"  placeholder="extra tags..." />
        <span className="input-group-btn">
          <button type="button" onClick={this.onSave}  className="btn btn-default"><Glyph icon="check" /></button>
          <button type="button" onClick={this.onClear} className="btn btn-default"><Glyph icon="times" /></button>
        </span>
      </div>
      );
  }
});
    
function PlaylistQueryOptions(props) {

    var store = props.store;

    return ( 
      <OptionsWrap>
        <li>
          <LicenseFilter store={store} />
        </li>
        <li>
          <SortFilter store={store} />
        </li>
        <li>
          <InstrumentalOnlyFilter store={store} />
        </li>
        <li>
          <ArtistFilter store={store} />
        </li>
        <li>
          <TagFilter store={store} />
        </li>
        <li>
          <ExtraTags store={store} />
        </li>
      </OptionsWrap>
    );
}

module.exports = PlaylistQueryOptions;

