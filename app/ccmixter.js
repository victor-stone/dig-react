import React  from 'react';
import env    from './services/env';
import routes from './routes/ccmixter';

import header from './components/ccmixter/header';
import footer from './components/ccmixter/footer';


var rewriteRules = [
  { regex: /^\/keep-ccmixter-open-and-free/, now: '/news/206102' },
  { regex: /^\/events\/?$/,                  now: '/news/215025' }
];

env.set({
  routes,
  rewriteRules,
  header,
  footer,
  supportPlaylist: true,
  supportWavImg: true,
//  bannerTopic: 'digBanner',

});

const App = require('./app');

module.exports = function(props) { return <App {...props} />; };
