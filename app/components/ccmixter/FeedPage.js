/*eslint "react/no-danger":0 */
import React            from 'react';
import InlineCSS        from '../InlineCSS';
import css              from './style/feed';
import Feed             from './Feed';
import StickyStore       from '../../stores/userfeed';

var StickyFeed = React.createClass({
  getInitialState() {
    return { sticky: null };
  },

  componentWillMount() {
    var stickyStore = new StickyStore();
    stickyStore.getStickyItems().then( () => this.setState({sticky:stickyStore}));
  },

  render() {
      return (this.state.sticky
        ? <Feed className="sticky" store={this.state.sticky} />
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
