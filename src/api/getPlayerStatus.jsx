import moment from "moment";
import md5 from "md5";

export const getPlayerStatus = async (sessionId, player) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  return fetch(
    "/api" +
    "/getplayerstatusjson/" +
    process.env.NEXT_PUBLIC_DEV_ID +
      "/" +
      md5(
        process.env.NEXT_PUBLIC_DEV_ID +
          "getplayerstatus" +
          process.env.NEXT_PUBLIC_DEV_KEY +
          timestamp
      ) +
      "/" +
      sessionId +
      "/" +
      timestamp +
      "/" +
      player
    ).then((response) => {
    try {
      // If Server Error
      if (response.status >= 400) {
        return response.text().then(() => {
          throw new Error("Server responds with error!");
        });
      }
      // Return data
      return response.json();
    } catch (err) {
      console.log(err);
    }
  });
};
