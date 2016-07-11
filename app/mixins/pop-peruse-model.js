import lookup from '../services';

const PopPeruseModel = target => class extends target {

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    lookup('env').set({perusingModel:null});
  }
};

module.exports = PopPeruseModel;