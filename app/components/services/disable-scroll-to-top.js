import env   from 'services/env';

const DisableScrollToTop = target => class extends target {
  componentWillMount() {
    env.disableAutoScroll = true;
  }

  componentWillUnmount() {
    env.disableAutoScroll = false;
  }

};

module.exports = DisableScrollToTop;