import React         from 'react';
import Glyph         from '../vanilla/Glyph';
import { TagString } from '../../unicorns';
// TODO: Move resetoptions button
import QueryOptions  from '../QueryOptions';
import { ModelTracker } from '../../mixins';

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
      <div className="row">
        <div className="col-md-6 col-md-offset-3 no-hit-suggestion">
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
                {optionsDirty && <li>{"Try resetting your filters "}<QueryOptions.ResetOptionsButton store={store} /></li>}
              </ul>
          </div>
        </div>
      </div>
      );
  }
}

module.exports = NoTagHits;

//