import SubNavTabs    from '../vanilla/SubNavTabs';
import LinkToRoute   from './LinkToRoute';

/*
  Enabled a display of tabs backed by URLs.

  props
    tabs - hash that looks like:
              {
                'url-path': 'text for tab'
              }
    tab -  select tab in any format meaningful to you

    urlForTab(tab) - a callback you implement that converts
                     the 'tab' property to a URL (only used
                     for selected tab)
*/
class UrlNavTabs extends SubNavTabs
{
  constructor() {
    super(...arguments);
  }

  get tab() {
    return this.props.urlForTab(this.props.tab);
  }

  get tabs() {
    return this.props.tabs;
  }

  onTab(tab) {
    LinkToRoute.navigateTo(tab);
  }

}

module.exports = UrlNavTabs;

//
