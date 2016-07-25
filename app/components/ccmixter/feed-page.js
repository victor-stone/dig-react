import React            from 'react';
import InlineCSS        from '../vanilla/InlineCSS';
import css              from './style/feed';
import Feed             from './Feed';
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
              <InlineCSS css={css} id="feed-css" />
              <StickyFeed />
              <Feed {...props} />
            </div>);
}

module.exports = FeedPage;

//
