import rsvp           from 'rsvp';
import NowPlaying     from '../stores/nowplaying';
import NowPlayingPage from '../components/now-playing';

const nowplaying = Object.assign(NowPlayingPage,{
  title: 'Now Playing',
  store() {
    return rsvp.resolve( new NowPlaying() );
  }
});

module.exports = nowplaying;

