
const UserFeedVerbs = {
  NEW_UPLOAD: 1,
  UPDATE_UPLOAD: 2,
  REVIEW: 3,
  RECOMMEND: 4,
  TOPIC_REPLY: 5,
  FORUM_POST: 6,
  EDPICK: 7,
  FOLLOW: 8
};

const UserFeedObjTypes = {
  UPLOAD: 1,
  REVIEW: 2,
  FORUM_POST: 3,
  USER: 4
};

const UserFeedReasons = {
  REMIXED: 1,
  REVIEWED: 2,
  REPLIED_TO: 3,
  EDPICKED: 4,
  FOLLOWING: 5,
  RECOMMENDED: 6,
  FOLLOWED: 7
};

module.exports = {
  UserFeedReasons,
  UserFeedVerbs,
  UserFeedObjTypes
};
