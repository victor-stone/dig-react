import React            from 'react';
import api              from '../../services/ccmixter';
import Modal            from '../services/Modal';
import Alert            from '../services/Alert';

class Login extends Modal.Popup
{
  constructor() {
    super(...arguments);
    
    this.state = { error: '',
                   name: '',
                   password: '' };

    this.__bindAll(['onLogin','onLoginSuccess','onLoginReject',
                    'onNameChange','onPasswordChange',
                    'shouldDisableSubmit']);
  }

  onLoginSuccess() {
    this.manualClose();
    Alert.show('success', 'logged in');    
  }

  onLoginReject(status) {
    this.setState( { error: status || 'login failed' } );      
  }

  onLogin() {
    this.setState( { error: '' } );
    return api.user.login( this.state.name, this.state.password )
                    .then( this.onLoginSuccess, this.onLoginReject );
  }

  shouldDisableSubmit() {
    return !this.state.name.length || !this.state.password.length;
  }

  onNameChange(e) {
    this.setState( {name:e.target.value});
  }

  onPasswordChange(e) {
    this.setState( {password: e.target.value});
  }

  render() {
    return (
      <Modal action={this.onLogin} 
             title="Login" 
             icon="sign-in" 
             buttonText="Login" 
             submitDisabler={this.shouldDisableSubmit} 
             error={this.state.error}
      >
          <div className="form-group">
              <label htmlFor="login-name">{"login name"}</label>
              <input type="text" className="form-control" onChange={this.onNameChange} placeholder="login name" />
          </div>
          <div className="form-group">
              <label htmlFor="password">{"password"}</label>
              <input type="password" className="form-control" onChange={this.onPasswordChange} placeholder="password" />
          </div>
      </Modal>
      );
  }  
}

module.exports = Login;

