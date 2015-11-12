/* globals $ */
import React             from 'react';
import { debounce,
         TagString }     from '../unicorns';

import PlaylistUpdater      from '../mixins/playlist-updater';
import QueryParamTagsRotate from '../mixins/query-param-tags-rotate';

var TAG_FILTER = /^bpm_([0-9]{3})_([0-9]{3})$/;

const DEBOUNCE_APPLY_BPM = 200;
const MIN_BPM            = 60;
const MAX_BPM            = 130;
const BPM_ALL            = 55;
const SLIDER_STEPS       = 5;
const SLIDER_DENSITY     = 6;

const BPM_TAG_RANGE      = 5;

const BPM_NUM_PIPS       = 4;
const ONE_HUNDRED        = 100;

function genPips() {
  var pips = [ ];
  for( var i = 0; i < BPM_NUM_PIPS; i++ ) {
    pips.push( (ONE_HUNDRED / BPM_NUM_PIPS) * i );
  }
  pips.push( ONE_HUNDRED );
  return pips;
}

function tagsToBPMtag(tags) {
  return TagString.filter(tags,TAG_FILTER).toString();
}

function valueFromTag(tag) {
  return Number(tag.replace(TAG_FILTER, '$1'));
}

function tagFromValue(val) {
  function pad0(v) {
    return v < ONE_HUNDRED ? '0' + v : '' + v;
  }
  var bpm = '';
  if( val >= MIN_BPM ) {
    var lo = pad0(Number(val));
    var hi = pad0(Number(val)+BPM_TAG_RANGE);
    bpm = `bpm_${lo}_${hi}`;
  }
  return bpm;  
}

const BPMSlider = React.createClass({

  mixins: [QueryParamTagsRotate],

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var noUiSlider = require('nouislider');
      var slider = document.getElementById('bpmSlider');

      noUiSlider.create(slider, {
        start: valueFromTag(this.state.tag),
        step: SLIDER_STEPS,
        connect: 'lower',
        pips: {
            density: SLIDER_DENSITY,
            mode: 'positions',
            values: genPips(),
          },        
        range: {
          min: BPM_ALL,
          max: MAX_BPM
        }
      });      

      slider.noUiSlider.on('slide', this.onSlide );
      $('.noUi-pips-horizontal div:nth-child(2)').html('all');
    }
  },

  componentDidUpdate: function(prevProps,prevState) {
    if( this.state.tag !== prevState.tag ) {
      var nus = document.getElementById('bpmSlider').noUiSlider;
      nus.set( valueFromTag(this.state.tag) );
    }
  },

  componentWillUnmount: function() {
    var nus = document.getElementById('bpmSlider').noUiSlider;
    nus.off('slide');
    nus.destroy();
  },

  tagFilter: TAG_FILTER,
  paramName: 'tags',
  defaultParamValue: '',

  applyBpm: debounce( function(val) {
      var tag = tagFromValue(val);
      this.performQuery(tag);
    }, DEBOUNCE_APPLY_BPM ),

  onSlide: function(val) {
    this.applyBpm(val);
  },

  render: function() {
    return <div className="bpm-slider-container"><div id="bpmSlider"></div></div>;
  }

});

var BPMDisplay = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var bpm = tagsToBPMtag(store.model.queryParams.tags);
    return { bpm };
  },

  render: function() {
    var val = '';
    if( this.state.bpm ) {
      val = this.state.bpm.replace( TAG_FILTER, '$1,$2' )
                  .split(',')
                  .map( v => Number(v) )
                  .join( ' - ');
    } else {
      val = 'all';
    }
    return ( 
        <span>
          <span className="bpm-title">{"bpm "}</span>
          <span className="bpm">{val}</span>
        </span>
      );
  },

});

module.exports = {
  BPMDisplay,
  BPMSlider
};