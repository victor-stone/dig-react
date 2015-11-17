import router from './services/router';
import env    from './services/env';
import routes from './routes/pells';
import App    from './app';
import qc     from './models/query-configs';
import Topics from './stores/topics';

import {
          PellQueryOptions,
          PellsHeader,
          DigFooter
        } from './components';

env.Header          = PellsHeader;
env.Footer          = DigFooter;
env.AppQueryOptions = PellQueryOptions;

env.bannerTopic = Topics.namedTopics.pellsBanner;

qc.default = qc.pells;

var rewriteRules = [
/*
  { regex: /^\/files\/([^\/]+)\/([^\/]+)/, now: '/pells?selected=$2&u=$1' },
  { regex: /^\/people\/([^\/]+)$/,         now: '/pells?u=$1' },
*/
];
router.addRoutes( routes, rewriteRules );

module.exports = App;
