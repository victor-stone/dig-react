import React      from 'react';
import qc         from '../../models/query-configs';
import Store      from '../../stores/remixes';

import { mergeParams }    from 'unicorns';

import Tiles   from '../../components/remix-tree/tiles';
import SubNav  from '../../components/remix-tree/sub-nav';

const tree = Object.assign(Tiles, {
  title: 'Remix Tree',

  path: [ '/tree', '/tree/:reqtags' ],

  subnav(props) {
    return (<SubNav paging store={props.store} className="tree-subnav" tab="remix" />);  
  },

  store( params={}, queryParams={} ) {

    const { reqtags } = params;

    const qparams = mergeParams(  {},
                                  qc.remixes,
                                  qc.latest,
                                  reqtags ? {reqtags} : {},
                                  queryParams );

    return Store.fromQuery(qparams);
  },

  urlFromStore(store) {
    let   path = '/tree';
    const reqtag = SubNav.isTab(store.queryParams.reqtags);
    reqtag && (path += '/' + reqtag);
    return path + store.queryString(qc.visibility.remixes);
  }
});


module.exports = tree;

