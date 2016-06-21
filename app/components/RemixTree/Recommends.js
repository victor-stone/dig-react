/* globals $ */
import React                   from 'react';
import { AccordianPanel }      from '../Accordian';
import People                  from '../People';
import Ratings                 from '../../stores/ratings';
import { CollapsingModel,
         ModelTracker }        from '../../mixins';
import Glyph                   from '../vanilla/Glyph';

const RecommendsButton = React.createClass({

    mixins: [ModelTracker],

    shouldComponentUpdate(nextProps,nextState) {
      return this.state.store.permissions.okToRate !== nextState.store.permissions.okToRate;
    },

    stateFromStore(store) {
      return { id: 'recc_' + store.model.upload.id, store };
    },

    onRecommends() {
      // http://stackoverflow.com/questions/17327668/best-way-to-disable-button-in-twitters-bootstrap
      $('#' + this.state.id).prop({disabled:true}).addClass('btn-disabled');
      this.state.store.recommend();
    },

    render() {
      return (
          this.state.store.permissions.okToRate
            ? <button id={this.state.id} onClick={this.onRecommends} className="ratings pull-right"><Glyph icon="thumbs-up" /></button>
            : null
        );
    }
});


var Recommends = React.createClass({

  mixins: [ModelTracker,CollapsingModel],

  componentWillReceiveProps(nextProps) {
    this.setState({ numItems: nextProps.numItems });
  },

  speakNow(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems;
  },

  stateFromStore(store) {
    return { id: store.model.upload.id, numItems: store.model.upload.numRecommends };
  },

  refreshModel(store) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    var id = store ? store.model.upload.id : this.state.id;
    return this.ratings.recommendedBy(id);
  },

  render() {
    var title = `Recommends (${this.state.numItems})`;
    var recButton = <RecommendsButton store={this.props.store} />;
    return (
      <AccordianPanel disabled={!this.state.numItems} 
                      title={title} 
                      id="recc" 
                      icon="thumbs-o-up" 
                      headerContent={recButton} 
                      onOpen={this.onOpen} o
                      nClose={this.onClose} 
      >
        {this.state.model && this.state.open
          ? <People.List className="recommends-list" thumb model={this.state.model} />
          : null
        }
      </AccordianPanel>
    );
  }
});

module.exports = Recommends;

//