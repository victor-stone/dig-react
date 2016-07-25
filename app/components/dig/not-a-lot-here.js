import React              from 'react';
import { ModelTracker }   from '../../mixins';

import ResetOptionsButton  from '../filters/reset';
import { Row,
         FluidContainer,
         Column }     from '../vanilla/grid';

const MIN_LIMIT = 10;

class NotALotHere extends ModelTracker(React.Component)
{

  stateFromStore(store) {
    var model = store.model;
    var showNotALot = model.total < MIN_LIMIT && store.paramsDirty();
    return { showNotALot };    
  }

  render() {

    if( !this.state.showNotALot ) {
      return null;
    }

    return (
      <FluidContainer className="no-hit-suggestion">
          <Row>
            <Column cols="6" offset="3">
              <div className="jumbotron empty-query">
                <h3>{"eh, not a lot here..."}</h3>
                  <ul>
                      <li>
                          {"You might consider resetting the options "}
                          <ResetOptionsButton store={this.props.store} />
                      </li>
                  </ul>
              </div>
            </Column>
          </Row>
        </FluidContainer>
      );
  }
}

module.exports = NotALotHere;

