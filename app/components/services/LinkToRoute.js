import React         from 'react';
import serviceLookup from '../../services';

var Link = React.createClass({
  
  handleClick(e) {
    const { href, host } = this.props;

    if( !host ) {
      e.preventDefault();
      e.stopPropagation();
      if( typeof href === 'string' && href !== '#') {
        Link.navigateTo(href);
      }
    }
    return true;
  },

  render() {
    const { text, children } = this.props;

    return (
      <a {...this.props} onClick={this.handleClick} >
       {text}{children}
      </a>
    );
  }
});

Link.navigateTo = function(path) {
  var router = serviceLookup('router');
  router.navigateTo( path );  
};

module.exports = Link;

