import React            from 'react';
import Files            from './Files';
import { NoTagHits }    from '../Tags';
import { TagString }    from '../../unicorns';
import { ModelTracker } from '../../mixins';
import LinkToPeople     from '../services/LinkToPeopleRoute';
import Collapse         from '../vanilla/CollapseGroup';
import LinkToRemixTree  from '../services/LinkToRemixTree';

import InlineCSS           from '../vanilla/InlineCSS';
import {SelectableTagList} from '../models/tags';

/*
  Display bound stems browser

*/

class StemsListing extends ModelTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
  }

  stateFromStore(store) {
    const { queryParams:{searchp} } = store.model;
    return { model: store.model, searchTerms: searchp && new TagString(searchp.replace(/\s/g,','))  };
  }

  render() {
    const group = 'stems-list-parent';
    const { store, selectedTags, noHitsComp } = this.props;
    const { model, searchTerms } = this.state;

    if( !model || !model.total ) {
      return noHitsComp ? <noHitsComp store={store} /> : <h2>{"didn't catch that"}</h2>;
    }

    return (
      <div className="stems-listing-widget">
        <InlineCSS css={SelectableTagList.css} id="stem-listing-ex-css" />
        <ul className="stems-listing" id={group}>
          {model.items.map( (u,i) => <StemListingLine key={i} 
                                        model={u}
                                        selectedTags={selectedTags} 
                                        store={store} 
                                        group={group}
                                        searchTerms={searchTerms} 
                                     /> )}
        </ul>
      </div>
      );
    }
}

StemsListing.defaultProps = { noHitsComp: NoTagHits };

class StemsDetail extends React.Component
{
  render() {
    const { model, selectedTags } = this.props;
    const tags = new TagString(model.userTags);
    return (
      <div className="stems-detail">
        <SelectableTagList glyphs="checks" floating model={tags} selected={selectedTags} />
        <div className="clearfix"></div>
        <LinkToRemixTree model={model} />
      </div>
    );
  }
}

class StemListingLine extends React.Component
{
  render() {
    const { model, group, store, selectedTags, searchTerms } = this.props;
    const { bpm, artist, name, id } = model;
    return(
      <li className="panel">
          {bpm && <span className="bpm">{bpm}</span>}
          <Collapse.Toggle target={'stem-'+id} group={group} className="stem-name" text={name} />
          <LinkToPeople model={artist} className="stem-artist" />
          <Files 
            model={model} 
            store={store} 
            tags={selectedTags} 
            searchTerms={searchTerms} 
          />
          <div className="clearfix"></div>
          <Collapse.Target target={'stem-'+id}>
            <StemsDetail model={model} store={store} selectedTags={selectedTags} />
          </Collapse.Target>
      </li>
    );
  }
}


module.exports = StemsListing;
