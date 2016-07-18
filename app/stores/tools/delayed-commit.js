import Properties from './Properties';
import Eventer from '../../services/eventer';

/*
  Pretends to be store with properties

  Normally the store would commit each property
  assignment but this store will wait until 
  the 'commit' method is called to 
  commit the properties to the underlying wrapped 
  store
*/
class DelayedCommitStore extends Properties(Eventer)
{
  constructor(realStore) {
    super();
    this._realStore = realStore;
    this._changed = {};
    this._nativeProps = realStore.nativeProperties;
  }

  get nativeProperties() {    
    return this._nativeProps;
  }

  applyProperties(props) {
    Object.assign(this._nativeProps,props);
    Object.assign(this._changed,props);
  }

  commit() {
    this._realStore.applyProperties(this._changed);
  }

  get permissions() {
    return this._realStore.permissions;
  }
}

module.exports = DelayedCommitStore;