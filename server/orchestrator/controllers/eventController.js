const redis = require("../helper/redis.js");
const axios = require("axios");

class EventController {
  static async getAllEvents(req, res) {
    try {
      let eventsCache = await redis.get("event:events");
      if (eventsCache) {
        // console.log("CACHE");
        eventsCache = JSON.parse(eventsCache);
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
      event.Magnets.forEach((magnet) => {
        const userTarget = usersCache.filter(
          (user) => user.id === magnet.UserId
        );
        magnet.User = userTarget;
      });
      res.status(200).json(event);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
  static async getEventsbyCategory(req, res) {
    try {
      const { categoryId } = req.params;
      let categoriesCache = await redis.get("app:categories");

      if (categoriesCache) {
        categoriesCache = JSON.parse(categoriesCache);
      } else {
        const { data: categories } = await axios({
          method: "GET",
          url: "http://localhost:4002/categories",
        });
        await redis.set("app:categories", JSON.stringify(categories));
        categoriesCache = categories;
      }
      const targetCategory = categoriesCache.find(
        (el) => el.id === +categoryId
      );
      let eventsCache = await redis.get("event:events");
      if (eventsCache) {
        eventsCache = JSON.parse(eventsCache);
      } else {
        const { data: events, status } = await axios({
          method: "GET",
          url: "http://localhost:4002/events",
        });
        eventsCache = events;
        await redis.set("event:events", JSON.stringify(events));
        // await redis.del("event:events");
      }
      eventsCache = eventsCache.filter(
        (el) => el.CategoryId === targetCategory.id
      );
      res.status(200).json(eventsCache);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
  static async createEvent(req, res) {
    try {
      const {
        CategoryId,
        name,
        location,
        description,
        eventDate,
        eventHomepageLink,
        eventDuration,
        image,
        ticketPrice,
      } = req.body;
      const { id: User } = req.user;
      const { data: message, status } = await axios.post(
        "http://localhost:4002/events",
        {
          CategoryId,
          name,
          location,
          description,
          eventDate,
          eventHomepageLink,
          eventDuration,
          image,
          ticketPrice,
          User,
        }
      );
      await redis.del("event:events");
      res.status(status).json(message);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
  static async editEvent(req, res) {
    try {
      const { eventId } = req.params;
      const {
        CategoryId,
        name,
        location,
        description,
        eventDate,
        eventHomepageLink,
        eventDuration,
        image,
        ticketPrice,
      } = req.body;
      const { data: message, status } = await axios.put(
        `http://localhost:4002/events/${eventId}`,
        {
          CategoryId,
          name,
          location,
          description,
          eventDate,
          eventHomepageLink,
          eventDuration,
          image,
          ticketPrice,
        }
      );
      await redis.del("event:events");
      res.status(status).json(message);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
  static async deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { data: message, status } = await axios.delete(
        `http://localhost:4002/events/${eventId}`
      );
      await redis.del("event:events");
      res.status(status).json(message);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data);
    }
  }
}

module.exports = EventController;
