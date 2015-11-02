import router from './services/router';
import routes from './routes/dig';
import App    from './app';

var rewriteRules = [
  { regex: new RegExp(/^\/free_music/),                now: '/free' },
  { regex: new RegExp(/^\/music_for_film_and_video/),  now: '/film' },
  { regex: new RegExp(/^\/podcast_music/),             now: '/free'},
  { regex: new RegExp(/^\/hot/),                       now: '/edpicks'},
  { regex: new RegExp(/^\/top/),                       now: '/edpicks'},
  { regex: new RegExp(/^\/dig\?user=([0-9a-zA-Z]+)/),  now: '/people/$1'},
];

router.addRoutes( routes, rewriteRules );

module.exports = App;
