import React            from 'react';
import InlineCss        from '../vanilla/inline-css';
import css              from './style/feed';
import Feed             from './feed';
import StickyStore       from '../../stores/userfeed';

var StickyFeed = React.createClass({
  getInitialState() {
    return { store: null };
  },

  componentWillMount() {
    var store = new StickyStore();
    store.getStickyItems().then( () => this.setState({store}) );
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store !== nextState.store;
  },

  render() {
      return (this.state.store
        ? <Feed className="sticky" store={this.state.store} />
        : null 
      );
  }
});

function FeedPage(props) {
    return (<div>
              <InlineCss css={css} id="feed-css" />
              <StickyFeed />
              <Feed {...props} />
            </div>);
}

module.exports = FeedPage;

//
