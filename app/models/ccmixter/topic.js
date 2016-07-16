import Model                from '../model';
import { DetailUploadUser } from './user';

const bbFormatMap = [ 'format', 'raw', 'text'];

const pageFormatMap = {
  format: 'topic_text_html',
  text: 'topic_text_plain',
  raw: 'topic_text'
};

class Topic extends Model {
  constructor() {
    super(...arguments);
    this.publishedBinding = 'topic_date';
    this.idBinding = 'topic_id';
    this.nameBinding = 'topic_name';
    this.rawBinding = 'topic_text';
    this.textBinding = 'topic_text_plain';
    this.getHtml = function() {
      const key = this.content_page_textformat || bbFormatMap[Number(this.topic_format)];
      const html = this[pageFormatMap[key]];
      return html.replace(/http:\/\/ccmixter.org\//g,'/')
                 .replace(/http:\/\/playlists.ccmixter.org\/(playlist\/)?browse/g,'/playlist/browse')
                 .replace(/\/mixup\//g,'http://ccmixter.org/mixup/')
                 .replace(/(<img.*src=")(\/mixter-files)/g,'$1http://ccmixter.org$2')
                 .replace(/(\/media\/people\/contact\/admin)/g, 'http://ccmixter.org$1');
    };
  }
}

class ThreadTopic extends Topic {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      author: DetailUploadUser,
    };
    this.getIndent = function() {
      return parseInt(this.margin) / INDENT_CONSTANT;
      };
    this.getIsReply = function() {
      return this.is_reply !== '0';
    };
  }
}

const INDENT_CONSTANT = 30;

class ForumHead extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.forum_name';
    this.idBinding = '_bindParent.forum_id';
  }
}

class ThreadHead extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      author: DetailUploadUser,
      forum: ForumHead
    };
    this.idBinding = 'forum_thread_id';
    this.dateBinding = 'forum_thread_date';
    this.nameBinding = 'forum_thread_name';
  }
}    


module.exports = {
  ThreadHead,
  ThreadTopic,
  Review: ThreadTopic,
  Topic,
};
