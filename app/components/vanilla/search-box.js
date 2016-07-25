import React    from 'react';

import InputWithIcon     from './InputWithIcon';

import { cleanSearchString } from '../../unicorns';

class SearchBox extends React.Component
{
  constructor() {
    super(...arguments);
    this.onDone = this._notify.bind(this,'onDone');
    this.onEdit = this._notify.bind(this,'onEdit');
  }

  _notify(meth,value) {
    const text = cleanSearchString(value);
    text && this.props[meth] && this.props[meth](text);        
  }

  onChange(event) {
    this.onEdit(event.target.value);
  }

  render() {
    return <InputWithIcon icon="search" {...this.props} onChange={this.onChange.bind(this)} onDone={this.onDone} />;
  }
}


module.exports = SearchBox;
