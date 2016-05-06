import React            from 'react';
import CCMixter         from '../../stores/ccmixter';
import lookup           from '../../services';
import Modal            from '../Modal';
import Alert            from '../Alert';

var Login = React.createClass({

  getInitialState() {
    return { error: '',
             show: true };
  },

  onLogin() {
    this.setState( { error: '' } );
    CCMixter.login(this.refs['login-name'].value,this.refs['password'].value)
      .then( result => {
        if( result['status'] === 'ok') {
          lookup('env').alert('success', 'logged in');
          this.setState( { show: false, error: '' } );
        } else {
          this.setState( { error: result['status'] } );
        }
      });
  },

  onCancel() {
    this.setState( {
      error: '',
      show: false
    });
  },

  render() {
    if( !this.state.show ) {
      return null;
    }
    return (
      <Modal action={this.onLogin} handleHideModal={this.onCancel} title="Login" icon="sign-in" buttonText="Login">
          <div className="form-group">
              <label htmlFor="login-name">{"login name"}</label>
              <input type="email" className="form-control" ref="login-name" placeholder="login name" />
          </div>
          <div className="form-group">
              <label htmlFor="password">{"password"}</label>
              <input type="password" className="form-control" ref="password" placeholder="password" />
          </div>
          <div className="checkbox">
              <label><input type="checkbox" /> {"remember me"}</label>
          </div>
          {this.state.error
            ? <Alert type="danger" text={this.state.error} />
            : null
          }
      </Modal>
      );
  }  
});


module.exports = Login;

