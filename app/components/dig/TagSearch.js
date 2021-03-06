import React         from 'react';
import Remixes       from './Remixes';
import QueryOptions  from './QueryOptions';

import AjaxLoadingGlyph from '../services/AjaxLoadingGlyph';

import { BoundSelectedTagList } from '../bound/Tags';

import TagCategoryBox from './tags/TagCategoryBox';
import MatchAllButton from '../filters/MatchAll';
import TagNoHits      from '../bound/TagNoHits';
import { Row,
         Column }     from '../vanilla/Grid';

import css from './style/tags';

class TagCategoryRow extends React.Component
{
  render() {
    var catNames   = Object.keys(this.props.model);
    var categories = this.props.model;
    var store      = this.props.store;

    return (
      <Row>
        <Column cols="1" className="hmmmm" />
        {catNames.map( n => <TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}
      </Row>
      );
  }
}

class SelectedTagRow extends React.Component
{
  render() {
    const { store } = this.props;

    return (
        <Row>
          <Column cols="8" offset="2" className="dig-tags">
            <BoundSelectedTagList css={css} x floating autoclear={false} store={store}  />
            <MatchAllButton store={store} />
          </Column>
          <Column cols="2" className="what"/>
        </Row>
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

