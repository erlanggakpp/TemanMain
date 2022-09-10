const redis = require("../helper/redis.js");
const axios = require("axios");

class EventController {
  static async getAllEvents(req, res) {
    try {
      const { access_token } = req.headers;
      let usersCache = await redis.get("user:users");
      if (usersCache) {
        // console.log("CACHE");
        usersCache = JSON.parse(usersCache);
      } else {
        // console.log("axiois");
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
          headers: {
            access_token,
          },
        });
        usersCache = users;
        await redis.set("user:users", JSON.stringify(users));
      }
      let eventsCache = await redis.get("event:events");
      if (eventsCache) {
        // console.log("CACHE");
        eventsCache = JSON.parse(eventsCache);
        await redis.del("event:events");
      } else {
        // console.log("axiois");
        const { data: events, status } = await axios({
          method: "GET",
          url: "http://localhost:4002/events",
        });
        eventsCache = events;
        await redis.set("event:events", JSON.stringify(events));
        // await redis.del("event:events");
      }

      res.status(200).json(eventsCache);
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async findOneEvent(req, res) {
    try {
      const { access_token } = req.headers;
      const { eventId } = req.params;
      const { data: event, status } = await axios({
        method: "GET",
        url: `http://localhost:4002/events/${eventId}`,
      });

      //   let usersCache = await redis.get("user:users");
      //   if (usersCache) {
      //     // console.log("CACHE");
      //     usersCache = JSON.parse(usersCache);
      //   } else {
      //     // console.log("axiois");
      //     const { data: users } = await axios({
      //       method: "GET",
      //       url: "http://localhost:4001/users",
      //       headers: {
      //         access_token,
      //       },
      //     });
      //     usersCache = users;
      //     await redis.set("user:users", JSON.stringify(users));
      //   }
      //   event.Magnets.forEach((magnet) => {
      //     const userTarget = usersCache.filter(
      //       (user) => user.id === magnet.UserId
      //     );
      //     magnet.User = userTarget;
      //   });
      res.status(status).json(event);
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
}

module.exports = EventController;
