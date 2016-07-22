/* globals $*/
import React             from 'react';
import Glyph             from '../vanilla/Glyph';

// TODO: allow multiple of these on a page

/*
  Display a "static" playlist - that means no links or 'play' buttons.

  HOWEVER you do have the option to allow sorting of the list. 

  props -
    model    - object 
    sorting - boolean yes, means show dragging glyphs and allow for 
               jQueryUI 'sorting' to kick in
*/
class SortingTrackList extends React.Component 
{
  componentDidMount() {
    if( this.props.sorting ) {
      $('.track-dragger').show();
      $('#fo').sorting();
    } else {
      $('.track-dragger').hide();
    }
  }

  render() {
    return(
        <ul className="sorting-track-list" id="fo">
          {this.props.model.items.map( (t,i) =>  <li key={t.id} id={'fo_' + (i+1)}>
                                    {this.props.sorting
                                      ? <span className="track-dragger"><Glyph icon="bars" /></span>
                                      : null
                                    }
                                    <span className="name">
                                      {t.name}
                                    </span>
                                    <span className="by">
                                      {" by "}
                                    </span>
                                    <span className="artist">
                                      {t.artist.name}
                                    </span>
                                  </li> )}
        </ul>
      );
  }
}

SortingTrackList.defaultProps = {
  sorting: React.PropTypes.bool.isRequired
};

module.exports = SortingTrackList;


