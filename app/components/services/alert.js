import env from 'services/env';
import Alert from '../vanilla/alert';

Alert.show = function(type,msg) {
  env.alert(type,msg);
};

module.exports = Alert;

//