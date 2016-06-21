import React    from 'react';
import events   from '../models/events';
import env      from '../services/env';
import Modal    from '../vanilla/Modal';

const ModalContainer = React.createClass({

  getInitialState() {
    return { modalComponent: null };
  },

  componentDidMount() {
    env.on(events.REQUEST_MODAL,this.onRequest);
  },

  componentWillUnmount() {
    env.removeListener(events.REQUEST_MODAL,this.onRequest);    
  },

  onRequest(comp,props) {
    // null 'comp' means Modal was closed 
    this.setState( { modalComponent: comp, 
                     componentProps: props } );
  },

  render() { 
    return(
        <div id="modal-container">
          {this.state.modalComponent
            ? React.createElement(this.state.modalComponent,this.state.componentProps)
            : null
          }
        </div>
      );
  }
});

Modal.Popup.show = function(comp,props) {
  env.showPopup(comp,props);
};

Modal.Popup.hide = function() {
  env.emit(events.REQUEST_MODAL);
};

Modal.Container = ModalContainer;

module.exports = Modal;

//