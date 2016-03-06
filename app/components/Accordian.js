import React      from 'react';

var AccordianPanel = React.createClass({
  render() {
    var id = this.props.id;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
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