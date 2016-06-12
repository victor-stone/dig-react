/* globals $ */
import React                   from 'react';
import { AccordianPanel }      from '../Accordian';
import People                  from '../People';
import Ratings                 from '../../stores/ratings';
import { CollapsingModel,
         UploadOwner,
         ModelTracker }        from '../../mixins';
import api                     from '../../services/ccmixter';
import Glyph                   from '../Glyph';

var nextRecommendsButtonId = 0;

const RecommendsButton = React.createClass({

    mixins: [ UploadOwner ],

    getInitialState() {
      return { id: 'reccbtn_' + ++nextRecommendsButtonId };
    },

    shouldComponentUpdate(nextProps,nextState) {
      return this.state.owner.okToRate !== nextState.owner.okToRate;
    },

    onRecommends() {
      // http://stackoverflow.com/questions/17327668/best-way-to-disable-button-in-twitters-bootstrap
      $('#' + this.state.id).prop({disabled:true}).addClass('btn-disabled');
      var o = this.state.owner;
      this.props.store.performAction(api.upload.rate( o.store.model.upload.id, o.user.id ));
    },

    render() {
      return (
          this.state.owner.okToRate
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