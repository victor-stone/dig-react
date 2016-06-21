import React from 'react';
import Glyph from './vanilla/Glyph';

var MoreOrLessLink = React.createClass({

  getInitialState() {
    return { showLess: this.props.less };
  },

  componentWillReceiveProps(nextProps) {
    this.setState( { showLess: nextProps.less } );
  },

  render() {
    var icon = this.state.showLess ? 'chevron-left' : 'chevron-right';
    return (
        <a className="more-or-less-link" 
           data-toggle="collapse" 
           href={'#' + this.props.targetId}
        ><Glyph icon={icon} /><Glyph icon={icon} /><Glyph icon={icon} /></a>
      );
  }

});


module.exports = MoreOrLessLink;

//