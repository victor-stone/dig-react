import React                   from 'react';
import { AccordianPanel }      from '../Accordian';
import Ratings                 from '../../stores/ratings';
import { CurrentUserTracker,
         CollapsingModel,
         ModelTracker }        from '../../mixins';
import api                     from '../../services/ccmixter';
import Glyph                   from '../Glyph';

const RecommendsButton = React.createClass({

    mixins: [ CurrentUserTracker, ModelTracker ],

    getInitialState() {
      return { okToRate: false };
    },

    shouldComponentUpdate(nextProps,nextState) {
      return this.state.okToRate !== nextState.okToRate;
    },

    stateFromStore(store) {
      return { id: store.model.upload.id };
    },

    stateFromUser(user) {
      var id = this._getUloadId();
      if( id && user ) {
        api.upload.permissions(id,user.id).then( (permissions) => {
            this.setState({okToRate: permissions.okToRate, user});
          });
      }
      return { okToRate: false, user };
    },

    _getUloadId() {
      return (this.state && this.state.id) || this.props.store.model.upload.id;
    },

    onRecommends() {
      api.upload.rate( this.state.id, this.state.user.id ).then( () => this.setState({okToRate: false}));
    },

    render() {
      return (
          this.state.okToRate
            ? <button onClick={this.onRecommends} className="ratings"><Glyph icon="thumbs-up" /></button>
            : <span className="ratings"><Glyph icon="thumbs-o-up" /></span>
        );
    }
});


var Recommends = React.createClass({

  mixins: [ModelTracker,CollapsingModel],

  getInitialState() {
    return { numItems: this.props.numItems };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ numItems: nextProps.numItems });
  },

  speakNow(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems;
  },

  stateFromStore(store) {
    return { id: store.model.upload.id };
  },

  refreshModel(props) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    var id = props ? props.store.model.upload.id : this.state.id;
    return this.ratings.recommendedBy(id);
  },

  render() {
    var title = `Recommends (${this.state.numItems})`;
    var recButton = <RecommendsButton store={this.props.store} />;
    return (
      <AccordianPanel title={title} id="recc" icon="thumbs-o-up" headerContent={recButton} onOpen={this.onOpen} onClose={this.onClose} >
      {this.state.model && this.state.open
        ?<ul className="recommends-list">{this.state.model.map( (t,i) => <li key={i}>{t.name}</li> )}</ul>
        : null
      }
      </AccordianPanel>
    );
  }
});

module.exports = Recommends;

//