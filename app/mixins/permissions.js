import events from '../models/events';

/*
  Usage pattern for stores:

    permissions object MUST have an 'isOwner' boolean 

    implement a nullPermissions property that returns a default 
    permissions object.  e.g: { isOwner: false }

    impelemnt getPermissions(model)  method that psuedos:
      api.user.currentUser()
        .then( () => this.permissions = <calculated permissions> )
        .then( () => model )

    call getPermssions(model) as soon you get the model
      this.query()
        .then( serialize )
        .then( this.getPermission )

*/
const Permissions = target => class extends target {

  constructor() {
    super(...arguments);
    this._permissions = {};
    this.permissions = this.nullPermissions;
  }

  getCurrentUser() {
    return this._permissions.user;
  }

  set currentUser(user) {
    this._permissions.user = user;
    if( this.resourceOwner ) {
        this.emit(events.OWNERSHIP_CHANGED);
    }
  }

  get permissions() {
    return Object.assign({},this._permissions);
  }

  set permissions(perms) {
    Object.assign(this._permissions,perms);
  }

};

module.exports = Permissions;