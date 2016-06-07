import API from './api';

class Feed extends API
{
  markAsSeen(userid) {
    return this.call('feed/lastseen/' + userid);
  }
}

module.exports = Feed;
