import React            from 'react';
import { InlineCSS,
         Form,
         EditControls } from '../vanilla';
import { TagString }    from '../../unicorns';
import { bindAll,
         selectors }    from '../../unicorns';
import TagStore         from '../../stores/tags';

import Filter           from '../../models/filters/tags';

import { 
          StaticTagsList,
          CheckableTagsList,
          SelectedTagList,
          SelectableTagList
      } from '../models/Tags';

import MatchAllButton from '../filters/MatchAll';

/* See app/models/Tags.js for explanations of concepts */

/*

  Complient stores:

    Properties:
      tags [TagString] - read/write
      permissions.canEdit - read only

    Methods: (these are supplied by tags-owner mixin)
      toggleTag(tag,toggle)
      clearTags()

    Events source:
      TAGS_SELECTED

  See DelayedCommitTagStore for the minimum API
  required for bound components.

  Props: 
    - category [CategoryTagBox.categories]
    - pairWith [string] (e.g. one of: remix, sample, acappella)
    - minCount [number] (only show tags that have been used this much)
    - onSelected(model,toggle) [callback] (option)
    - selected [TagString]
*/

function tagOccurrances(cat,tags) {
  var arr = cat.map( t => t.id );
  var regx = new RegExp('\\b(' + tags.toString('|') +  ')\\b','g');
  return arr.match(regx).length;
}
const DEFAULT_MIN_TAG_COUNT = 100;

class CategoryTagBox extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { selected: new TagString(this.props.selected), model: [] };
    this.onReceivedTags = this.onReceivedTags.bind(this);
  }

  componentDidMount() {
    const { minCount = DEFAULT_MIN_TAG_COUNT, category, pairWith } = this.props;
    var store = new TagStore();
    store.category( category, pairWith, minCount )
      .then( this.onReceivedTags );
  }

  componentWillReceiveProps(nextProps) {
    var ts = new TagString(nextProps.selected);
    const { maxAllowed } = this.props;
    var maxReached = maxAllowed && tagOccurrances(this.state.model,ts) >= maxAllowed;
    this.setState({ selected: ts,  maxReached });
  }

  onReceivedTags(model) {
    this.setState({model});
  }

  render() {
    const { className = '' } = this.props;
    var cls = selectors('tag-list-category',className);

    return (
        <div>
          <InlineCSS css={CategoryTagBox.css} id="category-tag-box-css" />
          <CheckableTagsList className={cls} model={this.state.model} selected={this.state.selected} onSelected={this.props.onSelected} />
        </div>
      );
  }

}

CategoryTagBox.categories = TagStore.categories;

CategoryTagBox.css = CheckableTagsList.css + `
.tag-list-category {
  height: 200px;
  border: 1px solid #CCC;
}
`;

const TagFilter = baseclass => class extends baseclass {
  constructor() {
    super(...arguments);
    this.onTagsChanged = this.onTagsChanged.bind(this);
    this._setupStore(this.props.store);
    this.state = { tags: this.filter.value };
  }

  componentWillMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    this.props.store !== nextProps.store && this._setupStore(nextProps.store);
    this.setState( { tags: this.filter.value } );
  }

  shouldComponentUpdate(nextProps,nextState) {
    return !this.state.tags.isEqual(nextState.tags);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _setupStore(store) {
    this.filter = store.addProperty(Filter);
    this.filter.onChange( this.onTagsChanged );
    this.toggle = this.filter.toggle.bind(this.filter);
  }

  onTagsChanged(filter) {
    if( this._mounted ) {
      this.setState( {tags: filter.value} );
    }
  }

};

/*
  Props: 
    - store - required property: tags [TagString]
*/

class BoundStaticTagList extends TagFilter(React.Component)
{
  render() {
    return ( this.state.tags.length 
                ? <StaticTagsList className="tag-list-bound" model={this.state.tags} />
                : <span style={{color:'white'}}>{'.'}</span> );
  }
}

class BoundSelectableTagList extends TagFilter(React.Component)
{
  render() {
    const { tags:selected } = this.state;
    
    const { model, className:cls, glyphs, floating } = this.props;

    const className = selectors('tag-list-selectable-bound', cls );
    const props     = { selected, model, glyphs, floating, className };

    return( <SelectableTagList {...props} onSelected={this.toggle} /> );
  }
}

/*
  Props: 
    - store 
    - minCount [number] (only show tags that h
            ave been used this much - default 100)
    - category [BoundCategoryTagBox.categories]

*/
class BoundCategoryTagBox extends TagFilter(React.Component)
{
  render() {
    const { tags } = this.state;

    const { className = '', category, minCount } = this.props;

    const cls = selectors('tag-list-bound', className);

    return (<CategoryTagBox 
                category={category} 
                minCount={minCount} 
                selected={tags} 
                onSelected={this.toggle} 
                className={cls}
            />);
  }
}

