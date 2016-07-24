/* globals $*/
import React             from 'react';
import Glyph             from '../vanilla/Glyph';

//import { nextID }        from '../../unicorns';

// TODO: allow multiple of these on a page

/*
  Display a "static" playlist - that means no links or 'play' buttons.

  HOWEVER you do have the option to allow sorting of the list. 

  props -
    model    - object 
    sorting - boolean yes, means show dragging glyphs and allow for 
               jQueryUI 'sorting' to kick in
*/
class TrackListSorting extends React.Component 
{
  constructor() {
    super(...arguments);
    this.id = 'fo'; // nextID('fo');
  }
  componentDidMount() {
    const hashID = '#' + this.id;
    if( this.props.sorting ) {
      $('.track-dragger').show();
      $(hashID).sortable().on( 'sortupdate', () => {
        this.props.onUpdate && this.props.onUpdate($(hashID).sortable( 'serialize' ));
      });
    } else {
      $('.track-dragger').hide();
    }
  }

  render() {
    return(
        <ul className="sorting-track-list" id={this.id}>
          {this.props.model.items.map( (t,i) =>  <li key={t.id} id={this.id + '_' + (i+1)}>
            {this.props.sorting && <span className="track-dragger"><Glyph icon="bars" /></span>}
            <span className="name">{t.name}</span>
            <span className="by">{" by "}</span>
            <span className="artist">{t.artist.name}</span>
          </li> )}
        </ul>
      );
  }
}

TrackListSorting.defaultProps = {
  sorting: React.PropTypes.bool.isRequired
};

module.exports = TrackListSorting;


