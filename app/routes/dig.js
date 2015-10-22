import React from 'react';
import { Glyph } from '../components';

// hmmm
import { service as tagStore } from '../stores/tags';

import { service as query } from '../stores/query';

const SelecctableTag = React.createClass({

  getInitialState: function() {
    return { selected: flase };
  },

  onClick: function() {
    this.setState( { selected: !this.state.selected });
  },

  render: function() {
    var tag = this.props.model;
    var icon = this.state.selected ? "check-square-o" : "square-o";

    return (
        <li onClick={this.onClick}><Glyph icon={icon} /> {tag.name} <span className="light-color">({tag.count})</span></li>
      )
  }
}


const SelectableTagList = React.createClass({

  render: function() {
    var catId  = this.props.catId;
    var id     = catId + '_tags';
    var tags   = this.props.model;
    var lines  = 
    return (
        <ul className="tags-list" id={id}>
        ( tags.map( tag => <SelecctableTag key={tag} model={tag} catId={catId} /> ) )
        </ul>
      );
  }
});

const TagCategoryBox = React.createClass({

  render: function() {
    var name    = this.props.name;
    var tags    = this.props.model;
    var catId   = this.props.catId;
    var colSize = this.props.colSize || 3;
    var cls     = "col-sm-" + colSize;
    return(
      <div className={cls}>
          <h4 className="center-text">{name}</h4>
          <SelectableTagList model={tags} catId={catId} />
      </div>
    );
  }
}),

const SelectedTags = React.createClass({

  getInitialState: function() {
    return { 
      selectedTags: [], 
      matchAnyTags: false
    }
  },

  remove: function(e) {

  },

  clear: function(e) {

  },

  render: function() {
    var selectedTags = this.state.selectedTags;
    var matchAnyTags = this.state.matchAnyTags;

    var enoughForMatchAny = selectedTags.length > 1;

    return( 
        <div>
          { selectedTags.map( t => <a key={t} 
                                      href='#' 
                                      onClick={this.remove} 
                                      className="btn-exp btn-tag"><Glyph x2 icon="times-circle" /> <span>{t.id}</span></a> )
          }
          { selectedTags.length ?
              <a  href="#" 
                  onClick={this.clear} 
                  className="btn btn-xs btn-danger"><Glyph icon="trash" /> clear</a>
              : null }
          }     
          { enoughForMatchAny ?
            <label className="btn btn-primary btn-xs"><input type="checkbox" checked={matchAnyTags} /> match any</label>
            : null 
          }
        </div>
      );
  }
});

const TagCategoryRow = React.createClass({

  render: function() {
    var catNames   = this.props.model.categoryNames;
    var categories = this.props.model.categories;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm">
        </div>
        ( catNames.map( n => <TagCategoryBox model={categories[n]} catId={n} key={n} /> ) )
      </div>
      );
  },
  
}),

const SelectedTagRow = React.createClass({

  render: function() {
    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-2 tags editable">
            <SelectedTags {...this.props}/>
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
      <h4 className="center-text">Loading Tags <Glyph icon="spinner" pulse /></h4>
      );
  }
});

const RemixTagSelectionSection = React.createClass({

  getInitialState: function() {
    return { loading: true }
  },

  componentWillMount: function() {
    tagStore.remixCategories( cats => {
      this.setState( {
        categories: cats,
        categoryNames: tagStore.remixCategoryNames,
        loading: false
      })
    });
  },

  render: function() {

    return (
        <div className="page-header">
          <div className="container">
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <TagCategoryRow categories={this.state.categories} categoryNames={this.state.categoryNames} />
                    <SelectedTagRow />
                  </div>
            }
          </div>
        </div>
      );
  }
});

const dig = React.createClass({

  render() {

    var model    = this.props.model;
    var offset   = this.props.queryParams.offset || 0;
    var limit    = this.props.queryParams.limit  || 10;

    return  (
      <div>
        <RemixTagSelectionSection />
        <Paging offset={offset}
                length={model.playlist.length}
                limit ={limit}
                total ={model.total} />
        <Playlist model={model} />        
      </div>
    );
  },

});

module.model = function() {
  var qparams = oassign( {}, qc.default, queryParams||{} );
  return query.playlistWithCount(qparams);
}

module.exports = dig;