BoundCategoryTagBox.categories = CategoryTagBox.categories;


/*
  Mirrors and tracks the tags property in a store - if a tag is clicked
  on it will be removed from the store. (aka de-selected)

  Props: 
    - store 

*/
class BoundSelectedTagList extends TagFilter(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll(this,'onRemove', 'onClear');
  }

  onRemove(tag) {
    this.filter.toggle(tag,false);
  }

  onClear() {
    this.filter.reset();
  }

  render() {
    const { className = '', css, autoclear = true } = this.props;
    var cls = selectors('tag-list-bound', className);

    return (
        <SelectedTagList 
            model={this.state.tags} 
            onRemove={this.onRemove} 
            onClear={this.onClear} 
            className={cls}
            css={css}
            autoclear={autoclear}
        />
      );
  }
}

const GENRE = BoundCategoryTagBox.categories.GENRE;

class DualTagFieldWidget extends TagFilter(React.Component)
{
  componentDidMount() {
    /* globals $ */
    if( this.props.cancelCallback ) {
      $('#blerg').slideDown();
      this.props.cancelCallback( cb => $('#blerg').slideUp('fast',cb) );
    }
  }

  // TODO: tag cats should be navtabs, not just stacked on top of each other
  render() {
    const { store, cancelCallback, withMatchAll = false, cats = [GENRE] } = this.props;
    return(
      <div id="blerg" style={cancelCallback && {display:'none'}}>
        <BoundSelectedTagList store={store} />
        {withMatchAll && <MatchAllButton store={store} />}
        {cats.map( (cat,i) => <BoundCategoryTagBox key={i} category={cat} store={store} />)}
      </div>
    );
  }
}

const editingClasses = { [false]: '', [true]: 'editing'};

const TagEditMixin = target => class extends target {

  constructor() {
    super(...arguments);
    bindAll(this, 'onEdit', 'onCancel', 'onDone', 'cancelCB' );
    this.state = { editing: false };
    this._setupStore(this.props.store,this.props.delayCommit);
  }

  _setupStore(store,delay) {
    if( delay ) {
      this.filter = new Filter();
      // yea, this is hacky
      this.filter.fromNative(store.nativeProperties['tags']);
    } else {
      this.filter = store.addProperty(Filter);
    }
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.store !== nextProps.store ) {
      this._setupStore(nextProps.store,nextProps.delayCommit);
    }
    this.setState({ editing:false });
  }

  onEdit() {
    this.setState({ editing:true });
  }

  onCancel() {
    this.filter.reset();
    this._closeMe();
  }

  onDone() {
    const { delayCommit, store, onDone } = this.props;

    if( delayCommit ) {
      store.injectProperty(Filter,this.filter).onChange();
      store.removeFilter(Filter);
    }

    onDone && onDone();    
    this._closeMe();
  }

  _closeMe() {
    var ss = () => this.setState({editing:false});
    this.pcb && this.pcb(ss) || ss();    
  }

  cancelCB( pcb ) {
    this.pcb = pcb;
  }

  get widget() {
    const { store } = this.props;
    return this.state.editing
                  ? <DualTagFieldWidget store={store} cancelCallback={this.cancelCB} />
                  : <BoundStaticTagList store={store} />;
  }

  get editControls() {
    const { controlsCls = '', onDone, delayCommit } = this.props;
    const { editing } = this.state;
    const cls = selectors(controlsCls, editingClasses[editing] );

    return this.props.store.permissions.canEdit
                  ? <span className={cls}>
                      {editing && (onDone || delayCommit) && <EditControls.Done onDone={this.onDone} />}
                      {editing
                        ? <EditControls.Cancel onCancel={this.onCancel} />
                        : <EditControls.Edit onEdit={this.onEdit} />}
                    </span>
                  : null;
  }
};


class EditableTagsField extends TagEditMixin(React.Component)
{
  render() {
    return(
        <Form.FormItem title="tags" addOn={this.editControls} wrap>
          {this.widget}
        </Form.FormItem>
      );
    }
}

EditableTagsField.defaultProps = { controlsCls: 'input-group-addon' };

class EditableTagsDiv extends TagEditMixin(React.Component)
{
  render() {
    return(
        <div className="tags-edit-field-div">
          {this.widget}
          {this.editControls}
        </div>
      );
  }
}

EditableTagsDiv.defaultProps = { controlsCls: 'tag-edit-controls' };

module.exports = {
  BoundCategoryTagBox,
  BoundSelectableTagList,
  BoundSelectedTagList,
  BoundStaticTagList,
  CategoryTagBox,
  DualTagFieldWidget,
  EditableTagsDiv,
  EditableTagsField,

  tagOccurrances
};

//