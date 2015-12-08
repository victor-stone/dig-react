/* globals $ */

import React     from 'react';

import { LicenseFilter,
         LimitFilter,
         QueryOptionsBox,
         OptionsWrap } from '../QueryOptions';
         
import { BPMDisplay,
         BPMSlider   } from '../BPM'; 

var _StemsQueryOptions = React.createClass({

  render: function() {

    var store = this.props.store;

    return ( 
      <OptionsWrap>
        <li>
          <LicenseFilter store={store} />
        </li>
        <li>
          <BPMDisplay store={store} />
        </li>
        <li>
          <BPMSlider store={store} />
        </li>
        <li>
          <LimitFilter store={store} />
        </li>
      </OptionsWrap>
    );
  },
});
  
const StemsQueryOptions = React.createClass({

  getInitialState: function() {
    return { collapsed: true };
  },

  handleShowOptions: function() {
    this.setState( { collapsed: !this.state.collapsed }, this.doAnimation );
  },

  doAnimation: function() {
    var target = this.state.collapsed ? '27px' : '280px';
    $('.query-options').animate(
        { height: target },
        { duration: 'fast', 
          easing: 'swing'
        }
      );
    var selector = '.query-options-box.open ul.query-options > li.title .close';
    $(selector).toggle( !this.state.collapsed );
  },

  render: function() {
    return (
      <div className="query-options-box open">
        <QueryOptionsBox store={this.props.store} handleShowOptions={this.handleShowOptions}>
          <_StemsQueryOptions store={this.props.store} />
        </QueryOptionsBox>
      </div>
    );
  }
});

module.exports = StemsQueryOptions;

//