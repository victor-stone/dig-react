import React from 'react';
import rsvp  from 'rsvp';

import { underscore, 
            mergeParams } from '../unicorns';

import qc from '../models/query-configs';

import {  Link, 
          Glyph, 
          PageHeader, 
          DigRemixes as Playlist, 
          Paging } from '../components';

import TagStore       from '../stores/tags';
import QueryStore     from '../stores/query';
import PlaylistStore  from '../stores/playlist';

var DidYouMeanSection = React.createClass({

  render: function() {
    var groups = [];

    this.props.model.forEach( function(g) {

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
      return (
        <div className="did-you-mean well">
          {groups}
        </div>
      );                    

    } else {
      return (
          <div className="did-you-mean well no-hit-suggestion">
            {"Not what you're looking for? "}
            <Link href="/dig" className="btn btn-success">
              <Glyph icon="tags" />
              {" Dig deep"}
            </Link>
          </div>                    
        );
    }

  },

});

var search = React.createClass({

  render() {
    var text   = this.props.queryParams.searchp;
    var store  = this.props.store;

    return  (
      <div>
        <PageHeader icon="search" title={text} subTitle="Search Results" />
        <DidYouMeanSection model={store.didYouMean} />
        <Paging store={store} />
        <Playlist store={store} />
        <Playlist.NotALotHere store={store} />
      </div>
    );
  },

});

function didYouMean( text )
{
  if( !text ) {
    return rsvp.resolve([]);
  }
  
  var tagStore   = new TagStore();
  var queryStore = new QueryStore();
  
  var didYouMean = { 

    artists: queryStore.searchUsers({
                limit: 40,
                remixmin: 1,
                searchp: text
              }),

    genres: tagStore.searchTags({
                min: 5,
                ids: underscore(text)
              })
    };    
    
    return rsvp.hash(didYouMean).then( result => 
        [ 
          {
            name:  'Genres',
            route: 'tags',
            icon:  'tag',
            items: result.genres,
          },
          {
            name:  'Artists',
            route: 'people',
            icon:  'user',
            items: result.artists
          }        
        ]
      );
}

search.title = 'Search';

search.store = function( params, queryParams ) {
  if( queryParams.searchp ) {
    queryParams.searchp = queryParams.searchp.replace(/[^a-zA-Z0-9 _()\*\.]/,'');
  }
  var qparams = mergeParams( { search_type: 'all' }, qc.default, queryParams );

  function makePromise() {
    var modelRequest = {
      store: PlaylistStore.storeFromQuery(qparams),
      didYouMean: didYouMean(queryParams.searchp)
    };
    return rsvp.hash(modelRequest).then( model => {
      model.store.didYouMean = model.didYouMean;
      return model.store;
    });
  }

  return makePromise();
};

module.exports = search;

