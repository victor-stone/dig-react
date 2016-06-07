import React            from 'react';
import ReactDOM         from 'react-dom';
import api              from '../../services/ccmixter';
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
    api.user.ogin(this.refs['login-name'].value,this.refs['password'].value)
      .then( result => {
        if( result['status'] === 'ok') {
          /* globals $ */
          var d = $(ReactDOM.findDOMNode(this));
          d.modal('hide');
          lookup('env').alert('success', 'logged in');
        } else {
          this.setState( { error: result['status'] } );
        }
      });
  },

  onCancel() {
    if( this.props.onCancel ) {
      this.props.onCancel();
    }

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
          {this.state.error
            ? <Alert type="danger" text={this.state.error} />
            : null
          }
          <div className="form-group">
              <label htmlFor="login-name">{"login name"}</label>
              <input type="email" className="form-control" ref="login-name" placeholder="login name" />
          </div>
          <div className="form-group">
              <label htmlFor="password">{"password"}</label>
              <input type="password" className="form-control" ref="password" placeholder="password" />
          </div>
      </Modal>
      );
  }  
});


module.exports = Login;

