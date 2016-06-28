import React  from 'react';
import env    from './services/env';
import routes from './routes/ccmixter';
import App    from './app';

import Header from './components/ccmixter/Header';
import Footer from './components/ccmixter/Footer';


var rewriteRules = [
];

env.set({
  routes,
  rewriteRules,
  supportPlaylist: true,
  supportWavImg: true,
//  bannerTopic: 'digBanner',

});


module.exports = function(props) { return <App {...props} header={Header} footer={Footer} />; };
