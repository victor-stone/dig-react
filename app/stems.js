import React  from 'react';
import env    from './services/env';
import App    from './app';
import routes from './routes/stems';

import {
          StemsHeader as Header,
          StemsFooter as Footer
        } from './components';

var rewriteRules = [
/*
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/pells?selected=$2&u=$1' },
  { regex: /^\/people\/([^\/]+)$/,         now: '/pells?u=$1' },
*/
];

env.set( {
  routes,
  rewriteRules,
  supportPlaylist: false,
  supportWavImg: false,
  // bannerTopic: 'pellsBanner',
});

module.exports = function() { return <App header={Header} footer={Footer} />; };
