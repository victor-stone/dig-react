import React  from 'react';
import env    from './services/env';
import routes from './routes/dig';
import App    from './app';

import {
          DigHeader as Header,
          DigFooter as Footer
        } from './components';

var rewriteRules = [
  { regex: new RegExp(/^\/free_music/),                now: '/free' },
  { regex: new RegExp(/^\/music_for_film_and_video/),  now: '/film' },
  { regex: new RegExp(/^\/podcast_music/),             now: '/free'},
  { regex: new RegExp(/^\/hot/),                       now: '/edpicks'},
  { regex: new RegExp(/^\/top/),                       now: '/edpicks'},
  { regex: new RegExp(/^\/dig\?u=([0-9a-zA-Z]+)/),     now: '/people/$1'},
];

env.set({
  routes,
  rewriteRules,
  supportPlaylist: true,
  supportWavImg: false,
  bannerTopic: 'digBanner'
});

module.exports = function() { return <App header={Header} footer={Footer} />; };
