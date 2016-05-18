import Model from '../Model';
import UserFeedTypes from '../user-feed-types';

class UserFeedItemArtist extends Model {
  constructor() {
    super(...arguments);
    this.avatarURLBinding =  '_bindParent.user_avatar_url';
    this.nameBinding = '_bindParent.user_real_name';
    this.idBinding = '_bindParent.user_name';
  }
}

class UserFeedItemBase extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      artist: UserFeedItemArtist
    };
    this.typeBinding       = 'feed_type';
    this.dateBinding       = 'feed_date_format';
    this.nameBinding       = 'item_name';
    this.idBinding         = 'feed_id';
    this.targetBinding     = 'target_id';   
    this.targetUserIDBinding = 'target_user_name'; 
    this.getSeen = function() {
      return this.feed_seen === '1';
    };
  }

}

class UserFeedItemUpload extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.target_user_name + '/' + this.target_id;
    };
  }
}

class UserFeedItemReview extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.target_user_name + '/' + this.target_id + '#' + this.feed_key;
    };
  }
}

class UserFeedItemThreadTopic extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/thread/' + this.target_id + '#' + this.feed_key;
    };
  }
}

var UserFeedModelMap = {};

[ 
  [ UserFeedTypes.FOLLOWER_UPLOAD , UserFeedItemUpload ],
  [ UserFeedTypes.FOLLOWER_UPDATE , UserFeedItemUpload ],
  [ UserFeedTypes.RECOMMEND       , UserFeedItemUpload ],
  [ UserFeedTypes.REMIXED         , UserFeedItemUpload ],
  [ UserFeedTypes.EDPICK          , UserFeedItemUpload ],
  [ UserFeedTypes.EDPICK_YOU      , UserFeedItemUpload ],

  [ UserFeedTypes.REVIEW          , UserFeedItemReview ],
  [ UserFeedTypes.REPLY_REV       , UserFeedItemReview  ],

  [ UserFeedTypes.ADMIN_MSG       , UserFeedItemThreadTopic  ],
  [ UserFeedTypes.REPLY           , UserFeedItemThreadTopic  ],

].forEach( uf => UserFeedModelMap[uf[0]] = uf[1] );


function UserFeedItem(jsonData) {
  var model = UserFeedModelMap[jsonData.feed_type];
  return new model(...arguments);
}

module.exports = {
  UserFeedItem
};
