import React  from 'react';
import env    from './services/env';
import routes from './routes/pells';
import App    from './app';

import {
          PellsHeader as Header,
          PellsFooter  as Footer
        } from './components';

var rewriteRules = [
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/pells?selected=$2&u=$1' },
  { regex: /^\/people\/([^\/]+)$/,         now: '/pells?u=$1' },
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'pellsBanner',
  supportPlaylist: false,
  supportWavImg: true,
});

module.exports = function() { return <App header={Header} footer={Footer} />; };
