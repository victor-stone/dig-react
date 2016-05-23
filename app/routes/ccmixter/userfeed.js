import React             from 'react';
import { Feed,
         FeedSubNav }    from '../../components/ccmixter/';
import UserFeed          from '../../services/userfeed';
import qc                from '../../models/query-configs';
import { mergeParams }   from '../../unicorns';

function UserFeedPage(props) {
    return <Feed {...props} />; 
}

UserFeedPage.title = 'Feed';

UserFeedPage.path  = [ '/feed', '/feed/:user' ];

UserFeedPage.subnav = function(props) {
    return (<FeedSubNav paging store={props.store} />);
  };

UserFeedPage.store = function(params,queryParams) {  
  var qparams = mergeParams( {}, params, qc.userfeed, queryParams );
  var service = UserFeed(qc.userfeed);
  return service.getModel(mergeParams(qparams,service.defaultParams)).then( () => service );
};

module.exports = UserFeedPage;

