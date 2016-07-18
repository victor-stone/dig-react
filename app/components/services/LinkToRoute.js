import React         from 'react';
import serviceLookup from '../../services';

/*
  href        - destination 
  host        - any truthy value that indicates to let the browser handle the link
  onNavigate  - callback will short circuit any action and call back with this.props.model
  text        - prints this text
  {children}  - prints children

  all properties are passed to <a /> DOM element
*/
var Link = React.createClass({
  
  handleClick(e) {
      const { href, host, onNavigate } = this.props;

    if( onNavigate ) {
      e.preventDefault();
      e.stopPropagation();
      onNavigate(this.props.model);      
    } else {
      if( !host ) {
        e.preventDefault();
        e.stopPropagation();
        if( typeof href === 'string' && href !== '#') {
          Link.navigateTo(href);
        }
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

