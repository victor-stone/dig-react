import React            from 'react';
import { InlineCss }    from '../vanilla';
import { TagString,
         LibArray,
         bindAll,
         selectors }    from 'unicorns';

import TagStore         from '../../stores/tags';

import Filter           from '../../models/filters/tags';

import PropertyState    from '../properties/mixins/property-state';

import { 
          StaticTagsList,
          CheckableTagsList,
          SelectedTagList,
          SelectableTagList
      } from '../models/tags';

import MatchAllButton from '../filters/match-all';

/* 
  See app/models/Tags.js for explanations of concepts 

*/

function tagOccurrances(cat,tags) {
  var arr = LibArray.from(cat, t => t.id );
  var regx = new RegExp('\\b(' + tags.toString('|') +  ')\\b','g');
  return arr.match(regx).length;
}
const DEFAULT_MIN_TAG_COUNT = 100;


/*

  Complient stores:

    Properties:
      permissions.canEdit - read only

  Props: 
    - category [CategoryTagBox.categories]
    - pairWith [string] (e.g. one of: remix, sample, acappella)
    - minCount [number] (only show tags that have been used this much)
    - onSelected(model,toggle) [callback] (option)
    - selected [TagString]
*/

class CategoryTagBox extends React.Component
{
  constructor() {
    super(...arguments);

    this.state = { 
      selected: new TagString(this.props.selected), 
      model: [] 
    };

    this.onReceivedTags = this.onReceivedTags.bind(this);
  }

  componentDidMount() {
    
    const { 
      minCount = DEFAULT_MIN_TAG_COUNT, 
      category, 
      pairWith 
    } = this.props;

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
          <InlineCss css={CategoryTagBox.css} id="category-tag-box-css" />
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

class BoundStaticTagList extends PropertyState(React.Component)
{
  get PropertyClass() {
    return this.props.Property || Filter;
  }
  
  render() {
    
    var tags = this.state.value;

    return ( tags.length 
                ? <StaticTagsList className="tag-list-bound" model={tags} />
                : <span style={{color:'white'}}>{'.'}</span> );
  }
}

class BoundSelectableTagList extends PropertyState(React.Component)
{
  get PropertyClass() {
    return this.props.Property || Filter;
  }

  render() {
    const { editable:selected } = this.state;
    
    const { 
      model, 
      className:cls, 
      glyphs, 
      floating } = this.props;

    const className = selectors('tag-list-selectable-bound', cls );
    
    const props = { 
      selected,
      model, 
      glyphs, 
      floating, 
      className 
    };

    const toggle = this.property.toggle.bind(this.property);

    return( <SelectableTagList {...props} onSelected={toggle} /> );
  }
}

/*
  Props: 
    - store 
    - minCount [number] (only show tags that h
            ave been used this much - default 100)
    - category [BoundCategoryTagBox.categories]

*/
class BoundCategoryTagBox extends PropertyState(React.Component)
{
  get PropertyClass() {
    return this.props.Property || Filter;
  }

  render() {
    const { editable:tags } = this.state;

    const { 
      className = '', 
      category, 
      minCount 
    } = this.props;

    const cls = selectors('tag-list-bound', className);

    const toggle = this.property.toggle.bind(this.property);

    return (<CategoryTagBox 
                category={category} 
                minCount={minCount} 
                selected={tags} 
                onSelected={toggle} 
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
class BoundSelectedTagList extends PropertyState(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll(this,'onRemove', 'onClear');
  }

  get PropertyClass() {
    return this.props.property || Filter;
  }

  onRemove(tag) {
    this.property.toggle(tag,false);
  }

  onClear() {
    this.updateValue('');
  }

  render() {

    const { 
      className = '', 
      css, 
      autoclear = true 
    } = this.props;
    
    var cls = selectors('tag-list-bound', className);

    return (
        <SelectedTagList 
            model={this.state.editable} 
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

class DualTagFieldWidget extends PropertyState(React.Component)
{
  get PropertyClass() {
    return this.props.property || Filter;
  }

  // TODO: tag cats should be navtabs, not just stacked on top of each other
  
  render() {
  
    const { 
      store, 
      withMatchAll = false, 
      cats = [GENRE] 
    } = this.props;
    
    const thru = { 
      store, 
      property: this.props.property 
    };

    return  (<div>
              <BoundSelectedTagList key="98" {...thru} />
              {withMatchAll && <MatchAllButton key="99" {...thru} />}
              {cats.map( cat => <BoundCategoryTagBox key={cat} category={cat} {...thru} />)}
            </div>);
  }
}

module.exports = {
  BoundCategoryTagBox,
  BoundSelectableTagList,
  BoundSelectedTagList,
  BoundStaticTagList,
  CategoryTagBox,
  DualTagFieldWidget
};

//