import UserFeedStore from '../stores/userfeed';
import qc from '../models/query-configs';

var service = null;

module.exports = function(defaultOpts) {
  if( !service ) {
    service = new UserFeedStore(defaultOpts || qc.userfeed );
  }
  return service;
};


