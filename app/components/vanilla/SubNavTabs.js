import React from 'react';

/*
  Designed to be used as a base class for nav tabs

  The derivation is used as children to a <SubNavBar /> 
  component

  Derivations implement: 
    tabs  - Read only property that returns a hash of tabs 
            in the form of:

              {
                <name-of-tab>: <text-for-tab>
              }

    onTab(name-of-tab) - user has selected this tab

    tab    - Readonly property - the currently selected tab

    badges - Readonly property -
             a hash that corresponds to the tabs that 
             include a count that will be displayed as
             badges. So if the tabs property returns:
                {
                  foo: 'bar',
                  fee: 'baz'
                }
             Then badges might return something like 
                {
                  foo: 18,
                  fee: 3
                }

    allowEmptyBadges                
             A value of zero (0) badge will hide an
             entire tab unless property return true

*/
class SubNavTabs extends React.Component
{

  onSelect(tab) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.onTab(tab);
    };
  }

  get badges() {
    return null;
  }

  get allowEmptyBadges() {
    return false;
  }

  checkActive(tab) {
    return tab === this.tab ? 'active' : '';
  }

  render() {

    const { tabs, badges, allowEmptyBadges } = this;

    return (
      <ul className="nav nav-tabs subnav-tabs">
      {Object.keys(tabs).map( t => {
        if( badges && !badges[t] && !allowEmptyBadges ) {
          return null;
        }
        return (
          <li key={t} className={this.checkActive(t)} >
            <a href="#" onClick={this.onSelect(t)}>
              {tabs[t]}
              {badges && badges[t] > 0
                ? <span className="badge">{badges[t]}</span>
                : null
              }
            </a>
          </li>
          );
      })}
      </ul>
      );
  }

}

module.exports = SubNavTabs;

//
