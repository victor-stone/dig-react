  /*eslint "react/no-danger":0 */
import React   from 'react';
import Gallery from './Gallery';
import css     from './style/people';
import { Followers,
         FollowButton } from './Follow';

import { TagString } from '../../unicorns';

import {  ModelTracker} from '../../mixins';

import {  ActionButtons,
          InlineCSS,
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
    var html = { __html: a.name };
    return(
        <div className="people-head">
          <img className="img-circle" src={a.avatarURL} /> 
          <h3 dangerouslySetInnerHTML={html} />
          <Description store={this.props.store} />
          <div className="clearfix" />
          <Overview store={this.props.store} />
        </div>
    );
  }
});

const Overview = React.createClass({
  
  render() {
    var a = this.props.store.model.artist;
    var s = this.props.store;
    return (
      <HorizontalForm>
          <FormItem title="member since" wrap>{a.joined}</FormItem>
          {a.homepage
            ? <FormItem title="homepage" wrap><ExternalLink href={a.homepage} text={a.name} /></FormItem>
            : null
          }
          <Followers store={s} followType="following" title="follows" />
          <Followers store={s} followType="followers" title="followers" />
          <FollowButton store={s} />
      </HorizontalForm>
      );
  }
});

const UPLOAD_FILTER = /(remix|editorial_pick|sample|acappella)/;

var PeoplePage = React.createClass({

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

module.exports = PeoplePage;

