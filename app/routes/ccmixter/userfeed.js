import React             from 'react';
import { Feed,
         FeedSubNav }    from '../../components/ccmixter/';
import Store             from '../../stores/userfeed';

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
  var defopts = {limit: 10, dataview: 'userfeed', datasource: 'feed', unseen: '0' };
  if( params.user ) {
    defopts.user = params.user;
  } else {
    defopts.sticky = 1;
  }
  var qparams = mergeParams( {}, params, defopts, queryParams );
  return Store.storeFromQuery(qparams, defopts );
};

module.exports = UserFeedPage;

