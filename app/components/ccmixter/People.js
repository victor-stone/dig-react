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

const FollowButton = React.createClass({

  mixins: [CurrentUserTracker],

  stateFromUser(user) {
    var otherId = this.props.model.id;
    if( user && otherId !== user.id ) {
      return { show: true, 
               toggle: user.following.findBy( 'id', otherId ) !== null,
               follower: user.id,
               followee: otherId };
    }
    return { show: false };
  },

  toggleFollow(e) {
    e.stopPropagation();
    e.preventDefault();    
    this.setState( { toggle: !this.state.toggle } );
  },

  render() {
    if( !this.state.show ) {
      return null;
    }
    return (
      <button className="btn btn-sm follows" onClick={this.toggleFollow}>
          <Glyph icon={this.state.toggle ? 'check-square-o' : 'square-o'} />
          {' ' + (this.state.toggle ? 'following' : 'follow')}
      </button>
    );
  }

});

const Followers = React.createClass({

  render() {
    return (
      this.props.model.length
        ? <FormItem title={this.props.title} wrap>
            {this.props.model.map( (u,i) => <Link key={i} className="follows" href={u.url}>{u.name}</Link>)}
          </FormItem>
        : null 
      );
  }
});

const Overview = React.createClass({
  
  render() {
    var a = this.props.store.model.artist;
    return (
      <HorizontalForm>
          <FormItem title="member since" wrap>{a.joined}</FormItem>
          {a.homepage
            ? <FormItem title="homepage" wrap><ExternalLink href={a.homepage} text={a.name} /></FormItem>
            : null
          }
          <Followers model={a.following} title="follows" />
          <Followers model={a.followers} title="followers" />
          <FollowButton model={a} />
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
    
    var qp = store.model.queryParams;
    var showHeader = !(('offset' in qp) && parseInt(qp.offset) > 0) &&
                     !TagString.filter(qp.reqtags, UPLOAD_FILTER).getLength();

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

