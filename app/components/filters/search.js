import React       from 'react';
import Filter      from '../../models/filters/search';
import Input       from '../properties/controls/input';

class SearchFilter extends React.Component
{

  render() {
    return (<Input.Expando 
              icon="search" 
              withDone 
              {...this.props} 
              Property={Filter} 
            />);    
  }
}

module.exports = SearchFilter;
