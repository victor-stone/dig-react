import React  from 'react';
import env    from './services/env';

var rewriteRules = [
  { regex: /^\/keep-ccmixter-open-and-free/, now: '/news/206102' },
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'playlistsBanner',
  supportPlaylist: true,
  supportWavImg: false
});

import App    from './app';
import routes from './routes/playlists';

import {
          Header,
          Footer
        } from './components/playlists';

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
