import React                   from 'react';
import { AccordianPanel }      from '../Accordian';
import People                  from '../People';
import Ratings                 from '../../stores/ratings';
import { CurrentUserTracker,
         CollapsingModel,
         ModelTracker }        from '../../mixins';
import api                     from '../../services/ccmixter';
import Glyph                   from '../Glyph';

const RecommendsButton = React.createClass({

    mixins: [ ModelTracker, CurrentUserTracker ],

    shouldComponentUpdate(nextProps,nextState) {
      return this.state.okToRate !== nextState.okToRate;
    },

    stateFromStore(store) {
      var id = store.model.upload.id;
      this._calcState(id,this.state && this.state.user);
      return { id, okToRate: false };
    },

    stateFromUser(user) {
      this._calcState(this.state.id,user);
      return { okToRate: false, user };
    },

    _calcState(id,user) {
      if( id && user ) {
        api.upload.permissions(id,user.id).then( (permissions) => {
            this.setState({okToRate: permissions.okToRate});
          });        
      }
    },

    onRecommends() {
      this.setState({okToRate: false});
      this.props.store.performAction(api.upload.rate( this.state.id, this.state.user.id ));
    },

    render() {
      return (
          this.state.okToRate
            ? <button onClick={this.onRecommends} className="ratings pull-right"><Glyph icon="thumbs-up" /></button>
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
      <AccordianPanel disabled={!this.state.numItems} title={title} id="recc" icon="thumbs-o-up" headerContent={recButton} onOpen={this.onOpen} onClose={this.onClose} >
      {this.state.model && this.state.open
        ? <People.List className="recommends-list" icon model={this.state.model} />
        : null
      }
      </AccordianPanel>
    );
  }
});

module.exports = Recommends;

//