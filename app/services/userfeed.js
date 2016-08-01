import UserFeedStore from '../stores/userfeed';

module.exports = function() {
  // unforunately, store's design need
  // a little more work to be singletons
  return new UserFeedStore();
};


