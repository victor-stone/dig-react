import React         from 'react';
import Glyph         from '../vanilla/Glyph'; 
import Tags          from '../Tags';
import Remixes       from '../Remixes';
import QueryOptions  from './QueryOptions';
import events        from '../../models/events';

import { BoundSelectedTagList } from '../bound/Tags';

import css from './style/tags';

const TagCategoryRow = React.createClass({

  render() {
    var catNames   = Object.keys(this.props.model);
    var categories = this.props.model;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm"></div>
        {catNames.map( n => <Tags.TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}
      </div>
      );
  },
  
});

// <Tags.SelectedTags {...this.props}/>

class SelectedTagRow extends React.Component
{
  render() {
    const { store } = this.props;

    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-2 dig-tags">
            <BoundSelectedTagList css={css} x floating autoclear={false} store={store}  />
            <Tags.MatchAllButton store={store} />
          </div>   
          <div className="col-md-2 whaaaaaat">
          </div>
        </div>
      );
  }

}

const TagsLoading = React.createClass({

  render() {
    return(
      <h4 className="center-text">{"Loading Tags "}<Glyph icon="spinner" pulse /></h4>
      );
  }
});

const RemixTagSelectionSection = React.createClass({

  getInitialState() {
    return { loading: true,
             model: {},
            };
  },

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.tagStore.remixCategories().then( cats => {
        this.setState( {
          model: cats,
          loading: false });
      });
    }
  },

  componentDidUpdate() {
    this.props.store.emit( events.COMPONENT_UPDATE );
  },

  render() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = this.state.model;
    var store = this.props.store;

    return (
        <div className="page-header">
          <div className="container">
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <TagCategoryRow store={store} model={model} />
                    <SelectedTagRow store={store}  />
                  </div>
            }
          </div>
        </div>
      );
  }
});


var TagSearch = React.createClass({

  render() {

    var store = this.props.store;

    return (
      <div>
        <RemixTagSelectionSection store={store}  />
        <Remixes store={store}>   
          <QueryOptions store={store} />
        </Remixes>
        <Tags.NoTagHits store={store}  />     
      </div>
    );
  }

});

module.exports = TagSearch;

