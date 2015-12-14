import React  from 'react';
import env    from './services/env';
import App    from './app';
import routes from './routes/playlists';

import {
          Header,
          Footer
        } from './components/playlists';

var rewriteRules = [
/*
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/playlists?ids=$2' },
  { regex: /^\/people\/([^\/]+)\/.*$/,     now: '/people/$1' },
*/
];

env.set( {
  routes,
  rewriteRules,
  //bannerTopic: 'playlistsBanner',
  supportPlaylist: true,
  supportWavImg: false,
});

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
