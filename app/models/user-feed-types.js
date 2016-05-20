
/*

define('FEED_VERB_NEW_UPLOAD',      1);
define('FEED_VERB_UPDATE_UPLOAD',   2);
define('FEED_VERB_REVIEW',          3);
define('FEED_VERB_RECOMMEND',       4);
define('FEED_VERB_TOPIC_REPLY',     5);
define('FEED_VERB_FORUM_POST',      6);
define('FEED_VERB_EDPICK',          7);

define('FEED_TYPE_UPLOAD',     1);
define('FEED_TYPE_REVIEW',     2);
define('FEED_TYPE_FORUM_POST', 3);

define('FEED_REASON_REMIXED',     1);
define('FEED_REASON_REVIEWED',    2);
define('FEED_REASON_REPLIED',     3);
define('FEED_REASON_EDPICKED',    4);
define('FEED_REASON_FOLLOW',      5);
define('FEED_REASON_RECOMMENDED', 6);



*/

const UserFeedVerbs = {
  NEW_UPLOAD: 1,
  UPDATE_UPLOAD: 2,
  REVIEW: 3,
  RECOMMEND: 4,
  TOPIC_REPLY: 5,
  FORUM_POST: 6,
  EDPICK: 7
};

const UserFeedObjTypes = {
  UPLOAD: 1,
  REVIEW: 2,
  FORUM_POST: 3
};

const UserFeedReasons = {
  REMIXED: 1,
  REVIEWED: 2,
  REPLIED_TO: 3,
  EDPICKED: 4,
  FOLLOWING: 5,
  RECOMMENDED: 6
};

module.exports = {
  UserFeedReasons,
  UserFeedVerbs,
  UserFeedObjTypes
};
