import React  from 'react';
import env    from './services/env';
import routes from './routes/pells';
import App    from './app';

import {
          Header,
          Footer
        } from './components/pells';

var rewriteRules = [
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/,   now: '/people/$1' },
  { regex: /^\/keep-ccmixter-open-and-free/, now: '/news/206102' },
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'pellsBanner',
  supportPlaylist: false,
  supportWavImg: true,
});

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
