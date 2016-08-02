import events       from 'models/events';
import env          from 'services/env';
import AudioService from '../services/audio-player';

module.exports = function() {

  AudioService.on( events.NOW_PLAYING, function(upload) {
    window.ga('send', 'event', 'Audio', 'play', env.appName + '-' + upload.name  );
  });

  env.on( events.DOWNLOAD, function(upload) {
    window.ga('send', 'event', 'File', 'download', env.appName + '-' + upload.name  );
  });

};