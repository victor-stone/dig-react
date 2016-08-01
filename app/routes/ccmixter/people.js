import React            from 'react';
import User             from '../../stores/user';
import People           from '../../components/ccmixter/people';
import { mergeParams }  from 'unicorns';
import qc               from '../../models/query-configs';
import SubNav           from '../../components/remix-tree/sub-nav';

const people = Object.assign(People,{

  path: ['/people/:userid','/people/:userid/:reqtags'],

  title: 'People',

  subnav(props) {
    return (<SubNav paging {...props} all className="people-subnav" />);
  },

  store( params, queryParams ) {
    const { userid, reqtags = null } = params;
    
    var qparams = mergeParams( {}, 
                               qc.people, 
                               { user: userid }, 
                               reqtags ? {reqtags} : {},
                               queryParams );

    return User.fromQuery(qparams)
            .then( store => {
              people.title = !this.error && store.model.artist.name;
              return store;
            });
  },

  urlFromStore(store) {
    let path = '/people/' + store.model.artist.id;
    const reqtag = SubNav.isTab(store.model.queryParams.reqtags);
    reqtag && (path += '/' + reqtag);
    return path + store.queryString(qc.visibility.people);
  }
});


module.exports = people;

