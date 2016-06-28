import React            from 'react';
import { InlineCSS,
         Form,
         EditControls } from '../vanilla';
import { TagString }    from '../../unicorns';
import { bindAll,
         selectors }    from '../../unicorns';
import TagStore         from '../../stores/tags';

import { SelectedTagsTracker } from '../../mixins';
import DelayedCommitTagStore   from '../../stores/delayed-commit-tag-store';

import { 
          StaticTagsList,
          CheckableTagsList,
          SelectedTagList,
          SelectableTagList
      } from '../models/Tags';

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



/*
  Props: 
    - store - required property: tags [TagString]
        watches MODEL_UPDATE events

*/

class BoundStaticTagList extends SelectedTagsTracker.stt(React.Component)
{
  shouldComponentUpdate(nextProps) {
    return this.props.store.tags.hash !== nextProps.store.tags.hash;
  }

  render() {
    return ( <StaticTagsList className="tag-list-bound" model={this.state.tags} />);
  }
}

class BoundSelectableTagList extends SelectedTagsTracker.stt(React.Component)
{
  constructor() {
    super(...arguments);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(tag,toggle) {
    this.props.store.toggleTag(tag,toggle);
  }

  render() {
    const { tags:selected } = this.state;
    
    const { model, className:cls, glyphs, floating } = this.props;

    const className = selectors('tag-list-selectable-bound', cls );
    const props     = { selected, model, glyphs, floating, className };

    return( <SelectableTagList {...props} onSelected={this.onSelected} /> );
  }
}

/*
  Props: 
    - store 
    - minCount [number] (only show tags that h
            ave been used this much - default 100)
    - category [BoundCategoryTagBox.categories]

*/
class BoundCategoryTagBox extends SelectedTagsTracker.stt(React.Component)
{
  constructor() {
    super(...arguments);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(tag,toggle) {
    this.props.store.toggleTag(tag,toggle);
  }

  render() {
    const { tags } = this.state;

    const { className = '', category, minCount } = this.props;

    var cls = selectors('tag-list-bound', className);

    return (<CategoryTagBox 
                category={category} 
                minCount={minCount} 
                selected={tags} 
                onSelected={this.onSelected} 
                className={cls}
            />);
  }
}

BoundCategoryTagBox.categories = CategoryTagBox.categories;


/*
  Mirrors and tracks the .tags property in a store - if a tag is clicked
  on it will be removed from the store. (aka de-selected)

  Props: 
    - store 

*/
class BoundSelectedTagList extends SelectedTagsTracker.stt(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll(this,'onRemove', 'onClear');
  }

  onRemove(tag) {
    this.props.store.toggleTag(tag,false);
  }

  onClear() {
    this.props.store.clearTags();
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

class DualTagFieldWidget extends React.Component
{
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    /* globals $ */
    if( this.props.cancelCallback ) {
      $('#blerg').slideDown();
      this.props.cancelCallback( cb => $('#blerg').slideUp('fast',cb) );
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.store.tags.hash !== nextProps.store.tags.hash;
  }
  
  // TODO: tag cats should be navtabs, not just stacked on top of each other
  render() {
    const { store, cancelCallback, cats = [GENRE] } = this.props;
    return(
      <div id="blerg" style={cancelCallback && {display:'none'}}>
        <BoundSelectedTagList store={store} />
        {cats.map( (cat,i) => <BoundCategoryTagBox key={i} category={cat} store={store} />)}
      </div>
    );
  }
}

const editingClasses = { [false]: '', [true]: ' editing '};

const TagEditMixin = target => class extends target {

  constructor() {
    super(...arguments);
    bindAll(this, 'onEdit', 'onCancel', 'onDone', 'cancelCB' );
    this.state = { editing: false };
    this._setupStore(this.props.store);
  }

  _setupStore(store) {
    this._store = this.props.delayCommit ? new DelayedCommitTagStore(store) : store;    
  }

  componentWillReceiveProps(nextProps) {
    this._setupStore(nextProps.store);
    this.setState({editing:false});
  }

  onEdit() {
    this.setState( {editing:true});
  }

  onCancel() {
    this.props.delayCommit && this._store.resetTags();
    this._closeMe();
  }

  onDone() {
    this.props.delayCommit && this._store.commitTags();
    this.props.onDone && this.props.onDone();    
    this._closeMe();
  }

  _closeMe() {
    var ss = () => this.setState({editing:false});
    this.pcb && this.pcb(ss)  || ss();    
  }

  cancelCB( pcb ) {
    this.pcb = pcb;
  }

  get widget() {
    return this.state.editing
                  ? <DualTagFieldWidget store={this._store} cancelCallback={this.cancelCB} />
                  : <BoundStaticTagList store={this._store} />;
  }

  get editControls() {
    const { controlsCls = '', onDone, delayCommit } = this.props;
    const { editing } = this.state;
    var cls = controlsCls + editingClasses[editing];
    return this._store.permissions.canEdit
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