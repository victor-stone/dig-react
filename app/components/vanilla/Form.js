import React         from 'react';
import { selectors } from '../../unicorns';

function FormItem(props) {
  const { cls = 'col-md-12', sz = null } = props;
  const grpCls = selectors('input-group', sz === null ? '' : 'input-group-' + sz );
  return (
      <div className="form-group">
        <div className={cls}>
          <div className={grpCls}>
            <span className="input-group-addon">{props.title}</span>
            {props.wrap
              ? <span className="form-control initial-height">{props.children}</span>
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