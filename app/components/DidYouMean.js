import React  from 'react';
import Link   from './services/LinkToRoute';
import Glyph  from './vanilla/Glyph';

import { ModelTracker } from '../mixins';

var DidYouMean = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore(store) {

    var model = [];
    
    if( this.props.genres ) {
      model.push({
            name:  'Genres',
            route: 'tags',
            icon:  'tag',
            items: store.model.genres,
          });
    }

    if( this.props.artists ) {
      model.push({
            name:  'Artists',
            route: 'people',
            icon:  'user',
            items: store.model.artists
          });
    }

    return { model };
  },

  render: function() {

    var groups = [];

    this.state.model.forEach( function(g) {

      if( g.items.length ) {
        var items = g.items.map( i => <Link key={i.id} href={'/' + g.route + '/' + i.id} ><Glyph icon={g.icon}/> {i.name}</Link> );
        groups.push(
            <div key={g.name}>
              <strong>{g.name}</strong>
              {items}
            </div>
          );
      }
    });

    if( groups.length ) {
      return (<div className="did-you-mean well">{groups}</div>);
    } else {
      return (<div>{this.props.children}</div>);
    }
  },

});

module.exports = DidYouMean;

