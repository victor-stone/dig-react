/*
  Usage pattern for stores:

    permissions object MUST have an 'canEdit' boolean 

    implement a nullPermissions property that returns a default 
    permissions object.  e.g: { canEdit: false }

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
    this._permissionsProxy = null;
  }

  get permissions() {
    if( this._permissionsProxy ) {
      return this._permissionsProxy.permissions;
    }
    return Object.assign({},this._permissions);
  }

  set permissions(perms) {
    if( this._permissionsProxy ) {
      this._permissionsProxy.permissions = perms;
    } else {
      Object.assign(this._permissions,perms);  
    }
  }

  set permissionsProxy(p) {
    this._permissionsProxy = p;
  }

};

module.exports = Permissions;