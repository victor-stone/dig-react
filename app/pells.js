import React  from 'react';
import env    from './services/env';
import routes from './routes/pells';
import App    from './app';

import {
          PellsHeader as Header,
          PellsFooter  as Footer
        } from './components';

var rewriteRules = [
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/people/$1' },
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'pellsBanner',
  supportPlaylist: false,
  supportWavImg: true,
});

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
