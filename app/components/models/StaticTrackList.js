/* globals $*/
import React             from 'react';
import Glyph             from '../vanilla/Glyph';

// TODO: allow multiple of these on a page

/*
  Display a "static" playlist - that means no links or 'play' buttons.

  HOWEVER you do have the option to allow sorting of the list. 

  props -
    model    - object 
    sortable - boolean yes, means show dragging glyphs and allow for 
               jQueryUI 'sortable' to kick in
*/
class StaticTrackList extends React.Component 
{
  componentDidMount() {
    if( this.props.sortable ) {
      $('.track-dragger').show();
      $('#fo').sortable();
    } else {
      $('.track-dragger').hide();
    }
  }

  render() {
    return(
        <ul className="sortable-track-list" id="fo">
          {this.props.model.items.map( (t,i) =>  <li key={t.id} id={'fo_' + (i+1)}>
                                    {this.props.sortable
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

module.exports = StaticTrackList;


