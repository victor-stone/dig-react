import React from 'react';
import Glyph        from './Glyph';


var ExternalLink = React.createClass({

  render: function() {
    var subname = this.props.subname || '';
    var text    = this.props.text;
    return(        
        <a {...this.props} target="_blank"><span className="light-color">{subname}</span>{" "}{text}{" "}<Glyph icon="external-link" /></a> 
      );
  }
});

module.exports = ExternalLink;

