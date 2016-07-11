import React            from 'react';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import Rmx              from '../../stores/remixes';

import {  QueryOptions }     from '../../components/dig'; 
import PeopleHeader      from '../../components/models/PeopleHeader';
import Remixes          from '../../components/Remixes';
import SubNav           from '../../components/dig/SubNav';

const people = React.createClass({

  render() {
    const { store, store:{error=null,model} } = this.props;

    if( error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    return  (
      <div>
        <PeopleHeader model={model.artist} />
        <Remixes store={store} skipUser>
          <QueryOptions store={store} />
        </Remixes>
        <Remixes.NotALotHere store={store} />
      </div>
    );
  },

});

Object.assign(people,{
  path: '/people/:userid',

  title: 'People',

  subnav: SubNav,

  store(params,queryParams) {
    const opts    = mergeParams( {}, qc.remixes );
    const qparams = mergeParams( {}, opts, { u: params.userid }, queryParams );
    return Rmx.storeFromQuery(qparams,opts)
            .then( store => {
              people.title = !this.error && store.model.artist.name;
              return store;
            });
  },

  urlFromStore(store) {
    const { model:{artist:{id}}, queryString } = store;
    return '/people/' + id + queryString;
  }


});
module.exports = people;

