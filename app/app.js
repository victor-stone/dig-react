/* global $ */
import React       from 'react';
import ajaxAdapter from './services/query-ajax-adapter';
import router      from './services/router';
import events      from './models/events';
import { Banner,
         TitleSetter,
         ErrorDisplay,
         AudioPlayer }   from './components';

const App = React.createClass({

  getInitialState: function() {
    return { component: null };
  },

  componentWillMount: function() {
    if( global.IS_SERVER_REQUEST ) {
      this.setState(this.props);
    } else {

      ajaxAdapter.on( events.LOADING,     this.onLoading );
      router     .on( events.NAVIGATE_TO, this.onNavigateTo );

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
    this.setState( specs );
  },

  onLoading: function(loading) {
    $('.outlet-wrap').toggleClass('loading-screen fade',loading);
  },

  postUpdate() {
    if( !global.IS_SERVER_REQUEST ) {
      this.scrollToHash();
    }
  },

  scrollToHash: function() {

    var hash = this.state.hash;
    if( !hash ) {
      return;
    }

    try {  
      hash = hash.replace(/#/,'');
      var anchor = $('a[name="'+hash+'"]');
      var offset = 0; 
      $('html,body').animate(
          { scrollTop: $(anchor).offset().top - offset },
          { duration: 'slow', 
            easing: 'swing'
          }
        );
    }
    catch( e ) {
      //Ember.debug('wups ' + e.toString() );
    }      
  },

  render: function() {

    var title = this.state.component && this.state.component.title;
    var header = React.createElement(this.props.header);
    var footer = React.createElement(this.props.footer);
    return (
      <div>
        <div id="wrap">
          <TitleSetter title={title} />
          <Banner />
          {header}
          <ErrorDisplay />
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

