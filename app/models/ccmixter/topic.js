import Model          from '../model';

const BB_FORMAT = 0;
const HTML_FORMAT = 1;
//const PLAIN_FORMAT = 2;

class Topic extends Model {
  constructor() {
    super(...arguments);
    this.publishedBinding = 'topic_date';
    this.idBinding = 'topic_id';
    this.nameBinding = 'topic_name';
    this.rawBinding = 'topic_text';
    this.textBinding = 'topic_text_plain';
    this.getHtml = function() {
      var fmt = Number(this.topic_format);
      if( fmt === BB_FORMAT ) {
        return this.topic_text_html;
      } else if( fmt === HTML_FORMAT ) {
        return this.topic_text; // sic (!)
      } 
      // PLAIN_FORMAT
      return this.topic_text_plain;
    };
  }
}

const INDENT_CONSTANT = 30;

class Review extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      author: DetailUploadUser,
    };
    this.idBinding = 'topic_id';
    this.htmlBinding = 'topic_text_html';
    this.dateBinding = 'topic_date_format';
    this.getIndent = function() {
      return parseInt(this.margin) / INDENT_CONSTANT;
      };
    this.getIsReply = function() {
      return this.is_reply !== '0';
    };
  }
}

module.exports = {
  Review,
  Topic,
};
