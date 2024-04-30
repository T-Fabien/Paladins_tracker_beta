import moment from "moment";
import md5 from "md5";

export const getChampionCards = async (sessionId, championId) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  return fetch(
    "/api/getchampioncardsjson/" +
    process.env.NEXT_PUBLIC_DEV_ID +
    "/" +
    md5(
      process.env.NEXT_PUBLIC_DEV_ID +
        "getchampioncards" +
        process.env.NEXT_PUBLIC_DEV_KEY +
        timestamp
    ) +
    "/" +
    sessionId +
    "/" +
    timestamp +
    "/" +
    championId +
    "/3"
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
