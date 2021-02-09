import AppSettings from "../Settings/AppSettings";
import ServiceWrapper from "../Services/ServiceWrapper";

class SlackNotifier {
  static notify(message, success = true) {
    try {
      if (!AppSettings.SLACK_NOTOFICATION_ENABLED) return;

      var username = "DB Promoter : Success";
      var emoji = ":thumbsup";
      if (!success) {
        username = "DB Promoter : Failure";
        emoji = ":octagonal_sign";
      }
      var api_base_url = AppSettings.SLACK_NOTIFICATION_WEBHOOK;
      // const ret = ServiceWrapper.doPost(api_base_url, {
      //   text: message,
      // });
      const rawResponse = fetch(api_base_url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // This will appear as user name who posts the message
          text: message,
          icon_emoji: emoji, // User icon, you can also use custom icons here
        }),
      });
    } catch (error) {
    } finally {
    }
  }
}

export default SlackNotifier;
