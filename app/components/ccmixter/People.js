import React   from 'react';
import Gallery from './Gallery';
import css     from './style/people';

import { TagString } from '../../unicorns';

import {  ModelTracker,
          CurrentUserTracker } from '../../mixins';

import {  ActionButtons,
          InlineCSS,
          Glyph,
          Link,
          CollapsingText,
          Form   }        from '../../components';

var ExternalLink   = ActionButtons.ExternalLink;
var HorizontalForm = Form.HorizontalForm;
var FormItem       = Form.FormItem;

var Description = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    var model = store.model.artist;
    return { html: model.descriptionHTML };
  },

  render() {
    return (<CollapsingText html={this.state.html} />);
  }

});

const Header = React.createClass({

  render: function() {
    var a = this.props.store.model.artist;
    return(
        <div className="people-head">
          <img className="img-circle" src={a.avatarURL} /> 
          <h3>{a.name}</h3>
          <Description store={this.props.store} />
          <div className="clearfix" />
          <Overview store={this.props.store} />
        </div>
    );
  }
});

const Overview = React.createClass({
  
  mixins: [CurrentUserTracker],

  stateFromUser(user,props) {
    var state = { user };
    if( user ) {
      var a = props.store.model.artist;
      state.isSelf = a.id === user.id;
      if( !state.isSelf ) {
        state.following = user.followsIDs.contains(a.id);
        state.followingText = state.following ? 'following' : 'follow';
        state.followingIcon = state.following ? 'check-square-o' : 'square-o';
      }
    }
    return state;
  },

  followUnfollow(e) {
    e.preventDefault();
    var state = {};
    state.following = !this.state.following;
    state.followingText = state.following ? 'following' : 'follow';
    state.followingIcon = state.following ? 'check-square-o' : 'square-o';
    this.setState( state );
  },

  render() {
    var a = this.props.store.model.artist;
    return (
      <HorizontalForm>
          <FormItem title="member since" wrap>{a.joined}</FormItem>
          {a.homepage
            ? <FormItem title="homepage" wrap><ExternalLink href={a.homepage} text={a.name} /></FormItem>
            : null
          }
          <FormItem title="follows" wrap>
            {a.follows.map( (u,i) => <Link key={i} className="follows" href={u.url}>{u.name}</Link>)}
            {this.state.user && !this.state.isSelf
              ? <button className="btn btn-sm follows" onClick={this.followUnfollow}>
                  <Glyph icon={this.state.followingIcon} />
                  {' ' + this.state.followingText}
                </button>
              : null
            }
          </FormItem>
      </HorizontalForm>
      );
  }
});

const UPLOAD_FILTER = /(remix|editorial_pick|sample|acappella)/;

var People = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { store };
  },

  render() {
    var store  = this.state.store;

    if( store.error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    var showHeader = !TagString.filter(store.model.queryParams.reqtags, UPLOAD_FILTER).getLength();

    return  (
      <div className="people container-fluid">
        <InlineCSS css={css} id="people"/>        
        {showHeader
          ? <div className="row"><div className="col-md-8 col-md-offset-2"><Header store={store} /></div></div>
          : <h2 className="center-text">{this.state.store.model.artist.name}</h2>
        }
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <Gallery store={store} skipUser />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = People;

