/* globals $ */
import React                  from 'react';
import { debounce }           from '../unicorns';
import { QueryParamTracker,
         DefaultParamTracker,
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
  return tags.filter(TAG_FILTER).toString();
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

  mixins: [QueryParamTracker, DirtyParamTracker, DefaultParamTracker],

  componentDidMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      // var noUiSlider = require('nouislider');

      var slider = document.getElementById('bpmSlider');

      window.noUiSlider.create(slider, {
        start: this.state.bpmVal,
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
      slider.noUiSlider.set( this.state.bpmVal );
      $('.noUi-pips-horizontal div:nth-child(2)').html('all');
    }
  },

  componentDidUpdate: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var nus = document.getElementById('bpmSlider').noUiSlider;
      nus.set( this.state.bpmVal );
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
      isDirty.isDirty = !!queryParams.oneof.filter(TAG_FILTER).getLength();
    }
  },

  onGetParamsDefault: function(queryParams) {
    queryParams.oneof.remove( queryParams.oneof.filter(TAG_FILTER) );
  },
  
  stateFromParams: function(queryParams) {
    return { bpmVal: valueFromTags(queryParams.oneof) };
  },

  applyBpm: debounce( function(val) {
      
      var old_tag = tagFromValue(this.state.bpmVal);
      var new_tag = tagFromValue(val);
      var qptags  = this.props.store.queryParams.oneof;
      var oneof   = qptags.replace(old_tag,new_tag).toString();

      this.applyHardParams( { oneof } );

    }, DEBOUNCE_APPLY_BPM ),

  onSlide: function(val) {
    this.applyBpm(val);
  },

  render: function() {
    return <div className="bpm-slider-container"><div id="bpmSlider"></div></div>;
  }

});

var BPMDisplay = React.createClass({

  mixins: [QueryParamTracker],

  stateFromParams: function(queryParams) {
    var bpmTag = tagsToBPMtag(queryParams.oneof);
    return { bpmTag };
  },

  render: function() {
    var val = '';
    if( this.state.bpmTag ) {
      val = this.state.bpmTag.replace( TAG_FILTER, '$1,$2' )
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