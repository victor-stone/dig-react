import React            from 'react';
import Glyph            from '../vanilla/Glyph';
import InlineCSS        from '../vanilla/InlineCSS';
import { TagString }    from '../../unicorns';

/*
  In this context 'static' means non-interactive
  on the page.

  Use cases for displaying static tags

      scenario            query    store
    -------------------  -------  ----------
    = static playlist       x      playlist
    - upload                x      upload

  Uses cases for editing  tags:

      scenario            query    store
    -------------------  -------  ----------
    - stems browsing        ✓      uploads
    - dig tag search        ✓      uploads
    - dynamic playlist      ✓      playlist
    = static playlist       x      playlist
    - upload                x      upload
    - admin                 x      tags

  Complient stores:

    Properties:
      tags [TagString] - read/write
      permissions.canEdit - read only

    Methods:
      toggleTag(tag,toggle)
      clearTags()

    Events source:
      TAGS_SELECTED

  See DelayedCommitTagStore for the minimum API
  required for bound components.

*/

/*
  Props: 
    - model {
              id: 'tag_name'
              count: usage_count (optional)
             }
    - onSelected(model,boolean) [callback] (optional)
    - selected [boolean] (optional)
    - glyph [string-enum]  <-- N.B. singluar
        : none (default)
        : checks
        : x

  className is not settable.
    It will be one of:

      'tag-selectable' 
      'tag-selectable-checks'
      'tag-selectable-x'

    depending on the 'glyphs' property

    The 'tag-selected' selector is added 
    depending on state in all cases

*/
const SelectableTag = React.createClass({

  getInitialState: function() {
    return this.calcState(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.selected !== nextState.selected;
  },

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onSelected(this.props.model.id,!this.state.selected);
  },

  calcState(props) {
    return { selected: props.selected };
  },

  render: function() {
    var props  = this.props;
    var selected = this.state.selected;
    var tag  = props.model;
    var icon = props.glyph === 'checks'
                  ? (selected ? 'check-square-o' : 'square-o')
                  : props.glyph === 'x' 
                    ? 'times-circle'
                    : null;
    var cls = 'tag-selectable';
    if( props.glyph && props.glyph !== 'none' ) {
      cls += ' tag-selectable-' + props.glyph;
    }
    if( selected ) {
      cls += ' tag-selected';
    }

    return (
        <li className={cls} onClick={this.props.onSelected && this.onClick}>
          {icon && tag.id && <Glyph icon={icon} />}
          {tag.id} 
          {tag.count
            ? <span className="light-color">{"("}{tag.count}{")"}</span>
            : null
          }
        </li>
      );
  }

});

SelectableTag.css = `
.tag-selectable > i.fa {
  margin-right: 6px;
  vertical-align: middle;
  display: inline-block;
}
.tag-selectable > span.light-color {
  margin-left: 4px;
}
`;

/*
  Props: 
    - model array[model {
              id: 'tag_name'
              count: usage_count (optional)
             }]
    - selected TagString
    - onSelected(model) [callback] (optional)
    - floating [boolean] (optional default:false)
    - autoclear [boolean] (optional default:false)
    - className [string] (optional - added to 'tag-list-selectable')
    - glyphs [string-enum] <-- N.B. plural
        : none (default)
        : checks
        : x
*/

function modelsToTagString(arr) {
  if( arr instanceof TagString ) {
    return new TagString(arr);
  }
  return new TagString(arr && arr.map(t => t.id));
}

function tagStringToModels(tagStr) {
  if( !(tagStr instanceof TagString) ) {
    return tagStr;
  }
  return (tagStr && tagStr.map( t => { return { id: t }; } )) || [];
}

