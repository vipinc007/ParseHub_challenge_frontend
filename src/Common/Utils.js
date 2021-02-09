import AppSettings from "../Settings/AppSettings";

class Utils {
  static isEmpty(value) {
    return (
      value === null || value === undefined || value.toString().trim() === ""
    );
  }

  static appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  static replace_all(str, findchar, replacechar) {
    return str.split(findchar).join(replacechar);
  }

  static get_current_root_url() {
    return window.location.origin + "/";
  }

  static isNumeric(num) {
    return !isNaN(num);
  }

  static get_environment(envid) {
    let tempVar = JSON.parse(JSON.stringify(AppSettings.SERVER_ENVIRONMENTS));
    let envitem = tempVar.filter((p) => p.id === envid);
    if (envitem.length === 1) return envitem[0];
    return null;
  }
  static get_environment_name(envid) {
    let env = this.get_environment(envid);
    if (env === null) return null;
    return env.name;
  }

  static get_environment_btnClass(envid) {
    let env = this.get_environment(envid);
    if (env === null) return null;
    return env.btnClass;
  }

  static get_environment_badgeClass(envid) {
    let env = this.get_environment(envid);
    if (env === null) return null;
    return env.badgeClass;
  }

  static async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static SetWindowTitle(title) {
    window.document.title = "DBPromoter : " + title;
  }

  static enableFeatherPlugin() {
    window["ProcessFeatherPlugins"]();
    this.ProcessToolTips();
  }

  static OpenTheModal(id) {
    window["OpenTheModal"](id);
  }

  static ProcessToolTips(id) {
    window["ProcessToolTips"]();
  }
}

export default Utils;
