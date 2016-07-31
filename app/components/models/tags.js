import React            from 'react';
import Glyph            from '../vanilla/glyph';
import ClearButton      from '../vanilla/clear-button';
import InlineCss        from '../vanilla/inline-css';
import { FormItem }     from '../vanilla/form';
import { TagString,
         selectors }    from 'unicorns';

/*

  Use cases for displaying static (non-interactive) tags

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


*/

/*
  Display a tag. This component can represent
  three styles of interaction glyphs

    (no-glyph) non-interactive, like tags that 
               describe a document. Using css:hover
               and onSelected callback they can
               be made to act as links.

    checkbox   tag can be toggled

    x          tag can only be de-selected

  This component will NOT change it's internal
  state - all state comes from the 'selected'
  property
  
  Props: 
    - model {
              id: 'tag_name'
              count: usage_count (optional)
             }
    - onSelected(model,boolean) [callback] (optional)
    - selected [boolean] for toggled, set to ON state
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

const glyphMap = {
  checks: { [true]:'check-square-o', [false]:'square-o',     selector:'tag-selectable-checks' },
       x: { [true]:'times-circle',   [false]:'times-circle', selector:'tag-selectable-x' },
  [true]: 'tag-selected'
 };

class SelectableTag extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = this.calcState(this.props);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.selected !== nextState.selected;
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onSelected(this.props.model.id,!this.state.selected);
  }

  calcState(props) {
    return { selected: props.selected };
  }

  render() {
    const { model: {id,count=0}, glyph, onSelected } = this.props;

    if( !id ) {
      return <li />;
    }

    const { selected } = this.state;
    
    const { [glyph]:{[selected]:icon, selector} = {}, [selected]:selSelector } = glyphMap;

    const cls = selectors('tag-selectable', selector, selSelector );

    return (
        <li className={cls} onClick={onSelected && this.onClick}>
          {icon && <Glyph icon={icon} />}
          {id} 
          {Number(count) > 0 && <span className="tag-count">{`(${count})`}</span>}
        </li>
      );
  }

}

SelectableTag.css = `
.tag-selectable > i.fa {
  margin-right: 6px;
  vertical-align: middle;
  display: inline-block;
}
.tag-selectable span.tag-count {
    display: inline-block;
    font-size: 70%;
    margin-left: 6;
}
`;

function modelsToTagString(arr) {
  if( arr instanceof TagString ) {
    return arr.clone();
  }
  return new TagString(arr && arr.map(t => t.id));
}

function tagStringToModels(tagStr) {
  if( !(tagStr instanceof TagString) ) {
    return tagStr;
  }
  return (tagStr && tagStr.map( t => { return { id: t }; } )) || [];
}

/*
  SelectableTagList

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

class SelectableTagList extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = this.calcState(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  }

  shouldComponentUpdate(nextProps,nextState) {
    const { selected, _tags } = this.state;
    return !selected.isEqual(nextState.selected) || !_tags.isEqual(nextState._tags);
  }

  calcState(props) {
    return { selected: props.selected || new TagString(),
             _tags:    modelsToTagString(props.model),
             tags:     tagStringToModels(props.model) };
  }

  render() {

    const { floating, autoclear = floating, className, glyphs, onSelected } = this.props;
    const { tags, selected } = this.state;

    const cls = selectors(
                  'tag-list-selectable',
                  floating ? 'floating' : null,
                  autoclear ? 'autoclear' : null,
                  className );

    let arr = autoclear 
                    ? ( arr = tags.slice(), arr.push({id:0}), arr ) 
                    : tags;

    return (
      <ul className={cls}>{arr.map( tag => 
          <SelectableTag  key={tag.id} 
                          selected={selected.containsOne(tag.id)} 
                          model={tag} 
                          glyph={glyphs}
                          onSelected={onSelected}
          />)}
      </ul>
    );
  }
}

SelectableTagList.css = SelectableTag.css + `
  ul.tag-list-selectable {
    padding: 0px;
    margin: 0px;
    text-align: left;
  }

  ul.tag-list-selectable.floating > li {
    float: left;
    margin-left: 5px;     
  } 
  

  ul.tag-list-selectable.autoclear > li.tag-selectable.tag-selectable-checks:last-child,
  ul.tag-list-selectable.autoclear > li:last-child {
    float: none;
    clear: both;
    background: transparent;
    box-shadow: 0 0;
  }

  /* Floating check boxes */
  
  ul.tag-list-selectable.floating li.tag-selectable.tag-selectable-checks {
    cursor: pointer;
    font-size: 12px;
    display: inline-block;
    border-radius: 5px;
    background-color: #e8e8e8;
    padding: 6px;
    vertical-align: center;
    margin-right: 8px;
    margin-bottom: 8px;
    color: #555;
    box-shadow: #777 2px 2px 3px;
  }
  
  ul.tag-list-selectable.floating li.tag-selectable.tag-selectable-checks.tag-selected {
    background-color: white;
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

class StaticTagsList extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = this.calcState(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  }

  calcState(props) {
    var model = props.model instanceof TagString ? tagStringToModels(props.model) : props.model;
    return { model };
  }

  render() {
    const { className, css = StaticTagsList.css, glyphs, floating, autoclear } = this.props;
    const cls = selectors( 'tag-list-static', className );

    return (
        <div className="tag-list-static-container">
          <InlineCss css={css} id="tag-list-static-css" />
          <SelectableTagList 
            model={this.state.model} 
            className={cls}
            glyphs={glyphs}
            floating={floating}
            autoclear={autoclear}
          />
      </div>
      );
  }
}

