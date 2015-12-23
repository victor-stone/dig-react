/* global $ */
import React       from 'react';
import ajaxAdapter from './services/query-ajax-adapter';
import router      from './services/router';
import env         from './services/env';
import events      from './models/events';

import { browserScripts } from './unicorns';
import { Banner,
         TitleSetter,
         ErrorDisplay,
         AudioPlayer }    from './components';

const App = React.createClass({

  getInitialState: function() {
    return { component: null };
  },

  componentWillMount: function() {
    if( global.IS_SERVER_REQUEST ) {
      this.setState(this.props);
    } else {

      ajaxAdapter.on( events.LOADING,          this.onLoading );
      router     .on( events.NAVIGATE_TO,      this.onNavigateTo );
      router     .on( events.NAVIGATE_TO_THIS, this.onNavigateToThis );
      env        .on( events.APP_MSG,          this.onAppMessage );

      if( !this.state.component ) {
        router.updateURL();
      }
    }
  },

  componentDidMount: function() {
    this.postUpdate();
  },

  componentDidUpdate: function() {
    this.postUpdate();
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.removeListener( events.LOADING,     this.onLoading );
      router     .removeListener( events.NAVIGATE_TO, this.onNavigateTo );
    }
  },

  onNavigateTo: function(specs) {
    this.setState( specs, this.onNavigateToThis );
  },

  onNavigateToThis: function() {
    if( !this.state.hash ) {
      if( !env.disableAutoScroll ) {
        browserScripts.scrollToTop();
      }
    }
  },

  onLoading: function(loading) {
    $('.outlet-wrap').toggleClass('loading-screen fade',loading);
  },

  onAppMessage: function(msg) {
    this.setState( { message: msg } );
  },

  postUpdate() {
    if( !global.IS_SERVER_REQUEST ) {
      this.scrollToHash();
    }
  },

  scrollToHash: function() {

    var hash = this.state.hash;
    if( hash ) {
      browserScripts.scrollToHash(hash);
    }

  },

  render: function() {

    var title = this.state.component && this.state.component.title;
    var header = React.createElement(this.props.header);
    var footer = React.createElement(this.props.footer);
    var msg    = this.state.msg ? React.createElement(this.state.msg) : null;
    return (
      <div>
        <div id="wrap">
          <TitleSetter title={title} />
          <Banner />
          {header}
          <ErrorDisplay />
          {msg}
          <div className="outlet-wrap">
            {this.state.component
              ? React.createElement(this.state.component,
                {
                    store: this.state.store,
                    params: this.state.params,
                    queryParams: this.state.queryParams
                })
              : null
            }
          </div>
        </div>
        {footer}
        <AudioPlayer />
      </div>
    );
  },
});


module.exports = App;

