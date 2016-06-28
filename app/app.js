/* global $ */
import React       from 'react';
import ajaxAdapter from './services/query-ajax-adapter';
import router      from './services/router';
import env         from './services/env';
import events      from './models/events';

import { browserScripts } from './unicorns';
import Banner             from './components/Banner';
import AudioPlayer        from './components/AudioPlayer';

import TitleSetter  from './components/vanilla/TitleSetter';
import ErrorDisplay from './components/services/ErrorDisplay';
import Modal        from './components/services/Modal';
import Alert        from './components/services/Alert';

const App = React.createClass({

  getInitialState() {
    return { component: null };
  },

  componentWillMount() {
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

  componentDidMount() {
    this.postUpdate();
  },

  componentDidUpdate() {
    this.postUpdate();
  },

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.removeListener( events.LOADING,     this.onLoading );
      router     .removeListener( events.NAVIGATE_TO, this.onNavigateTo );
    }
  },

  onNavigateTo(specs) {
    this.setState( specs, this.onNavigateToThis );
  },

  onNavigateToThis() {
    if( !this.state.hash ) {
      if( !env.disableAutoScroll ) {
        browserScripts.scrollToTop();
      }
    }
  },

  onLoading(loading) {
    $('.outlet-wrap').toggleClass('loading-screen fade',loading);
  },

  onAppAlert(alertType,alert) {
    this.setState( { alertType, alert } );
  },

  onAlertClosed() {
    this.setState( { alert: null } );
  },

  postUpdate() {
    if( !global.IS_SERVER_REQUEST ) {
      this.scrollToHash();
    }
  },

  scrollToHash() {

    var hash = this.state.hash;
    if( hash ) {
      browserScripts.scrollToHash(hash);
    }

  },

  render() {

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

    return (
      <div>
        <Modal.Container />
        <div id="wrap">
          <TitleSetter title={comp && comp.title} />
          <Banner />
          {this.state.header}
          {subnav}
          <ErrorDisplay />
          {this.state.alert && <Alert type={this.state.alertType} text={this.state.alert} className="system-alert" onClose={this.onAlertClosed}/>}
          <div className="outlet-wrap">{elem}</div>
        </div>
        {this.state.footer}
        <AudioPlayer />
      </div>
    );
  },
});


module.exports = App;

