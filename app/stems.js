import React  from 'react';
import env    from './services/env';
import App    from './app';
import routes from './routes/stems';

import {
          StemsHeader as Header,
          StemsFooter as Footer
        } from './components';

var rewriteRules = [
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/stems?ids=$2' },
  { regex: /^\/people\/([^\/]+)\/.*$/,     now: '/people/$1' },
];

env.set( {
  routes,
  rewriteRules,
  bannerTopic: 'stemsBanner',
  supportPlaylist: false,
  supportWavImg: false,
});

module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
