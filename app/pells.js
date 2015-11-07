import router from './services/router';
import env    from './services/env';
import routes from './routes/pells';
import App    from './app';
import qc     from './models/queryConfigs';
import {
          PellsHeader,
          DigFooter
        } from './components';

env.Header = PellsHeader;
env.Footer = DigFooter;

qc.default = qc.pells;

var rewriteRules = [
];

router.addRoutes( routes, rewriteRules );

module.exports = App;
