/* globals $*/
import React      from 'react';
import Glyph      from './Glyph';

var AccordianButton = React.createClass({

  getInitialState() {
    return { open: this.props.open };
  },

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }

    this.setUpEvents();
  },

  setUpEvents() {
    $('#' + this.props.id)
      .on('show.bs.collapse', () => this.setState( { open: true  } ))
      .on('hide.bs.collapse', () => this.setState( { open: false } ));
  },

  render() {
    var style = { float: 'right', display: 'block' };
    var icon  = this.state.open ? 'caret-down' : 'caret-up';

    return(
        <a style={style} data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.id}>
          <Glyph icon={icon} />
        </a>
      );
  }
});

var AccordianPanel = React.createClass({
  render() {
    var clsIn = this.props.open ? ' in' : '';
    var id = this.props.id;
    var clsChild = (this.props.className || '') + ' panel-body';    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
              <AccordianButton id={id}  open={this.props.open} />
              <Glyph icon={this.props.icon} />
              {" "}
              <a data-toggle="collapse" data-parent="#accordion" href={'#' + id}>{this.props.title}</a>
            </h4>
         </div>
        <div id={id} className={'panel-collapse collapse' + clsIn} >
          <div className={clsChild}>
            {this.props.children}
          </div>
        </div>
      </div>   
      );
  }
});

var Accordian = React.createClass({
  render() {
    return (
      <div id="accordion" className="panel-group">
        {this.props.children}
      </div>
    );
    }
});

module.exports = {
  AccordianPanel,
  Accordian
};

//