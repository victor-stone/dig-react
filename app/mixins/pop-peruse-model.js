import lookup from '../services';

const PopPeruseModel = target => class extends target {

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    lookup('env').set({perusingModel:null});
  }
};

module.exports = PopPeruseModel;