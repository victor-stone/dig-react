import React      from 'react';
import qc         from '../../models/query-configs';
import Store      from '../../stores/remixes';

import { mergeParams }    from '../../unicorns';

import Tiles   from '../../components/remix-tree/tiles';
import SubNav  from '../../components/remix-tree/sub-nav';

const tree = Object.assign(Tiles, {
  title: 'Remix Tree',

  path: [ '/tree', '/tree/:reqtags' ],

  subnav(props) {
    return (<SubNav paging store={props.store} className="tree-subnav" tab="remix" />);  
  },

  store( params={}, queryParams={} ) {

    const opts = Object.assign( {},
                                qc.remixes,
                                qc.latest,
                                'reqtags' in params ? {reqtags:params.reqtags} : {} );

    const qparams = mergeParams( {}, opts, queryParams );

    return Store.storeFromQuery(qparams, opts);
  },

  urlFromStore(store) {
    let   path = '/tree';
    const reqtag = SubNav.isTab(store.queryParams.reqtags);
    reqtag && (path += '/' + reqtag);
    return path + store.queryString;
  }
});


module.exports = tree;

