import { ModelTracker } from '../../mixins';
import SubNavTabs       from '../vanilla/sub-nav-tabs';

import { TagString,
         oassign }      from '../../unicorns';

/*
  Present nav tabs that will filter a store's query 'reqtags'
  parameter.

  props
    store = query-able store assumes .queryParams.reqtags (TagString)
    tabs = hash in the form of:
              {
                  tag: 'tab-display-text'
              }
    all := boolean true means include a tab called 'all'


*/
class ReqTagsNavTabs extends ModelTracker(SubNavTabs)
{
  constructor() {
    super(...arguments);
    //this.state = { badges: null, tab: this.props.tab };
  }

  // TODO: replace all oassign with Object.assign
  get tabs() { 
    const { all, tabs } = this.props;

    return oassign( all ? { all: 'all' } : {}, tabs ); 
  }

  get tab() {
    return this.state.tab;
  }

  get badges() {
    return this.state.badges;
  }

  get filter() {
    if( !this._filter ) {
      this._filter = new RegExp( '^' + Object.keys(this.props.tabs).join('|') + '$');
    }
    return this._filter;
  }

  stateFromStore(store) {
    const { totals: badges, queryParams: { reqtags: tags } } = store.model;
    var tab  = (new TagString(tags)).filter(this.filter).toString() || 'all';
    return { badges, tab };
  }

  onTab(filter) {
    var tag     = filter === 'all' ? '' : filter;
    var qptags  = this.props.store.queryParams.reqtags;
    var reqtags = qptags.replace( this.state.tab, tag ).toString();
    this.props.store.refreshModel( { reqtags } );    
  }
}

module.exports = ReqTagsNavTabs;

//
