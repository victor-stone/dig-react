//import { * } from './unicorns'
import React             from 'react';
import router            from './services/router';
import { service as 
           ajaxAdapter } from './services/queryAjaxAdapter';
import { Header, 
         Footer, 
         Banner,
         AudioPlayer }   from './components';

//         <GoogleAnalytics id="UA-2878955-3" />

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
        router.navigateTo(); // current url
      }
    }
  },

  componentDidMount: function() {
    this.scrollToHash();
  },

  componentDidUpdate: function() {
    this.scrollToHash();
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
    this.setState( { loading } ); 
  },

  scrollToHash: function() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }

    var hash = this.state.hash;
    if( !hash ) {
      return;
    }

    try {  
      /* global $ */
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

    var cls = 'outlet-wrap' + (this.state.loading ? ' loading-screen fade' : '');

    return (
      <div>
        <div id="wrap">
          <Banner />
          <Header />
          <div className={cls}>
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
        <Footer />
        <AudioPlayer />
      </div>
    );
  },
});


module.exports = App;

