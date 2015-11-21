/* global $ */
import React       from 'react';
import ajaxAdapter from './services/query-ajax-adapter';
import router      from './services/router';
import { Banner,
         TitleSetter,
         AudioPlayer }   from './components';

const App = React.createClass({

  getInitialState: function() {
    return { component: null };
  },

  componentWillMount: function() {
    if( global.IS_SERVER_REQUEST ) {
      this.setState(this.props);
    } else {

      ajaxAdapter.on( 'loading',    this.onLoading );
      router     .on( 'navigateTo', this.onNavigate );

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
      ajaxAdapter.removeListener( 'loading',    this.onLoading );
      router     .removeListener( 'navigateTo', this.onNavigate );
    }
  },

  onNavigate: function(specs) {
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

