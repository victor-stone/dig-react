import React         from 'react';
import Glyph         from './Glyph'; 
import Paging        from './Paging'; 
import Tags          from './Tags';
import DigRemixes    from './DigRemixes';
import events        from '../models/events';

const TagCategoryRow = React.createClass({

  render: function() {
    var catNames   = Object.keys(this.props.model);
    var categories = this.props.model;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm">
        </div>{catNames.map( n => <Tags.TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}</div>
      );
  },
  
});

const SelectedTagRow = React.createClass({

  render: function() {
    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-2 tags editable">
            <Tags.SelectedTags {...this.props}/>
          </div>   
          <div className="col-md-2 whaaaaaat">
          </div>
        </div>
      );
  },

});

const TagsLoading = React.createClass({

  render: function() {
    return(
      <h4 className="center-text">{"Loading Tags "}<Glyph icon="spinner" pulse /></h4>
      );
  }
});

const RemixTagSelectionSection = React.createClass({

  getInitialState: function() {
    return { loading: true,
             model: {},
            };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.remixCategories().then( cats => {
        this.setState( {
          model: cats,
          loading: false });
      });
    }
  },

  componentDidUpdate: function() {
    this.props.store.emit( events.COMPONENT_UPDATE );
  },

  render: function() {

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


var DigDeep = React.createClass({

  render() {

    var store = this.props.store;

    return (
      <div>
        <RemixTagSelectionSection store={store}  />
        <Paging store={store} ref="paging"/>
        <DigRemixes store={store} />   
        <Tags.NoTagHits store={store}  />     
      </div>
    );
  }

});

module.exports = DigDeep;

