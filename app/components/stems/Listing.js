import React            from 'react';
import Files            from '../models/Files';
import { TagString }    from '../../unicorns';
import LinkToPeople     from '../services/LinkToPeopleRoute';
import Collapse         from '../vanilla/CollapseGroup';
import LinkToRemixTree  from '../services/LinkToRemixTree';

import InlineCSS           from '../vanilla/InlineCSS';
import {SelectableTagList} from '../models/tags';
import listingCSS          from './style/listing';

/*
  Display stems browser

  props:
    model        - array of Upload models
    tags         - user selected tags to highlight
    searchTerms  = user search terms to highlight

  See the 'Collapse' component for some magic going 
  on here to get accordian collapsing of the Details

*/
class StemsListing extends React.Component
{
  render() {
    const group = 'stems-list-parent';
    const { model, tags } = this.props;

    return (
      <div className="stems-listing-widget stems-browser">
        <InlineCSS css={SelectableTagList.css+Files.css+listingCSS} id="stem-listing-ex-css" />
        <ul className="stems-listing" id={group}>
          {model.map( (modl,i) => <StemListingLine key={i} model={modl} tags={tags} group={group} /> )}
        </ul>
      </div>
      );
    }
}

class StemListingLine extends React.Component
{
  render() {
    const { model, group, store, tags } = this.props;
    const { bpm, artist, name, id } = model;

    return(
      <li className="panel">
          {bpm && <span className="bpm">{bpm}</span>}
          <Collapse.Toggle target={'stem-'+id} group={group} className="stem-name" text={name} />
          <LinkToPeople model={artist} className="stem-artist" />
          <Files model={model} tags={tags} />
          <div className="clearfix"></div>
          <Collapse.Target target={'stem-'+id}>
            <StemsDetail model={model} store={store} tags={tags} />
          </Collapse.Target>
      </li>
    );
  }
}

class StemsDetail extends React.Component
{
  render() {
    const { model, tags } = this.props;
    // TODO: these tags used to be filtered by genre/instrument
    const userTags = new TagString(model.userTags);

    return (
      <div className="stems-detail">
        <SelectableTagList glyphs="checks" floating model={userTags} selected={tags} />
        <div className="clearfix"></div>
        <LinkToRemixTree model={model} />
      </div>
    );
  }
}

module.exports = StemsListing;
