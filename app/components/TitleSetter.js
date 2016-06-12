import React from 'react';

const TitleSetter = React.createClass({

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST && this.props.title ) {
      this.setState( { title: this.props.title } );
    }
  },

  componentWillReceiveProps(props) {
    this.setState( { title: props.title } );
  },

  render: function() { 
    /* globals $ */
    if( !global.IS_SERVER_REQUEST && this.props.title ) {
      $('head').find('title').text(this.state.title);
    }    
    return null; 
  }
});

module.exports = TitleSetter;