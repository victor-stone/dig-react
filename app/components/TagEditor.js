import React           from 'react';
import { FormItem }    from './Form';
import Glyph           from './Glyph';
import Modal           from './Modal';
import Alert           from './Alert';
import Tags            from './Tags';
import InlineCSS       from './InlineCSS';
import { UploadOwner } from '../mixins';
import { TagString }   from '../unicorns';

/*
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

    components
    ------------
    - Selectable tag

    - Selectable tags list
      : check/uncheck 

    - Selected tags list

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
    this.setState( {selected: !this.state.selected}, () => this.props.onSelected(this.props.model.id,this.state.selected) );
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
`;

/*
  Props: 
    - model array[model {
              id: 'tag_name'
              count: usage_count (optional)
             }]
    - className [string] (optional - added to 'tag-list-selectable')
    - onSelected(model) [callback] (optional)
    - selected TagString
    - floating [boolean] (optional default:false)
    - glyphs [string-enum] <-- N.B. plural
        : none (default)
        : checks
        : x
*/

function modelsToTagString(arr) {
  return new TagString(arr && arr.map(t => t.id));
}

function tagStringToModels(tagStr) {
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
            !this.state.tags.isEqual(nextState.tags);
  },

  calcState(props) {
    return { selected: props.selected || new TagString(),
             tags:     modelsToTagString(props.model) };
  },

  render() {
    var cls = 'tag-list-selectable';
    if( this.props.floating ) {
      cls += ' floating';
    }
    if( this.props.className ) {
      cls += ' ' + this.props.className;
    }
    var arr = this.props.floating ? (arr = this.props.model.slice(),arr.push({id:''}),arr) : this.props.model;

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
  ul.tag-list-selectable.floating > li:last-child {
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
*/

const StaticTagsList = React.createClass({

  getDefaultProps() {
    return { floating: true };
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
}
.tag-list-checkable li.tag-selectable-checks {
    padding: 0 4px;
    margin-bottom: 3px;
    cursor: pointer;
    border: 1px solid transparent;
}
.tag-list-checkable .tag-selectable-checks:hover {
  border: 1px solid #888;
  border-radius: 4px;  
}

`;


/*
  Props: 
    - model TagString
    - onRemoved [callback]
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
            onSelected={this.onSelected}
            className={cls}
            glyphs="x"
            floating
          />
      </div>
      );
  }
});

SelectedTagList.css = SelectableTagList.css + `
.tag-list-selected > li.tag-selectable-x {
  background: green;
  margin-bottom: 6px;
  color: white;
  padding: 0 5px;
  border-radius: 4px;
}
.tag-list-selected > li.tag-selectable-x:hover {
  background: red;
  cursor: default;
}
`;


const SYSTEM_TAGS = 'audio,non_commercial,attribution,44k,48k,mp3,archive,flac,zip,media,CBR,VBR,stereo';

class TagEditor extends Modal.Popup {

  constructor() {
    super(...arguments);
  }

  getModelName() {
    return 'wat';
  }

  render() {
    var tags = this._currentTags();

    return (
      <Modal action={this.onSubmit} 
             subTitle="Select tags"
             title={this.getModelName()}  
             icon="cloud-upload"
             buttonText="Save" 
             closeText="Cancel" 
             {...this.props}
      >
        <div className="selected-tags">
        </div>
        <Alert type="danger" text={this.state.error} />
        <Tags.SelectedTags store={this.props.store} />
        <Tags.SelectableTagList store={this.props.store} model={tags} />        
      </Modal>
      );
  }  
}

var UploadTagsLink = React.createClass({

  mixins: [UploadOwner],

  showEditTags(e) {
    e.stopPropagation();
    e.preventDefault();
    TagEditor.show( TagEditor, { store: this.props.store } );
  },

  render() {
    var model = this.props.store.model.upload;
    var addOn = this.state.owner.isOwner && <span className="input-group-addon"><a onClick={this.showEditTags} ><Glyph icon="edit"  /></a></span>;

    return (
        <FormItem title="tags" cls={this.props.cls} wrap={false} addOn={addOn}>
          <ul className="tags-list form-control">{model.tags.remove(SYSTEM_TAGS).map( t => <li className="tag" key={t}>{t}</li> )}</ul>
        </FormItem>
      );
  }
});


module.exports = {
  SelectableTag,
  SelectableTagList,
  StaticTagsList,
  CheckableTagsList,
  SelectedTagList,

  UploadTagsLink
};

//