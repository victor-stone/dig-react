import router from './services/router';
import env    from './services/env';
import App    from './app';
import qc     from './models/query-configs';
//import Topics from './stores/topics';
import routes from './routes/stems';

import audio  from './services/audio-player';

import {
          StemsQueryOptions,
          StemsHeader,
          DigFooter
        } from './components';

env.Header          = StemsHeader;
env.Footer          = DigFooter;
env.AppQueryOptions = StemsQueryOptions;

//env.bannerTopic = Topics.namedTopics.pellsBanner;

audio.supportPlaylist = false;

qc.default = qc.samples;

var rewriteRules = [
/*
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/pells?selected=$2&u=$1' },
  { regex: /^\/people\/([^\/]+)$/,         now: '/pells?u=$1' },
*/
];
router.addRoutes( routes, rewriteRules );

module.exports = App;
