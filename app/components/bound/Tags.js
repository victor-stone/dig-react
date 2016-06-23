import React            from 'react';
import { InlineCSS,
         EditControls } from '../vanilla';
import { TagString }    from '../../unicorns';
import TagStore         from '../../stores/tags';

import { SelectedTagsTracker } from '../../mixins';
import DelayedCommitTagStore   from '../../stores/delayed-commit-tag-store';

import { 
          StaticTagsList,
          CheckableTagsList,
          SelectedTagList,
      } from '../models/Tags';

/* See app/models/Tags.js for explanations of concepts */

/*
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
    var cls = 'tag-list-category ' + className;
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

var BoundStaticTagList = React.createClass({

  mixins: [ SelectedTagsTracker ],

  shouldComponentUpdate(nextProps) {
    return this.props.store.tags.hash !== nextProps.store.tags.hash;
  },

  render() {
    return ( <StaticTagsList className="tag-list-bound" model={this.state.tags} />);
  }
});


/*
  Props: 
    - store 
    - minCount [number] (only show tags that h
            ave been used this much - default 100)
    - category [BoundCategoryTagBox.categories]

*/
var BoundCategoryTagBox = React.createClass({

  // TODO: make SelectedTagsTracker a class mixin 
  mixins: [ SelectedTagsTracker ],

  onSelected(tag,toggle) {
    this.props.store.toggleTag(tag,toggle);
  },

  render() {
    const { className = '' } = this.props;
    var cls = 'tag-list-bound ' + className;

    return (<CategoryTagBox                
                category={this.props.category} 
                minCount={this.props.minCount} 
                selected={this.state.tags} 
                onSelected={this.onSelected} 
                className={cls}
            />);
  }
});

BoundCategoryTagBox.categories = CategoryTagBox.categories;


/*
  Props: 
    - store 
    - minCount [number] (only show tags that h
            ave been used this much - default 100)
    - category [BoundCategoryTagBox.categories]

*/
var BoundSelectedTagList = React.createClass({

  mixins: [ SelectedTagsTracker ],

  onRemove(tag) {
    this.props.store.toggleTag(tag,false);
  },

  onClear() {
    this.props.store.clearTags();
  },

  render() {
    const { className = '' } = this.props;
    var cls = 'tag-list-bound ' + className;
    return (
        <SelectedTagList 
            model={this.state.tags} 
            onRemove={this.onRemove} 
            onClear={this.onClear} 
            className={cls}
        />
      );
  }
});

const genreCat = BoundCategoryTagBox.categories.GENRE;

class DualTagFieldWidget extends React.Component
{
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
  
  render() {
    return(
      <div id="blerg" style={this.props.cancelCallback && {display:'none'}}>
        <BoundSelectedTagList store={this.props.store} />
        <BoundCategoryTagBox category={genreCat} store={this.props.store} />
      </div>
    );
  }
}

const editingClasses = { [false]: '', [true]: ' editing '};

const TagEditMixin = target => class extends target {

  constructor() {
    super(...arguments);
    this.__bindAll([ 'onEdit', 'onCancel', 'onDone', 'cancelCB' ]);
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
    const { cls = 'form-group' } = this.props;
    return(
        <div className={cls}>
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon">{"tags"}</span>
              <span className="form-control initial-height">
                {this.widget}
              </span>
              {this.editControls}
            </div>
          </div>
        </div>
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
  CategoryTagBox,
  BoundStaticTagList,
  BoundCategoryTagBox,
  BoundSelectedTagList,
  EditableTagsField,
  DualTagFieldWidget,
  EditableTagsDiv,

  tagOccurrances
};

//