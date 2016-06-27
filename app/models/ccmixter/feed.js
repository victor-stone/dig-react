import Model from '../model';
import {UserFeedObjTypes} from '../user-feed-types';

/*
  There are 3 potential players in a feed item. One scenario:

  The ItemUser is following the ItemActor who recommends a track by ItemArist
*/
/*
  e.g. the musician who uploaded the track
*/
class UserFeedItemArtist extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.user_real_name';
    this.idBinding = '_bindParent.user_name';
  }
}

/*
  e.g. the author of a review of a track made by 'artist'
*/
class UserFeedItemActor extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.actor_real_name';
    this.idBinding = '_bindParent.actor_user_name';
  }
}

/*
  e.g. someone following the 'actor'
*/
class UserFeedItemUser extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.feeder_real_name';
    this.idBinding = '_bindParent.feeder_user_name';
  }
}


class UserFeedItemBase extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      artist: UserFeedItemArtist,
      actor: UserFeedItemActor,
      user: UserFeedItemUser
    };
    this.nameBinding = 'name';
    this.rawDateBinding = 'action_date';
    this.getObjType = function() {
      return parseInt(this.objtype);
    };
    this.getVerb = function() {
      return parseInt(this.verb);
    };
    this.getSticky = function() {
      return this.sticky === '1';
    };
    this.getReason = function() {
      return parseInt(this.reason);
    };
  }

}

class UserFeedItemUpload extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.user_name + '/' + this.upload_id;
    };
  }
}

class UserFeedItemReview extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.user_name + '/' + this.upload_id + '#' + this.topic_id;
    };
  }
}

class UserFeedItemThreadTopic extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/thread/' + this.topic_thread + '#' + this.topic_id;
    };
  }
}

class UserFeedItemPerson extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/people/' + this.actor_user_name;
    };
  }
}

var  UserFeedModelMap = [];

UserFeedModelMap[ UserFeedObjTypes.UPLOAD ]    = UserFeedItemUpload;
UserFeedModelMap[ UserFeedObjTypes.REVIEW ]    = UserFeedItemReview;
UserFeedModelMap[ UserFeedObjTypes.FORUM_POST ] = UserFeedItemThreadTopic;
UserFeedModelMap[ UserFeedObjTypes.USER ]       = UserFeedItemPerson;


function UserFeedItem(jsonData) {
  var model = UserFeedModelMap[parseInt(jsonData.objtype)];
  return new model(...arguments);
}

module.exports = {
  UserFeedItem
};
