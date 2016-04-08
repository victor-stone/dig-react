import React            from 'react';
import { ModelTracker } from '../../mixins';
import {  ActionButtons,
          InlineCSS,
          Paging,
          CollapsingText,
          Form   }        from '../../components';

import { RemixContainer } from '../Remixes';
import Remix            from './Remix';
import css              from './Style.js';

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
        </div>
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
      </HorizontalForm>
      );
  }
});

function Remixes(props) {
  return (
    <div className="remix-page">
      <RemixContainer {...props} remixLine={Remix} />
    </div>
  );
}

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
    
    return  (
      <div className="people container-fluid">
        <InlineCSS css={css.People} id="people"/>
        <InlineCSS css={css.Remix}  id="remix"/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <Header store={store} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-md-offset-1">
            <Overview store={store} />
          </div>
          <div className="col-md-6">
            <Remixes store={store} skipUser />
            <Paging store={store} disableBumping />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = People;

