import React            from 'react';
import LoginPopup       from '../../components/ccmixter/Login';

var login = React.createClass({

  render() {
    return ( <LoginPopup /> );
  }  
});

login.title = 'Login';


module.exports = login;

