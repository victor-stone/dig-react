import Model from '../Model';
import {UserFeedObjTypes} from '../user-feed-types';

class UserFeedItemArtist extends Model {
  constructor() {
    super(...arguments);
    this.avatarURLBinding =  '_bindParent.user_avatar_url';
    this.nameBinding = '_bindParent.user_real_name';
    this.idBinding = '_bindParent.user_name';
  }
}

class UserFeedItemActor extends Model {
  constructor() {
    super(...arguments);
    this.avatarURLBinding =  '_bindParent.user_avatar_url';
    this.nameBinding = '_bindParent.actor_real_name';
    this.idBinding = '_bindParent.actor_user_name';
  }
}

/*
  "verb": "3",
  "objtype": "2",
  "sticky": "0",
  "reason": "5",
  "name": "Face in the Crowd",
  "topic_id": "230006",
  "topic_thread": null,
  "upload_id": "53753",
  "date_format": "Friday, May 20, 2016 @ 12:23 PM",
  "actor_user_name": "Loveshadow",
  "actor_real_name": "Loveshadow",
  "user_name": "scomber",
  "user_real_name": "Scomber"
*/

class UserFeedItemBase extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      artist: UserFeedItemArtist,
      actor: UserFeedItemActor
    };
    this.nameBinding = 'name';
    this.dateBinding = 'date_format';
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

var  UserFeedModelMap = [];

UserFeedModelMap[ UserFeedObjTypes.UPLOAD ]    = UserFeedItemUpload;
UserFeedModelMap[ UserFeedObjTypes.REVIEW ]    = UserFeedItemReview;
UserFeedModelMap[ UserFeedObjTypes.FORUM_POST ] = UserFeedItemThreadTopic;


function UserFeedItem(jsonData) {
  var model = UserFeedModelMap[parseInt(jsonData.objtype)];
  return new model(...arguments);
}

module.exports = {
  UserFeedItem
};
