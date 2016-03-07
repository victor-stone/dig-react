import React      from 'react';
import Glyph      from './Glyph';

var AccordianPanel = React.createClass({
  render() {
    var id = this.props.id;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
              <Glyph icon={this.props.icon} />
              {" "}
              <a data-toggle="collapse" data-parent="#accordion" href={'#' + id}>{this.props.title}</a>
            </h4>
         </div>
        <div id={id} className="panel-collapse collapse">
          <div className="panel-body">
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