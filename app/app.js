import React             from 'react';
import router            from './services/router';
import { service as 
           ajaxAdapter } from './services/queryAjaxAdapter';
import { Header, 
         Footer, 
         Banner,
         TitleSetter,
         AudioPlayer }   from './components';

import routes from './routes';

var rewriteRules = [
  { regex: new RegExp(/^\/free_music/),                now: '/free' },
  { regex: new RegExp(/^\/music_for_film_and_video/),  now: '/film' },
  { regex: new RegExp(/^\/podcast_music/),             now: '/free'}
];

router.addRoutes( routes, rewriteRules );

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
    var title = this.state.component && this.state.component.title;

    return (
      <div>
        <div id="wrap">
          <TitleSetter title={title} />
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

