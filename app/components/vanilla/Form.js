import React       from 'react';

function FormItem(props) {
  var cls = props.cls;
  return (
      <div className="form-group">
        <div className={cls}>
          <div className="input-group">
            <span className="input-group-addon">{props.title}</span>
            {props.wrap
              ? <span className="form-control">{props.children}</span>
              : props.children
            }
            {props.addOn}
          </div>
        </div>
      </div>
    );
}

var HorizontalForm = React.createClass({

  render() {
    return (
      <form className="form-horizontal" {...this.props}>
        {this.props.children}
      </form>
    );
  }
});


module.exports = {
  HorizontalForm,
  FormItem
};

//