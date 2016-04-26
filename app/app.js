/* global $ */
import React       from 'react';
import ajaxAdapter from './services/query-ajax-adapter';
import router      from './services/router';
import env         from './services/env';
import events      from './models/events';

import { browserScripts } from './unicorns';
import { Banner,
         TitleSetter,
         Alert,
         ErrorDisplay,
         AudioPlayer }    from './components';

const App = React.createClass({

  getInitialState: function() {
    return { component: null };
  },

  componentWillMount: function() {
    function createDressing() {
      this.setState( {
        header: React.createElement(this.props.header),
        footer: React.createElement(this.props.footer),
      });
    }
    if( global.IS_SERVER_REQUEST ) {
      this.setState(this.props, () => createDressing );
    } else {

      ajaxAdapter.on( events.LOADING,          this.onLoading );
      router     .on( events.NAVIGATE_TO,      this.onNavigateTo );
      router     .on( events.NAVIGATE_TO_THIS, this.onNavigateToThis );
      env        .on( events.APP_ALERT,        this.onAppAlert );

      createDressing.bind(this)();

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

  onAppAlert: function(alertType,alert) {
    this.setState( { alertType, alert } );
  },

  onAlertClosed: function() {
    this.setState( { alert: null } );
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

    var elem   = null;
    var subnav = null;
    var comp   = this.state.component;
    if( comp  ) {
      elem = React.createElement(comp,
                {
                    store: this.state.store,
                    params: this.state.params,
                    queryParams: this.state.queryParams
                });
      if( comp.selfContained ) {
        return elem;
      }
      if( comp.subnav ) {
        subnav = React.createElement( comp.subnav, { store: this.state.store } );
      }
    }
    var alert = this.state.alert
            ? <Alert type={this.state.alertType} text={this.state.alert} className="system-alert" onClose={this.onAlertClosed}/>
            : null;
    var title  = comp && comp.title;
    return (
      <div>
        <div id="wrap">
          <TitleSetter title={title} />
          <Banner />
          {this.state.header}
          {subnav}
          <ErrorDisplay />
          {alert}
          <div className="outlet-wrap">{elem}</div>
        </div>
        {this.state.footer}
        <AudioPlayer />
      </div>
    );
  },
});


module.exports = App;

