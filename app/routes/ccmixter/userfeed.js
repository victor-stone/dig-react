import React             from 'react';
import userFeed          from '../../services/userfeed';
import qc                from '../../models/query-configs';
import { mergeParams }   from 'unicorns';
import FeedPage          from '../../components/ccmixter/feed-page';
import FeedSubNav        from '../../components/ccmixter/feed-sub-nav';

Object.assign( FeedPage, {
  title: 'Feed',

  path: [ '/feed', '/feed/:user', '/feed/:user/:following' ],

  browserOnly: true,
  
  subnav(props) {
    return (<FeedSubNav paging store={props.store} />);
  },

  store(params,queryParams) {  
    var service = userFeed();
    if( !params.user ) {
      return service.getSiteFeed().then( () => service );
    }
    var qparams = mergeParams( {}, qc.userfeed, params, queryParams );
    return service.getModel(qparams).then( () => service );
  },

  urlFromStore(store) {
    const user      = store.getProperty('user').serialize();
    const following = store.getProperty('following').serialize();

    let url = '/feed';
    
    user      && (url += '/' + user );
    following && (url += '/following');
    
    return url + store.queryString( qc.visibility.userfeed );
  }
});

module.exports = FeedPage;

