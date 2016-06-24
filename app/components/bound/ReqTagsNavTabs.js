import { ModelTracker } from '../../mixins';
import SubNavTabs       from '../vanilla/SubNavTabs';

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
class _ReqTagsNavTabs extends SubNavTabs
{

  constructor() {
    super(...arguments);
    this.state = { badges: null, tab: this.props.tab };
    this.filter = new RegExp( '^' + Object.keys(this.props.tabs).join('|') + '$');
  }

  // TODO: replace all oassign with Object.assign
  get tabs() { 
    return oassign( this.props.all ? { all: 'all' } : {}, this.props.tabs ); 
  }

  get tab() {
    return this.state.tab;
  }

  get badges() {
    return this.state.badges;
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

class ReqTagsNavTabs extends ModelTracker.extender(_ReqTagsNavTabs)
{
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    super.componentWillMount();
    this.bogus();
  }
  bogus() {

  }
}
module.exports = ReqTagsNavTabs;

//
