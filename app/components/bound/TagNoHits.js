import React            from 'react';

import { TagString }    from '../../unicorns';

import ResetButton      from '../filters/Reset';

import { ModelTracker } from '../../mixins';

import Glyph            from '../vanilla/Glyph';
import { Row,
         Column }       from '../vanilla/Grid';

class NoTagHits extends ModelTracker(React.Component)
{
  stateFromStore(store) {
    const { total, queryParams:{tags,type} } = store.model;

    var optionsDirty = store.paramsDirty();
    var showNoHits   = !total;
    var numTags      = (new TagString(tags)).getLength();
    var showMatchAny = type === 'all' && numTags > 1;
    return { optionsDirty, showNoHits, showMatchAny };
  }

  render() {
    const { showNoHits, optionsDirty, showMatchAny } = this.state;

    if( !showNoHits ) {
      return null;
    }

    var store = this.props.store;

    return (
      <Row>
        <Column cols="6" offset="3" className="no-hit-suggestion">
          <div className="jumbotron empty-query">
            <h3>{"wups, no matches for that combination of tags..."}</h3>
              <ul>
                <li>
                  {"Try removing tags by clicking on the tags marked "}<Glyph icon="times-circle" />
                </li>
                {showMatchAny &&
                   <li>
                    {"You've selected a search for music that matches "}<strong>{"all"}</strong>{" the tags. "}
                    {"Try a search for "}<strong>{"any"}</strong>{" combination of tags by unchecking the 'all' button."}
                  </li>
                }
                {optionsDirty && <li>{"Try resetting your filters "}<ResetButton store={store} /></li>}
              </ul>
          </div>
        </Column>
      </Row>
      );
  }
}

module.exports = NoTagHits;

//