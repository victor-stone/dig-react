import lookup            from '../services';

var PopPeruseModel = {

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    lookup('env').set({perusingModel:null});
  },
};

module.exports = PopPeruseModel;