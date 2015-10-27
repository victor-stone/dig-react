import React    from 'react';
import ReactDOM from 'react-dom';
import Glyph    from './Glyph';
import { CloseButton } from './ActionButtons';

let Modal = React.createClass({

  propTypes: {
    handleHideModal: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    /* globals $ */
    var d = $(ReactDOM.findDOMNode(this));
    d.modal('show');
    d.on('hidden.bs.modal', this.props.handleHideModal);
  },

  render(){
    var title    = this.props.title;
    var subTitle = this.props.subTitle;
    var action   = this.props.action;

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
            <CloseButton className="close" data-dismiss="modal" />
            <h4 className="modal-title"><span className="light-color">{subTitle}</span> {title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{"Close"}</button>
            {action 
              ? <button className="btn btn-primary btn-success" onClick={action}><Glyph icon="share" />{" Submit"}</button>
              : null
            }
          </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Modal;