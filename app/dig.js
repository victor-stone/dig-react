import React  from 'react';
import env    from './services/env';
import routes from './routes/dig';
import App    from './app';

import Header from './components/dig/Header';
import Footer from './components/dig/Footer';

var rewriteRules = [
  { regex: /^\/faq/,                         now: '/news/230791' },
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
});


module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
