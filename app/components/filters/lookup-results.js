import React         from 'react';
import LookupFilter  from '../../models/filters/lookup';
import PropertyState from '../properties/mixins/property-state';

import { ModelTracker }   from '../../mixins';

class LookupResults extends ModelTracker(PropertyState(React.Component))
{
  shouldComponentUpdate(nextProps,nextState) {
    return this.state.results !== nextState.results;
  }

  stateFromStore(store) {
    return { results: store.model.items };
  }

  render() {
    const { results } = this.state;

    if( !results || !results.length ) {
      return null;
    }

    const { ListElement } = this.props;

    const props = {
      model: results,
      className: 'lookup-results form-control',
      onSelect: this.props.onSelect
    };

    return <ListElement {...props} />;
  }  
}

LookupResults.defaultProps = {
  Property: LookupFilter
};

LookupResults.propTypes = {
  //ListElement: React.PropTypes.element.isRequired
};

module.exports = LookupResults;

//