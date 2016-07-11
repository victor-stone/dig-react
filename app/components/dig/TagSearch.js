import React         from 'react';
import Remixes       from './Remixes';
import QueryOptions  from './QueryOptions';

import AjaxLoadingGlyph from '../services/AjaxLoadingGlyph';

import { BoundSelectedTagList } from '../bound/Tags';

import TagCategoryBox from './tags/TagCategoryBox';
import MatchAllButton from '../bound/TagsMatchAllButton';
import TagNoHits      from '../bound/TagNoHits';

import css from './style/tags';

class TagCategoryRow extends React.Component
{
  render() {
    var catNames   = Object.keys(this.props.model);
    var categories = this.props.model;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm"></div>
        {catNames.map( n => <TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}
      </div>
      );
  }
}

class SelectedTagRow extends React.Component
{
  render() {
    const { store } = this.props;

    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-2 dig-tags">
            <BoundSelectedTagList css={css} x floating autoclear={false} store={store}  />
            <MatchAllButton store={store} />
          </div>   
          <div className="col-md-2 whaaaaaat">
          </div>
        </div>
      );
  }

}

class RemixTagSelectionSection extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { loading: true, model: {} };
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.tagStore.remixCategories().then( cats => {
        this.setState( {
          model: cats,
          loading: false });
      });
    }
  }

  render() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    const { loading, model } = this.state;
    
    var store = this.props.store;

    return (
        <div className="page-header">
          <div className="container">
            {
              loading 
                ? <AjaxLoadingGlyph />
                : <div>
                    <TagCategoryRow store={store} model={model} />
                    <SelectedTagRow store={store}  />
                  </div>
            }
          </div>
        </div>
      );
  }
}


var TagSearch = React.createClass({

  render() {

    var store = this.props.store;

    return (
      <div>
        <RemixTagSelectionSection store={store}  />
        <Remixes store={store}>   
          <QueryOptions store={store} />
        </Remixes>
        <TagNoHits store={store}  />     
      </div>
    );
  }

});

module.exports = TagSearch;

