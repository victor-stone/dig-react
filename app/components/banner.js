import React    from 'react';
import Topics   from '../stores/topics';
import { trim } from '../unicorns';
import env      from '../services/env';

const Banner = React.createClass({

  getInitialState: function() {
    return { topic: null };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var store = new Topics();
      store.find( env.bannerTopic )
        .then( topic => {
          var hasText = topic.text && (trim(topic.text).length > 0);
          if( hasText ) {
            this.setState( { topic } );
          }
        });
    }
  },

  componentDidMount: function() {
    this.slidemIfYouGotem();
  },

  componentDidUpdate: function() {
    this.slidemIfYouGotem();
  },

  slidemIfYouGotem: function() {
    var ref = this.refs['topic'];
    if( ref ) {
      /* global $ */
      var $e = $(ref);
      if( !$e.is(':visible') ) {
        $(ref).slideDown('slow');
      }
    }
  },

  render: function() {
    var topic = this.state.topic;
    var style = { display: 'none', height: '30px' };
    var html  = topic ? { __html: topic.text } : {};
    /*eslint "react/no-danger":0 */
    return (topic
        ? <div ref="topic" className="page-banner" style={style}><span dangerouslySetInnerHTML={html} /></div>
        : null
      );
  }
});


module.exports = Banner;