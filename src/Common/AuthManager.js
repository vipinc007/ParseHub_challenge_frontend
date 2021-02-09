class AuthManager {
  static __session_storage_key = "Compatio.DB.Promoter.Logged.user.Object";
  static __session_storage_isAdmin_key =
    "Compatio.DB.Promoter.Logged.user.isAdmin.Object";
  static __session_storage_permissions_key =
    "Compatio.DB.Promoter.Logged.User.Permissions.Object";
  static __session_storage_sams_token_key = "Compatio.DB.Promoter.sams.Object";

  static setAuthUser(value) {
    sessionStorage.setItem(this.__session_storage_key, JSON.stringify(value));
  }
  static setSamsToken(value) {
    sessionStorage.setItem(this.__session_storage_sams_token_key, value);
  }
  static setAuthUser_IsAdmin(value) {
    sessionStorage.setItem(this.__session_storage_isAdmin_key, value);
  }

  static setPermissions(value) {
    sessionStorage.setItem(
      this.__session_storage_permissions_key,
      JSON.stringify(value)
    );
  }

  static getAuthUser_IsAdmin() {
    if (this.isIsAdminTokenReceived())
      return sessionStorage.getItem(this.__session_storage_isAdmin_key);
    return null;
  }

  static getPermissions() {
    if (this.isPermisisonsReceived())
      return JSON.parse(
        sessionStorage.getItem(this.__session_storage_permissions_key)
      );
    return null;
  }

  static getAuthUser() {
    if (this.isAuthenticated())
      return JSON.parse(sessionStorage.getItem(this.__session_storage_key));
    return null;
  }

  static getSamsToken() {
    if (this.isSamsTokenReceived())
      return sessionStorage.getItem(this.__session_storage_sams_token_key);
    return null;
  }

  static isAuthenticated() {
    return this.__session_storage_key in sessionStorage;
  }

  static isSamsTokenReceived() {
    return this.__session_storage_sams_token_key in sessionStorage;
  }

  static isIsAdminTokenReceived() {
    return this.__session_storage_isAdmin_key in sessionStorage;
  }

  static isPermisisonsReceived() {
    return this.__session_storage_permissions_key in sessionStorage;
  }

  static logoutUser() {
    if (this.isAuthenticated()) {
      sessionStorage.removeItem(this.__session_storage_key);
      sessionStorage.removeItem(this.__session_storage_sams_token_key);
      sessionStorage.removeItem(this.__session_storage_isAdmin_key);
      sessionStorage.removeItem(this.__session_storage_permissions_key);
    }
    sessionStorage.clear();
  }
}

export default AuthManager;