StaticTagsList.defaultProps = { floating: true, autoclear: true };
StaticTagsList.css = SelectableTagList.css;


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
function StaticTagsField(props)
{
    return(
        <FormItem title="tags" wrap>
          <StaticTagsList {...props} />
        </FormItem>
      );
}

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
function CheckableTagsList(props)
{
  const { model, className, css = CheckableTagsList.css, selected, onSelected } = props;
  const cls = selectors( 'tag-list-checkable', className );

  return (
      <div className="tag-list-checkable-container">
        <InlineCss css={css} id="tag-list-checkable-css" />
        <SelectableTagList 
          model={model} 
          selected={selected}
          className={cls}
          glyphs="checks"
          onSelected={onSelected}
        />
      </div>
    );
}

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

/*

  An unfortunate duplication of terms:

    onClear and autoclear properties have nothing to do with each other
    
  Props: 
    - model TagString
    - onRemoved [callback]
    - onClear [callback]
    - className [string] (optional - added to 'tag-list-selected')
    - css [string] (note: inline css - set CheckableTagsList.css to destroy defaults)
    - autoclear - assigns a css style clear:both 
*/

class SelectedTagList extends React.Component
{
  constructor() {
    super(...arguments);
    this.onSelected = this.onSelected.bind(this);
    this.state = this.calcState(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState( this.calcState(props) );
  }

  calcState(props) {
    return { tags: tagStringToModels(props.model),
             model: props.model  };
  }

  onSelected(tag) { 
    this.props.onRemove(tag);
  }

  render() {
    let   { className, css = SelectedTagList.css, onClear, autoclear = true } = this.props;
    const { model } = this.state;
    const noAutoCls = autoclear === false ? 'no-autoclear' : '';
    const cls = selectors( 'tag-list-selected', className, noAutoCls );
    const outerCls = selectors('tag-list-selected-container', noAutoCls );

    css += SelectedTagList.noAutoCSS;

    return (
        <div className={outerCls}>
          <InlineCss css={css} id="tag-list-selected-css" />
          <SelectableTagList 
            model={tagStringToModels(model)} 
            selected={model}
            onSelected={this.onSelected}
            className={cls}
            glyphs="x"
            floating
            autoclear={autoclear}
          />
          {this.state.model.length > 1 && (<ClearButton className="btn-xs tags-clear" onClear={onClear} />)}
          {autoclear && <div className="clearfix" />}
      </div>
      );
  }
}

SelectedTagList.noAutoCSS = `
div.no-autoclear,
ul.no-autoclear {
  display: inline-block;
}
`;

SelectedTagList.css = SelectableTagList.css + `
.tag-list-selected-container {
  padding-bottom: 12px;
}

/* TODO: reconcile this with floating checks above */

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
  SelectedTagList,
  StaticTagsField,
};

//