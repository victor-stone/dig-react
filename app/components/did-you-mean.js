import React  from 'react';
import Link   from './services/link-to-route';
import Glyph  from './vanilla/glyph';

import { ModelTracker } from '../mixins';

class DidYouMean extends ModelTracker(React.Component)
{

  stateFromStore(store) {

    const { genres, artists } = this.props;

    var model = [];
    
    if( genres ) {
      model.push({
            name:  'Genres',
            route: 'tags',
            icon:  'tag',
            items: store.model.genres,
          });
    }

    if( artists ) {
      model.push({
            name:  'Artists',
            route: 'people',
            icon:  'user',
            items: store.model.artists
          });
    }

    return { model };
  }

  render() {

    var groups = [];

    this.state.model.forEach( g => {

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
  }

}

module.exports = DidYouMean;

