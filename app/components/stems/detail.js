import React               from 'react';
import LinkToRemixTree     from '../services/link-to-remix-tree';
import { TagString }       from '../../unicorns';
import css                 from './style/detail';

import { BoundSelectableTagList } from '../bound/tags';
import { StaticTagsList }         from '../models/tags';

/*
  So this is a little weird because of how it is 
  used.

  The 'model' represents the stems upload, we want to
  display its tags.

  The 'store' represents a Collection store that has been
  filtered by a set of tags that the model belongs to.

  When displaying the details, the filtering tags will be
  'checked' and the other ones will be unchecked.

  When the user toggles a check, that will send that 
  info to the Collection store and it will trigger a 
  new query.

*/
class StemsDetail extends React.Component
{
  render() {
    const { 
            store, // this has selected tags in it
            model  // this is the upload we're displaying details for
          } = this.props;
    
    // TODO: these tags used to be filtered by genre/instrument

    const userTags = new TagString(model.userTags);

    return (
      <div className="stems-detail">
        {store
          ? <BoundSelectableTagList glyphs="checks" floating model={userTags} store={store} />
          : <StaticTagsList floating model={userTags} />
        }
        <LinkToRemixTree model={model} />
      </div>
    );
  }
}

StemsDetail.css = css;

module.exports = StemsDetail;
