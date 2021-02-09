import AuthManager from "./AuthManager";

class PermissionsManager {
  constructor() {
    this.profileObj = AuthManager.getAuthUser();
  }
  hasPermission(permissionName) {
    if (this.checkIfUserIsAdmin()) return true;
    return this.checkPermission(permissionName);
  }

  checkIfUserIsAdmin() {
    // console.log("is admin check", AuthManager.getAuthUser_IsAdmin());

    if (AuthManager.getAuthUser_IsAdmin() == null) {
      // console.log("am in ");
      var isAdmin = false;
      // console.log("pobject", this.profileObj.profile.parties);
      for (var party of this.profileObj.profile.parties) {
        // console.log(party);
        for (var userType of party.usertypes) {
          for (var role of userType.roles) {
            if (role.name === "DBPromotion_Adminstrator") {
              isAdmin = true;
              break;
            }
          }
          if (isAdmin) break;
        }
        if (isAdmin) break;
      }

      AuthManager.setAuthUser_IsAdmin(isAdmin);
    }
    return AuthManager.getAuthUser_IsAdmin();
  }

  checkPermission(permissionName) {
    var per = AuthManager.getPermissions();
    // console.log(per);
    if (per[permissionName] !== null || per[permissionName] !== undefined)
      return per[permissionName];
    return false;
  }

  ProcessPermissions() {
    var dict = {};
    for (var party of this.profileObj.profile.parties) {
      for (var userType of party.usertypes) {
        for (var role of userType.roles) {
          for (var module of role.modules) {
            for (var permission of module.permissions) {
              dict[permission.name] = true;
            }
          }
        }
      }
    }
    AuthManager.setPermissions(dict);
    this.checkIfUserIsAdmin();
  }
}

export default PermissionsManager;
