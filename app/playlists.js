import React  from 'react';
import env    from './services/env';

var rewriteRules = [
/*
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/playlists?ids=$2' },
  { regex: /^\/people\/([^\/]+)\/.*$/,     now: '/people/$1' },
*/
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'playlistsBanner',
  supportPlaylist: true,
  supportWavImg: false,
  //rpcHost: 'http://ccm/api/',
  //queryHost: 'http://ccm/api/query?',
});

import App    from './app';
import routes from './routes/playlists';

import {
          Header,
          Footer
        } from './components/playlists';

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
