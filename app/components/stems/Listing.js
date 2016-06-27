import React            from 'react';
import Files            from '../models/Files';
import LinkToPeople     from '../services/LinkToPeopleRoute';
import Collapse         from '../vanilla/CollapseGroup';

import InlineCSS        from '../vanilla/InlineCSS';

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
    const { model, tags, detailElem, css ='' } = this.props;

    const lineProps = { tags, group, detailElem};

    return (
      <div className="stems-listing-widget stems-browser">
        <InlineCSS css={Files.css+css} id="stem-files-css" />
        <ul className="stems-listing" id={group}>
          {model.map( (modl,i) => <StemListingLine key={i} model={modl} {...lineProps} /> )}
        </ul>
      </div>
      );
    }
}

class StemListingLine extends React.Component
{
  render() {
    const { model, group, tags, detailElem } = this.props;
    const { bpm, artist, name, id } = model;

    var detail = React.createElement(detailElem,{model});

    return(
      <li className="panel">
          {bpm && <span className="bpm">{bpm}</span>}
          <Collapse.Toggle target={'stem-'+id} group={group} className="stem-name" text={name} />
          <LinkToPeople model={artist} className="stem-artist" />
          <Files model={model} tags={tags} />
          <div className="clearfix"></div>
          <Collapse.Target target={'stem-'+id}>
            {detail}
          </Collapse.Target>
      </li>
    );
  }
}

module.exports = StemsListing;
