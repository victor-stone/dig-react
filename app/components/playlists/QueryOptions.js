import React     from 'react';

import InstrumentalOnlyFilter  from '../InstrumentalOnlyFilter';
import ArtistFilter            from '../ArtistFilter';
import TagFilter               from '../TagFilter';
import TagsExtra               from '../TagsExtra';
import { QueryParamTracker }   from '../../mixins';
import { TagString }           from '../../unicorns';
import { LicenseFilter,
         SortFilter,
         OptionsWrap }    from '../QueryOptions';

const TypeFilter = React.createClass({ 

  mixins: [QueryParamTracker],

  stateFromParams: function(queryParams) {
    return { reqtags: new TagString( queryParams.reqtags ).filter(/^(remix|sample|acappella)$/) };
  },

  performQuery: function() {
    var typetag = this.refs['typelist'].value;
    var tags    = new TagString(this.props.store.model.queryParams.reqtags)
                        .remove('remix,sample,acappella')
                        .add(typetag);
    this.props.store.refresh( { reqtags: tags.toString() } );
  },
  
  render: function() {
    return (
        <select ref="typelist" id="typelist" value={this.state.reqtags} onChange={this.performQuery} className="form-control" >
          <option value="remix">{"remixes"}</option>
          <option value="sample">{"samples"}</option>
          <option value="acappella">{"a cappellas"}</option>
        </select>
      );
  }

});


function PlaylistQueryOptions(props) {

    var store = props.store;

    return ( 
      <OptionsWrap>
        <li>
          <TypeFilter store={store} />
        </li>
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
          <TagsExtra store={store} />
        </li>
      </OptionsWrap>
    );
}

module.exports = PlaylistQueryOptions;

