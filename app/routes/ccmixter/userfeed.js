import React             from 'react';
import UserFeed          from '../../services/userfeed';
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
  var qparams = mergeParams( {}, qc.userfeed, params, queryParams );
  var service = UserFeed(qc.userfeed);
  return service.getModel(mergeParams(qparams,service.defaultParams)).then( () => service );
};

module.exports = FeedPage;

