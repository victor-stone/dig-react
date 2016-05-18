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
    this.typeBinding   = 'feed_type';
    this.dateBinding   = 'feed_date_format';
    this.nameBinding   = 'item_name';
    this.idBinding     = 'feed_id';
    this.targetBinding = 'target_id';    
  }

}

class UserFeedItemUpload extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.user_name + '/' + this.target_id;
    }
  }
}

class UserFeedItemReview extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/files/' + this.user_name + '/' + this.target_id + '#' + this.feed_key;
    }
  }
}

class UserFeedItemThreadTopic extends UserFeedItemBase {
  constructor() {
    super(...arguments);
    this.getNavigationURL = function() {
      return '/thread/' + this.target_id + '#' + this.target_id;
    }
  }
}

var UserFeedModelMap = {};

[ 
  [ UserFeedTypes.FOLLOWER_UPLOAD: , UserFeedItemUpload ],
  [ UserFeedTypes.FOLLOWER_UPDATE: , UserFeedItemUpload ],
  [ UserFeedTypes.RECOMMEND:       , UserFeedItemUpload ],
  [ UserFeedTypes.REMIXED:         , UserFeedItemUpload ],
  [ UserFeedTypes.EDPICK:          , UserFeedItemUpload ],
  [ UserFeedTypes.EDPICK_YOU:      , UserFeedItemUpload ],

  [ UserFeedTypes.REVIEW:          , UserFeedItemReview ],
  [ UserFeedTypes.REPLY_REV:       , UserFeedItemReview  ],

  [ UserFeedTypes.REPLY:           , UserFeedItemThreadTopic  ],
  
].forEach( uf => UserFeedModelMap[uf[0]] = uf[1] );


function UserFeedItem(jsonData) {
  return new UserFeedModelMap[jsonData.feed_type](...arguments);
}

module.exports = {
  UserFeedItem
};
