const axios = require("axios");
const redis = require("../helper/redis.js");
const fetch = require("node-fetch");

class InvitationController {
  static async createInvitation(req, res) {
    try {
      const { id } = req.user;
      const { eventId, magnetId, userId } = req.params;
      const { invitationDescription } = req.body;
      const { access_token } = req.headers;
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:4002/invitations/event/${eventId}/magnet/${magnetId}/user/${userId}`,
        data: {
          invitationDescription,
        },
        headers: {
          user_id: id,
        },
      });
      const targetUserId = +userId;
      const currentUserId = +id;
      // console.log(data, "<<<<<<<<<<<<");
      let usersCache = await redis.get("user:users");
      if (usersCache) {
        usersCache = JSON.parse(usersCache);
      } else {
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
          headers: {
            access_token,
          },
        });
        await redis.set("user:users", JSON.stringify(users));
        usersCache = users;
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
        await redis.del("event:events");
      }
      const targetEvent = eventsCache.find((el) => el.id === +eventId);
      const targetUser = usersCache.find((el) => el.id === targetUserId);
      const currentUser = usersCache.find((el) => el.id === currentUserId);
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer pk_prod_R6NNEYEZ5QMY2CNTVK56Z4DFCNJ4",
        },
        body: JSON.stringify({
          message: {
            to: {
              email: targetUser.email,
            },
            template: "3WG2ZA3SC64VRHPMNMBKJWNX1QJT",
            data: {
              name: currentUser.firstName,
              userTargetName: targetUser.firstName,
              url: targetEvent.eventHomepageLink,
              eventName: targetEvent.name,
              imageLink: targetEvent.image,
            },
          },
        }),
      };

      fetch("https://api.courier.com/send", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async editInvitation(req, res) {
    try {
      const { invitationId } = req.params;
      const { id } = req.user;
      const { invitationDescription } = req.body;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}`,
        data: {
          invitationDescription,
        },
        headers: {
          user_id: id,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
  static async getInvitationByUserId(req, res) {
    try {
      const { id: userId } = req.user;
      const { access_token } = req.headers;

      const { data } = await axios({
        method: "GET",
        url: `http://localhost:4002/invitations/user`,
        headers: {
          user_id: userId,
        },
      });
      let usersCache = await redis.get("user:users");
      if (usersCache) {
        usersCache = JSON.parse(usersCache);
      } else {
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
          headers: {
            access_token,
          },
        });
        await redis.set("user:users", JSON.stringify(users));
        usersCache = users;
      }
      data.forEach((el) => {
        const targetUser = usersCache.find((user) => el.UserId === user.id);
        const invitor = usersCache.find((user) => el.Magnet.UserId === user.id);
        el.User = targetUser;
        el.Invitor = invitor;
      });
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }

  static async acceptInvitation(req, res) {
    try {
      const { invitationId } = req.params;
      const { id: userId } = req.user;
      const { access_token } = req.headers;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}/accept`,
        headers: {
          user_id: userId,
        },
      });
      const { data: targetInvitation } = await axios({
        method: "GET",
        url: `http://localhost:4002/invitations/${invitationId}`,
        headers: {
          user_id: userId,
        },
      });
      const targetUserId = +targetInvitation.Magnet.UserId;
      const currentUserId = +userId;
      let usersCache = await redis.get("user:users");
      if (usersCache) {
        usersCache = JSON.parse(usersCache);
      } else {
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
          headers: {
            access_token,
          },
        });
        await redis.set("user:users", JSON.stringify(users));
        usersCache = users;
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
        await redis.del("event:events");
      }
      const targetEvent = eventsCache.find(
        (el) => el.id === +targetInvitation.EventId
      );
      const targetUser = usersCache.find((el) => el.id === targetUserId);
      const currentUser = usersCache.find((el) => el.id === currentUserId);
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer pk_prod_R6NNEYEZ5QMY2CNTVK56Z4DFCNJ4",
        },
        body: JSON.stringify({
          message: {
            to: {
              email: targetUser.email,
            },
            template: "02YW4ZXY264QSPNF34D5ZP6J2M6C",
            data: {
              name: currentUser.firstName,
              userTargetName: targetUser.firstName,
              url: targetEvent.eventHomepageLink,
              eventName: targetEvent.name,
              imageLink: targetEvent.image,
            },
          },
        }),
      };

      fetch("https://api.courier.com/send", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }

  static async removeInvitedParticipant(req, res) {
    try {
      const { invitationId } = req.params;
      const { access_token } = req.headers;
      const { id: userId } = req.user;
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:4002/invitations/${invitationId}/reject`,
        headers: {
          user_id: userId,
        },
      });
      const { data: targetInvitation } = await axios({
        method: "GET",
        url: `http://localhost:4002/invitations/${invitationId}`,
        headers: {
          user_id: userId,
        },
      });
      const targetUserId = +targetInvitation.UserId;
      const currentUserId = +userId;
      let usersCache = await redis.get("user:users");
      if (usersCache) {
        usersCache = JSON.parse(usersCache);
      } else {
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
          headers: {
            access_token,
          },
        });
        await redis.set("user:users", JSON.stringify(users));
        usersCache = users;
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
        await redis.del("event:events");
      }
      const targetEvent = eventsCache.find(
        (el) => el.id === +targetInvitation.EventId
      );
      const targetUser = usersCache.find((el) => el.id === targetUserId);
      const currentUser = usersCache.find((el) => el.id === currentUserId);

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer pk_prod_R6NNEYEZ5QMY2CNTVK56Z4DFCNJ4",
        },
        body: JSON.stringify({
          message: {
            to: {
              email: targetUser.email,
            },
            template: "A5MNPVQQHQM5DSKXRMCQS5X9S7AJ",
            data: {
              name: currentUser.firstName,
              userTargetName: targetUser.firstName,
              url: targetEvent.eventHomepageLink,
              eventName: targetEvent.name,
              imageLink: targetEvent.image,
            },
          },
        }),
      };

      fetch("https://api.courier.com/send", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;

      res.status(status).json(data);
    }
  }
}

module.exports = InvitationController;
