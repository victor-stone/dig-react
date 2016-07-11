import React     from 'react';

import InstrumentalOnlyFilter  from '../InstrumentalOnlyFilter';
import ArtistFilter            from '../ArtistFilter';
import { DualTagFieldWidget }   from '../bound/Tags';
import { QueryParamTracker }   from '../../mixins';
import { TagString }           from '../../unicorns';
import { LicenseFilter,
         SortFilter,
         OptionsWrap }    from '../QueryOptions';

class TypeFilter extends QueryParamTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.performQuery = this.performQuery.bind(this);
  }

  stateFromParams(queryParams) {
    return { reqtags: new TagString( queryParams.reqtags ).filter(/^(remix|sample|acappella)$/) };
  }

  performQuery() {
    const { store } = this.props;
    const { model:{queryParams:{reqtags}} } = store;

    var typetag = this.refs['typelist'].value;
    var tags    = new TagString(reqtags)
                        .remove('remix,sample,acappella')
                        .add(typetag);
    store.refresh( { reqtags: tags.toString() } );
  }
  
  render() {
    return (
        <select ref="typelist" id="typelist" value={this.state.reqtags} onChange={this.performQuery} className="form-control" >
          <option value="remix">{"remixes"}</option>
          <option value="sample">{"samples"}</option>
          <option value="acappella">{"a cappellas"}</option>
        </select>
      );
  }

}


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
          <DualTagFieldWidget store={store} />
        </li>
      </OptionsWrap>
    );
}

module.exports = PlaylistQueryOptions;

