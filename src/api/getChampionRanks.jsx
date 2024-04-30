import moment from "moment";
import md5 from "md5";

export const getChampionRanks = async (sessionId, playerId) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  return fetch(
    "/api/getchampionranksjson/" +
    process.env.NEXT_PUBLIC_DEV_ID +
    "/" +
    md5(
      process.env.NEXT_PUBLIC_DEV_ID +
        "getchampionranks" +
        process.env.NEXT_PUBLIC_DEV_KEY +
        timestamp
    ) +
    "/" +
    sessionId +
    "/" +
    timestamp +
    "/" +
    playerId
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
