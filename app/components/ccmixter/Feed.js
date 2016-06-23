/*eslint "react/no-danger":0 */
import React            from 'react';
import moment           from 'moment';
import {UserFeedVerbs,
        UserFeedReasons}  from '../../models/user-feed-types';
import { ModelTracker } from '../../mixins';
import InlineCSS        from '../vanilla/InlineCSS';
import Glyph            from '../vanilla/Glyph';
import css              from './style/feed';
import LinkToRoute      from '../services/LinkToRoute';
import api              from '../../services/ccmixter';
import events           from '../../models/events';

var FeedVerbs = [];

FeedVerbs[ UserFeedVerbs.NEW_UPLOAD     ] = { cls: 'new',     i: 'cloud-upload', t: '%actor% uploaded %name%' };
FeedVerbs[ UserFeedVerbs.UPDATE_UPLOAD  ] = { cls: 'edit',    i: 'refresh',      t: '%actor% made changes to %name%' };
FeedVerbs[ UserFeedVerbs.REVIEW         ] = { cls: 'review',  i: 'edit',         t: '%actor% reviewed %name% by %artist%' };
FeedVerbs[ UserFeedVerbs.RECOMMEND      ] = { cls: 'rate',    i: 'heart',        t: '%actor% recommended %name% by %artist%'  };
FeedVerbs[ UserFeedVerbs.TOPIC_REPLY    ] = { cls: 'reply',   i: 'reply-all',    t: '%actor% replied to a topic' };
FeedVerbs[ UserFeedVerbs.FORUM_POST     ] = { cls: 'post',    i: 'comments',     t: '%name%' };
FeedVerbs[ UserFeedVerbs.EDPICK         ] = { cls: 'edpick',  i: 'star',         t: '%name% by %actor% was ed picked' };
FeedVerbs[ UserFeedVerbs.FOLLOW         ] = { cls: 'follow',  i: 'arrow-right',  t: '%actor% is following %artist%' };

var FeedReasons = [];

FeedReasons[ UserFeedReasons.REMIXED ]     = { raw: 'remix',     i: 'recycle',     t: 'You\'ve been remixed' };
FeedReasons[ UserFeedReasons.REVIEWED ]    = { raw: 'reviewd',   i: 'edit' ,       t: 'You\'ve been reviewed' };
FeedReasons[ UserFeedReasons.REPLIED_TO ]  = { raw: 'reply',     i: 'comments',    t: 'Reply to your comments' };
FeedReasons[ UserFeedReasons.EDPICKED ]    = { raw: 'edpick',    i: 'star',        t: 'You\'ve been EdPicked' };
FeedReasons[ UserFeedReasons.FOLLOWING ]   = { raw: 'youfollow', i: 'arrow-left',  t: null };
FeedReasons[ UserFeedReasons.RECOMMENDED ] = { raw: 'rated',     i: 'heart',       t: 'You\'ve been recommended' };
FeedReasons[ UserFeedReasons.FOLLOWED ]    = { raw: 'followed',  i: 'arrow-right', t: 'You\'re being followed' };

var FeedItemDebug = React.createClass({

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
    LinkToRoute.navigateTo( this.state.model.navigationURL );
  },

  render() {
      var item   = this.state.model;
      var verb   = FeedVerbs[item.verb];
      var reason = FeedReasons[item.reason] || verb;
      var cls    = verb.cls + ' ' + reason.cls;
      var icon   = item.sticky ? 'bullhorn' : reason.i;
      var date   = moment(item.rawDate).fromNow();
      var msg = ' <b>Verb:</b> '   + verb.cls + 
                ' <b>Reason:</b> ' + (reason.raw || reason.cls) + 
                ' <b>actor:</b> '  + item.actor.name + 
                ' <b>on:</b> '     + item.name +
                ' <b>by:</b> '     + item.artist.name +
                ' <b>own:</b> '    + item.user.name;
      msg = { __html: msg};

      return (<li className={cls} onClick={this.onClick} >
                <Glyph icon={icon} />
                <div className="date">{date}</div>
                <div className="msg">
                  <span dangerouslySetInnerHTML={msg} />
                </div>
             </li>);

  }  
});

var FeedItemPretty = React.createClass({

  getInitialState() {
    return { model: this.props.model, owner: this.props.owner };
  },

  componentWillReceiveProps: function( props ) {
    if( this.state.model !== props.model || this.state.owner !== props.owner ) {
      this.setState( { model: props.model, owner: props.owner });
    }
  },
    
  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    LinkToRoute.navigateTo( this.state.model.navigationURL );
  },

  render() {
    var item     = this.state.model;
    var verb     = FeedVerbs[item.verb];
    var reason   = FeedReasons[item.reason]; // might be undefined
    var head     = null;
    var cls      = verb.cls;
    var template = verb.t;
    var icon     = item.sticky ? 'bullhorn' : ((reason && reason.i) || verb.i);
    var date     = moment(item.rawDate).fromNow();

    if( item.user.id === this.state.owner && item.actor.id !== this.state.owner ) {
      // this is an action that happened to the person logged in
      head = reason.t;
      cls += ' you';
    }

    if( item.reason === UserFeedReasons.REMIXED ) {
      template += ` remix of <strong class="artist">${item.user.name}</strong>`;
    } 

    var msg = template
                .replace( /%actor%/,   `<strong class="user">${item.actor.name}</strong>` )
                .replace( /%artist%/, `<strong class="artist">${item.artist.name}</strong>` )
                .replace( /%name%/,   `<i class="name">${item.name}</i>` );                  
    msg = { __html: msg};

    return (<li className={cls} onClick={this.onClick} >
              <Glyph icon={icon} />
              {head 
                ? <div className="head">{head}</div>
                : null
              }
              <div className="date">{date}</div>
              <div className="msg">
                <span dangerouslySetInnerHTML={msg} />
              </div>
           </li>);

  }  
});

var FeedItem = /*lookup('env').debugMode ? FeedItemDebug : */ FeedItemPretty;

var Feed = React.createClass({

  mixins: [ModelTracker],

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var u = this.props.store.model.queryParams.user;
    if( u ) {
      api.feed.markAsSeen(u).then( () => this.props.store.emit(events.FEED_SEEN) );
    }
  },

  stateFromStore(store) {
    return {store};
  },

  render() {
    var cls = 'user-feed container-fluid ' + this.props.className;
    var store = this.state.store;
    return (
      <div className={cls}>
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <InlineCSS css={css} id="feed-css" />
            <ul className="user-feed-items">
            {store.model.items.map( (item,i) => <FeedItem key={i} owner={store.model.queryParams.user} model={item} /> )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

Feed.__supress_lint_warning = FeedItemDebug;

module.exports = Feed;

//
