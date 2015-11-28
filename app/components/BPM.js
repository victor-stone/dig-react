/* globals $ */
import React                  from 'react';
import { debounce }           from '../unicorns';
import { QueryParamsTracker,
         DirtyParamTracker }  from '../mixins';

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
  return tags.filter(TAG_FILTER);
}

function valueFromTag(tag) {
  return Number(tag.replace(TAG_FILTER, '$1'));
}

function valueFromTags(tags) {
  return valueFromTag( tags.filter(TAG_FILTER).toString() );
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

  mixins: [QueryParamsTracker, DirtyParamTracker],

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      // var noUiSlider = require('nouislider');

      var slider = document.getElementById('bpmSlider');

      window.noUiSlider.create(slider, {
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

  componentDidUpdate: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var nus = document.getElementById('bpmSlider').noUiSlider;
      nus.set( this.state.bpm );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var nus = document.getElementById('bpmSlider').noUiSlider;
      nus.off('slide');
      nus.destroy();
    }
  },

  onAreParamsDirty: function(queryParams,defaults,isDirty) {
    if( !isDirty.isDirty ) {
      isDirty.isDirty = queryParams.tags.filter(TAG_FILTER).getLength();
    }
  },

  stateFromParams: function(queryParams) {
    return { bpm: valueFromTags(queryParams.reqtags) };
  },

  applyBpm: debounce( function(val) {
      
      var old_tag = tagFromValue(this.state.bpm);
      var new_tag = tagFromValue(val);
      var qptags  = this.props.store.queryParams.reqtags;
      var reqtags = qptags.replace(old_tag,new_tag).toString();

      this.applyHardParams( { reqtags } );

    }, DEBOUNCE_APPLY_BPM ),

  onSlide: function(val) {
    this.applyBpm(val);
  },

  render: function() {
    var bpm = valueFromTags(this.state.bpm);
    return <div className="bpm-slider-container"><input name="bpm" type="hidden" value={bpm} /><div id="bpmSlider"></div></div>;
  }

});

var BPMDisplay = React.createClass({

  mixins: [QueryParamsTracker],

  stateFromStore: function(store) {
    var bpm = tagsToBPMtag(store.model.queryParams.reqtags);
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