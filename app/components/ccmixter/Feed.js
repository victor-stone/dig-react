/*eslint "react/no-danger":0 */
import React            from 'react';
import UserFeedTypes    from '../../models/user-feed-types';
import { ModelTracker } from '../../mixins';
import InlineCSS        from '../InlineCSS';
import Glyph            from '../Glyph';
import css              from './style/feed';
import lookup           from '../../services';
import ccMixter         from '../../stores/ccmixter';

var FeedHeaders = {};

[
  [ UserFeedTypes.FOLLOWER_UPLOAD, '%user% uploaded %name%',           'music'],
  [ UserFeedTypes.FOLLOWER_UPDATE, '%user% made changes to %name%',    'refresh'],
  [ UserFeedTypes.REVIEW,          '%name% was reviewed by %user%',    'edit'],
  [ UserFeedTypes.RECOMMEND,       '%user% recommended %name%',        'heart'],
  [ UserFeedTypes.REMIXED,         '%user% remixed %name%',            'recycle'],
  [ UserFeedTypes.REPLY,           '%user% replied to you',            'comments'],
  [ UserFeedTypes.REPLY_REV,       '%user% replied to your review',    'comments'],
  [ UserFeedTypes.ADMIN_MSG,       'From the admins: %name%',          'bullhorn'],
  [ UserFeedTypes.EDPICK,          '%name% by %user% was Ed Picked',   'star'],
  [ UserFeedTypes.EDPICK_YOU,      '%name% was Ed Picked',             'star'],
].forEach( fh => FeedHeaders[fh[0]] = { msg: fh[1],
                                        icon: fh[2] } );

Object.keys(UserFeedTypes).forEach( key => FeedHeaders[UserFeedTypes[key]].cls = key.replace(/UserFeedTypes\./, '').toLowerCase() );



var FeedItem = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },

  componentWillReceiveProps: function( props ) {
    if( this.state.model !== props.model) {
      this.setState( { model: props.model });
    }
  },
    
  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    ccMixter.markItemAsSeen(this.state.model.id);
    lookup('router').navigateTo( this.state.model.navigationURL );
  },

  render() {
      var item = this.state.model;
      var fh  = FeedHeaders[item.type];
      var cls = fh.cls + ' ' + (item.seen ? 'seen' : 'unseen');
      var msg = fh.msg
                  .replace( /%user%/, `<strong>${item.artist.name}</strong>` )
                  .replace( /%name%/, `<i>${item.name}</i>` );
      msg = { __html: msg};
      var url = item.artist.avatarURL.replace(/ccm/,'ccmixter.org');

      return (<li className={cls} onClick={this.onClick} >
                <div className="date">{item.date}</div>
                <div className="img-container"><img src={url} className="avatar" /></div>
                <div className="text">
                  <Glyph icon={fh.icon} />
                  <span dangerouslySetInnerHTML={msg} />
                </div>
             </li>);

  }  
});

var Feed = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return {store};
  },

  render() {
    return (
      <div className="user-feed container-fluid">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <InlineCSS css={css} id="feed-css" />
            <ul className="user-feed-items">
            {this.state.store.model.items.map( item => <FeedItem key={item.id} model={item} /> )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Feed;

//
