import React             from 'react';
import userFeed          from '../../services/userfeed';
import qc                from '../../models/query-configs';
import { mergeParams }   from '../../unicorns';
import FeedPage          from '../../components/ccmixter/FeedPage';
import FeedSubNav        from '../../components/ccmixter/FeedSubNav';

FeedPage.title = 'Feed';

FeedPage.path  = [ '/feed', '/feed/:user', '/feed/:user/:following' ];

FeedPage.subnav = function(props) {
    return (<FeedSubNav paging store={props.store} />);
  };

FeedPage.store = function(params,queryParams) {  
  var service = userFeed(qc.userfeed);
  if( !params.user ) {
    return service.getSiteFeed().then( () => service );
  }
  var qparams = mergeParams( {}, qc.userfeed, params, queryParams );
  return service.getModel(mergeParams(qparams,service.defaultParams)).then( () => service );
};

module.exports = FeedPage;