const SelectableTagList = React.createClass({

  getInitialState() {
    return this.calcState(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  },

  shouldComponentUpdate(nextProps,nextState) {
    return !this.state.selected.isEqual(nextState.selected) ||
            !this.state._tags.isEqual(nextState._tags);
  },

  calcState(props) {
    return { selected: props.selected || new TagString(),
             _tags:    modelsToTagString(props.model),
             tags:     tagStringToModels(props.model) };
  },

  render() {
    var cls = 'tag-list-selectable';
    if( this.props.floating ) {
      cls += ' floating';
    }
    if( this.props.autoclear ) {
      cls += ' autoclear';
    }
    if( this.props.className ) {
      cls += ' ' + this.props.className;
    }
    var arr = this.props.autoclear 
                    ? ( arr = this.state.tags.slice(), arr.push({id:''}), arr ) 
                    : this.state.tags;

    return (
      <ul className={cls}>{arr.map( tag => 
          <SelectableTag  key={tag.id} 
                          selected={this.state.selected.containsOne(tag.id)} 
                          model={tag} 
                          glyph={this.props.glyphs}
                          onSelected={this.props.onSelected}
          />
      )}</ul>
    );
  }
});

SelectableTagList.css = SelectableTag.css + `
  ul.tag-list-selectable {
    padding: 0px;
    margin: 0px;
  }
  ul.tag-list-selectable.floating > li {
    float: left;
    margin-left: 5px;     
  } 
  ul.tag-list-selectable.autoclear > li:last-child {
    float: none;
    clear: both;
  }
`;

/*
  Props: 
    - model TagString OR
            array[model {
              id: 'tag_name'
              count: usage_count (optional)
             }]
    - className [string] (optional - added to 'tag-list-static')
    - floating [boolean] (optional default:true)
    - autoclear [boolean] (optional default:true)
*/

const StaticTagsList = React.createClass({

  getDefaultProps() {
    return { floating: true, autoclear: true };
  },

  getInitialState() {
    return this.calcState(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  },

  calcState(props) {
    var model = props.model instanceof TagString ? tagStringToModels(props.model) : props.model;
    return { model };
  },

  render() {
    var cls = 'tag-list-static';
    if( this.props.className ) {
      cls += ' ' + this.props.className;
    }
    var css = this.props.css || StaticTagsList.css;

    return (
        <div className="tag-list-static-container">
          <InlineCSS css={css} id="tag-list-static-css" />
          <SelectableTagList 
            model={this.state.model} 
            className={cls}
            glyphs={this.props.glyphs}
            floating={this.props.floating}
            autoclear={this.props.autoclear}
          />
      </div>
      );
  }
});

StaticTagsList.css = SelectableTagList.css;


/*
  Props: 
    - model array[model {
              id: 'tag_name'
              count: usage_count (optional)
             }]
    - onSelected [callback]
    - selected TagString
    - className [string] (optional - added to 'tag-list-checkable')
    - css [string] (note: inline css - set CheckableTagsList.css to destroy defaults)
*/
const CheckableTagsList = React.createClass({

  render() {
    var cls = 'tag-list-checkable';
    if( this.props.className ) {
      cls += ' ' + this.props.className;
    }
    var css = this.props.css || CheckableTagsList.css;
    return (
        <div className="tag-list-checkable-container">
          <InlineCSS css={css} id="tag-list-checkable-css" />
          <SelectableTagList 
            model={this.props.model} 
            selected={this.props.selected}
            className={cls}
            glyphs="checks"
            onSelected={this.props.onSelected}
          />
        </div>
      );
  }
});

CheckableTagsList.css = SelectableTagList.css + `
.tag-list-checkable-container {
  overflow: scroll;
  background-color: rgba(96, 125, 139, 0.08);
  border-radius: 8px;
}
.tag-list-checkable li.tag-selectable-checks {
    padding: 0 4px;
    margin-bottom: 3px;
    margin-right: 12px;
    cursor: pointer;
    border: 1px solid transparent;
}
.tag-list-checkable .tag-selectable-checks:hover {
  border: 1px solid #888;
  border-radius: 4px;  
}

`;

var ClearTagsButton = React.createClass({

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClear();
  },

  render() {
    return (<a href="#" onClick={this.onClick} className="btn btn-xs btn-danger tags-clear"><Glyph icon="trash" />{" clear"}</a>);
  }
});

/*
  Props: 
    - model TagString
    - onRemoved [callback]
    - onClear [callback]
    - className [string] (optional - added to 'tag-list-selected')
    - css [string] (note: inline css - set CheckableTagsList.css to destroy defaults)
*/

var SelectedTagList = React.createClass({

  getInitialState() {
    return this.calcState(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  },

  calcState(props) {
    return { tags: tagStringToModels(props.model),
             model: props.model  };
  },

  onSelected(tag) { 
    this.props.onRemove(tag);
  },

  render() {
    var cls = 'tag-list-selected';
    if( this.props.className ) {
      cls += ' ' + this.props.className;
    }
    var css = this.props.css || SelectedTagList.css;

    return (
        <div className="tag-list-selected-container">
          <InlineCSS css={css} id="tag-list-selected-css" />
          <SelectableTagList 
            model={tagStringToModels(this.state.model)} 
            selected={this.state.model}
            onSelected={this.onSelected}
            className={cls}
            glyphs="x"
            floating
          />
          {this.state.model.length > 1 && (<ClearTagsButton onClear={this.props.onClear} />)}
          <div className="clearfix" />
      </div>
      );
  }
});

SelectedTagList.css = SelectableTagList.css + `
.tag-list-selected-container {
  padding-bottom: 12px;
}
.tag-list-selected > li.tag-selectable-x {
  font-size: 12px;
  display: inline-block;
  border-radius: 5px;
  background-color: #DDD;
  padding: 6px;
  vertical-align: center;
  margin-right: 8px;
  margin-bottom: 8px;
  color: #555;
}

.tag-list-selected > li.tag-selectable-x i.fa {
  font-size: 13px;  
}

.tag-list-selected > li.tag-selectable-x:hover {
  background: red;
  color: white;
  cursor: default;
}
`;

module.exports = {
  SelectableTag,
  SelectableTagList,
  StaticTagsList,
  CheckableTagsList,
  SelectedTagList
};

//