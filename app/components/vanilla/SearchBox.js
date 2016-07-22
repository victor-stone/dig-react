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

  _notify(meth,value,filterCallback) {
    const text = cleanSearchString(value);
    text && this.props[meth] && this.props[meth](text,filterCallback);        
  }

  render() {
    return <InputWithIcon icon="search" {...this.props} onEdit={this.onEdit} onDone={this.onDone} />;
  }
}


module.exports = SearchBox;
