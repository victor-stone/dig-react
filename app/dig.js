import React  from 'react';
import env    from './services/env';
import routes from './routes/dig';
import App    from './app';

import {
          Header,
          Footer
        } from './components/dig';

var rewriteRules = [
  { regex: /^\/free_music/,                  now: '/free' },
  { regex: /^\/music_for_film_and_video/,    now: '/film' },
  { regex: /^\/video/,                       now: '/film' },
  { regex: /^\/podcast_music/,               now: '/free'},
  { regex: /^\/hot/,                         now: '/edpicks'},
  { regex: /^\/top/,                         now: '/edpicks'},
  { regex: /^\/dig\?u=([0-9a-zA-Z]+)/,       now: '/people/$1'},
  { regex: /^\/keep-ccmixter-open-and-free/, now: '/news/206102' },
];

env.set({
  routes,
  rewriteRules,
  supportPlaylist: true,
  supportWavImg: false,
  bannerTopic: 'digBanner',
//  rpcHost: 'http://ccm/api/',
//  queryHost: 'http://ccm/api/query?',
//  queriesHost: 'http://ccm/api/queries?',

});


module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
