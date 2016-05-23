/*eslint "react/no-danger":0 */
import React            from 'react';
import {UserFeedVerbs,
        UserFeedReasons}  from '../../models/user-feed-types';
import { ModelTracker } from '../../mixins';
import InlineCSS        from '../InlineCSS';
import Glyph            from '../Glyph';
import css              from './style/feed';
import lookup           from '../../services';
import ccMixter         from '../../stores/ccmixter';
import events           from '../../models/events';

var FeedVerbs = [];

FeedVerbs[ UserFeedVerbs.NEW_UPLOAD     ] = { cls: 'new',     t: '%user% uploaded %name%' };
FeedVerbs[ UserFeedVerbs.UPDATE_UPLOAD  ] = { cls: 'edit',    t: '%user% made changes to %name%' };
FeedVerbs[ UserFeedVerbs.REVIEW         ] = { cls: 'review',  t: '%user% reviewed %name% by %artist%' };
FeedVerbs[ UserFeedVerbs.RECOMMEND      ] = { cls: 'rate',    t: '%user% recommended %name% by %artist%'  };
FeedVerbs[ UserFeedVerbs.TOPIC_REPLY    ] = { cls: 'reply',   t: '%user% replied to a topic' };
FeedVerbs[ UserFeedVerbs.FORUM_POST     ] = { cls: 'post',    t: 'From the admins: %name%' };
FeedVerbs[ UserFeedVerbs.EDPICK         ] = { cls: 'edpick',  t: '%name% by %user% was ed picked' };

var FeedReasons = [];

FeedReasons[ UserFeedReasons.REMIXED ]     = { cls: 'you remix',  i: 'recycle',     t: 'You\'ve been remixed' };
FeedReasons[ UserFeedReasons.REVIEWED ]    = { cls: 'you',        i: 'edit' ,       t: 'You\'ve been reviewed' };
FeedReasons[ UserFeedReasons.REPLIED_TO ]  = { cls: 'you',        i: 'comments',    t: 'Reply to your comments' };
FeedReasons[ UserFeedReasons.EDPICKED ]    = { cls: 'you',        i: 'star',        t: 'You\'ve been EdPicked' };
FeedReasons[ UserFeedReasons.FOLLOWING ]   = { cls: 'follow',     i: 'arrow-right', t: null };
FeedReasons[ UserFeedReasons.RECOMMENDED ] = { cls: 'you',        i: 'heart',       t: 'You\'ve been recommended' };


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
    lookup('router').navigateTo( this.state.model.navigationURL );
  },

  render() {
      var item   = this.state.model;
      var verb   = FeedVerbs[item.verb];
      var reason = FeedReasons[item.reason];
      var cls    = verb.cls + ' ' + reason.cls;
      var head   = reason.t;
      var msg = verb.t
                  .replace( /%user%/,   `<strong class="user">${item.actor.name}</strong>` )
                  .replace( /%artist%/, `<strong class="artist">${item.artist.name}</strong>` )
                  .replace( /%name%/,   `<i class="name">${item.name}</i>` );                  
      msg = { __html: msg};

      return (<li className={cls} onClick={this.onClick} >
                <Glyph icon={reason.i} />
                {head 
                  ? <div className="head">{head}</div>
                  : null
                }
                <div className="date">{item.date}</div>
                <div className="msg">
                  <span dangerouslySetInnerHTML={msg} />
                </div>
             </li>);

  }  
});

var Feed = React.createClass({

  mixins: [ModelTracker],

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var u = this.props.store.model.queryParams.user;
    if( u ) {
      ccMixter.markFeedAsSeen(u).then( () => this.props.store.emit(events.FEED_SEEN) );
    }
  },

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
            {this.state.store.model.items.map( (item,i) => <FeedItem key={i} model={item} /> )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Feed;

//
