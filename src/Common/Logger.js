import AppSettings from "../Settings/AppSettings";
import ServiceWrapper from "../Services/ServiceWrapper";
import AuthManager from "./AuthManager";

class Logger {
  static async log(serverid, module, message) {
    if (!AppSettings.LOGS_ENABLED) return;

    let userid = 2;
    if (AuthManager.isAuthenticated()) {
      var userobj = AuthManager.getAuthUser();
      if (
        !(
          userobj === null ||
          userobj === undefined ||
          userobj.profile === null ||
          userobj.profile === undefined
        )
      )
        userid = userobj.profile.id;
    }
    var api_base_url = AppSettings.SAMS_API_URL;

    const ret = await ServiceWrapper.doPost(api_base_url + "dbp/log/write/", {
      userid: userid,
      serverid: serverid,
      module: module,
      message: message,
    });
  }
}

export default Logger;
