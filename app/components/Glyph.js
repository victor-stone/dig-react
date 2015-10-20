import React from 'react';

const Glyph = React.createClass({

  render() {
    var cls = "fa fa-" + this.props.icon;
    if( this.props.pulse ) {
      cls += " fa-pulse";
    }
    if( this.props.fixed ) {
      cls += " fa-fw";
    }
    if( this.props.x2 ) {
      cls += " fa-2x";
    }
    return  (
      <i className={cls}></i>
    );
  },

});

module.exports = Glyph;