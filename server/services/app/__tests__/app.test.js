const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { Categories } = require("../DB MANTAP.json");
const { events } = require("../DB MANTAP.json");
const { magnets } = require("../DB MANTAP.json");
const { users } = require("../DB MANTAP.json");
const { requests } = require("../DB MANTAP.json");
const { invitations } = require("../DB MANTAP.json");
beforeAll(async () => {
  try {
    Categories.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    events.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    magnets.forEach((el) => {
      console.log(el);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    users.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    requests.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.status = "Not Accepted";
    });
    invitations.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.status = "Not Accepted";
    });
    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Categories", Categories, {});
    await queryInterface.bulkInsert("Events", events, {});
    await queryInterface.bulkInsert("Magnets", magnets, {});
    await queryInterface.bulkInsert("Requests", requests, {});
    await queryInterface.bulkInsert("Invitations", invitations, {});
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Events", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Magnets", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Requests", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Invitations", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("GET /requests/user", () => {
  describe("GET /requests/user - Success", () => {
    it("Should return array of requests from specific user", async () => {
      const response = await request(app).get("/requests/user").set({
        user_id: 1,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Array));
      expect(response.status).toBe(200);
    });
  });
});

describe("POST /requests/event/:eventId/magnet/:magnetId", () => {
  describe("POST /requests/event/:eventId/magnet/:magnetId - Success", () => {
    it("Should return 'Successfully created request'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty(
        "message",
        "Successfully created request"
      );
    });
  });
  describe("POST /requests/event/:eventId/magnet/:magnetId - Error", () => {
    it("Should return 'Request already made for this magnet'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 4,
        })
        .send(payload);
      const response = await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 4,
        })
        .send(payload);
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty(
        "message",
        "Request already made for this magnet"
      );
    });

    it("Should return 'Your age  doesn't meet Magnet's age requirement'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 15,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Your age doesn't meet Magnet's age requirement"
      );
    });
    it("Should return 'Request description is required'", async () => {
      const payload = {
        requestDescription: "",
      };
      const response = await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Request description is required"
      );
    });
    it("Should return 'Request description is required'", async () => {
      const payload = {};
      const response = await request(app)
        .post("/requests/event/1/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Request description is required"
      );
    });

    it("Should return 'Event not found'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .post("/requests/event/99/magnet/1")
        .set({
          target_user_age: 19,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Event not found");
    });
    it("Should return 'Magnet not found'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .post("/requests/event/1/magnet/19")
        .set({
          target_user_age: 19,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Magnet not found");
    });
  });
});

describe("GET /requests/:requestId", () => {
  describe("GET /requests/:requestId - Success", () => {
    it("Should return object of specific request", async () => {
      const response = await request(app).get("/requests/public/1");
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("UserId", expect.any(Number));
      expect(response.body).toHaveProperty("EventId", expect.any(Number));
      expect(response.body).toHaveProperty("MagnetId", expect.any(Number));
      expect(response.body).toHaveProperty("status", expect.any(String));
      expect(response.body).toHaveProperty(
        "requestDescription",
        expect.any(String)
      );
    });
  });
  describe("GET /requests/:requestId - Error", () => {
    it("Should return 'Request not found'", async () => {
      const response = await request(app).get("/requests/public/99");
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Request not found");
    });
  });
});
describe("PUT /requests/:requestId", () => {
  describe("PUT /requests/:requestId - Success", () => {
    it("Should return 'Successfully edited request'", async () => {
      const payload = {
        requestDescription: "TESTAJADULU",
      };
      const response = await request(app)
        .put("/requests/1")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited request"
      );
    });
  });
  describe("PUT /requests/:requestId - Error", () => {
    it("Should return 'Request description is required'", async () => {
      const payload = {
        requestDescription: "",
      };
      const response = await request(app)
        .put("/requests/1")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Request description is required"
      );
    });
    it("Should return 'Request description is required'", async () => {
      const payload = {};
      const response = await request(app)
        .put("/requests/1")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty(
        "message",
        "Request description is required"
      );
    });

    it("Should return 'Request not found'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .put("/requests/99")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty("message", "Request not found");
    });
    it("Should return 'You are not authorized to edit/delete this request!'", async () => {
      const payload = {
        requestDescription: "TEST",
      };
      const response = await request(app)
        .put("/requests/1")
        .set({
          target_user_age: 19,
          user_id: 8,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this request!"
      );
    });
  });
});

describe("PUT /requests/:requestId/accept", () => {
  describe("PUT /requests/:requestId/accept - Success", () => {
    it("Should return 'Accepted request'", async () => {
      const response = await request(app).put("/requests/1/accept").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("message", "Accepted request");
    });
  });
  describe("PUT /requests/:requestId/accept - Error", () => {
    it("Should return 'Invitation not found'", async () => {
      const response = await request(app).put("/requests/100/accept").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Request not found");
    });
    it("Should return 'You are not authorized to accept this request!'", async () => {
      const response = await request(app).put("/requests/1/accept").set({
        user_id: 4,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to accept this request!"
      );
    });
    it("Should return 'There is no empty slot for this magnet'", async () => {
      const payload = {
        requestDescription: "TEST",
      };

      await request(app)
        .post("/requests/event/1/magnet/4")
        .set({
          target_user_age: 19,
          user_id: 4,
        })
        .send(payload);
      await request(app)
        .post("/requests/event/1/magnet/4")
        .set({
          target_user_age: 19,
          user_id: 3,
        })
        .send(payload);
      await request(app)
        .post("/requests/event/1/magnet/4")
        .set({
          target_user_age: 19,
          user_id: 2,
        })
        .send(payload);
      await request(app).put("/requests/2/accept").set({
        user_id: 5,
      });
      await request(app).put("/requests/3/accept").set({
        user_id: 5,
      });
      const response = await request(app).put("/requests/4/accept").set({
        user_id: 5,
      });

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "There is no empty slot for this magnet"
      );
    });
  });
});

describe("PUT /requests/:requestId/reject", () => {
  describe("PUT /requests/:requestId/reject - Success", () => {
    it("Should return 'Accepted request'", async () => {
      const response = await request(app).put("/requests/1/reject").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully cancelled invitation"
      );
    });
  });
  describe("PUT /requests/:requestId/reject - Error", () => {
    it("Should return 'Request not found'", async () => {
      const response = await request(app).put("/requests/100/reject").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Request not found");
    });
    it("Should return 'You are not authorized to accept this request!'", async () => {
      const response = await request(app).put("/requests/1/reject").set({
        user_id: 4,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to accept this request!"
      );
    });
  });
});

describe("DELETE /requests/:requestId", () => {
  describe("DELETE /requests/:requestId - Error", () => {
    it("Should return 'Request not found'", async () => {
      const response = await request(app).delete("/requests/99").set({
        target_user_age: 19,
        user_id: 5,
      });

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty("message", "Request not found");
    });
    it("Should return 'You are not authorized to edit/delete this request!'", async () => {
      const response = await request(app).delete("/requests/1").set({
        target_user_age: 19,
        user_id: 8,
      });

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this request!"
      );
    });
  });
  describe("DELETE /requests/:requestId - Success", () => {
    it("Should return 'Successfully deleted request'", async () => {
      const response = await request(app).delete("/requests/1").set({
        target_user_age: 19,
        user_id: 5,
      });
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));

      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted request"
      );
    });
  });
});

describe("GET /invitations", () => {
  describe("GET /invitations - Success", () => {
    it("Should return array of invitations for specific user", async () => {
      const response = await request(app).get("/invitations/user").set({
        user_id: 1,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Array));
      expect(response.status).toBe(200);
    });
  });
});
describe("POST /invitations/event/:eventId/magnet/:magnetId/user/:userId", () => {
  describe("POST /invitations/event/:eventId/magnet/:magnetId/user/:userId - Success", () => {
    it("Should return 'Successfully created invitation'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };
      const response = await request(app)
        .post("/invitations/event/1/magnet/1/user/4")
        .set({
          target_user_age: 19,
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty(
        "message",
        "Successfully created invitation"
      );
    });
  });
  describe("POST /invitations/event/:eventId/magnet/:magnetId/user/:userId - Error", () => {
    it("Should return 'User that you're trying to invite doesn't meet your Magnet's age requirement'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };
      const response = await request(app)
        .post("/invitations/event/1/magnet/1/user/4")
        .set({
          target_user_age: 15,
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "User that you're trying to invite doesn't meet your Magnet's age requirement"
      );
    });
    it("Should return 'Invitation description is required'", async () => {
      const payload = {
        invitationDescription: "",
      };
      const response = await request(app)
        .post("/invitations/event/1/magnet/4/user/4")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Invitation description is required"
      );
    });
    it("Should return 'Invitation description is required'", async () => {
      const payload = {};
      const response = await request(app)
        .post("/invitations/event/1/magnet/4/user/4")
        .set({
          target_user_age: 19,
          user_id: 5,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Invitation description is required"
      );
    });
    it("Should return 'Event not found'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };
      const response = await request(app)
        .post("/invitations/event/99/magnet/1/user/4")
        .set({
          target_user_age: 19,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Event not found");
    });
    it("Should return 'Magnet not found'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };
      const response = await request(app)
        .post("/invitations/event/1/magnet/10/user/4")
        .set({
          target_user_age: 19,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Magnet not found");
    });
  });
});

describe("GET /invitations/:invitationId", () => {
  describe("GET /invitations/:invitationId - Success", () => {
    it("Should return object of specific request", async () => {
      const response = await request(app).get("/invitations/1");
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("UserId", expect.any(Number));
      expect(response.body).toHaveProperty("EventId", expect.any(Number));
      expect(response.body).toHaveProperty("MagnetId", expect.any(Number));
      expect(response.body).toHaveProperty("status", expect.any(String));
      expect(response.body).toHaveProperty(
        "invitationDescription",
        expect.any(String)
      );
    });
  });
  describe("GET /requests/:invitationId - Error", () => {
    it("Should return 'Invitation not found'", async () => {
      const response = await request(app).get("/invitations/99");
      // console.log(response.body, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Invitation not found");
    });
  });
});
describe("PUT /invitations/:invitationId", () => {
  describe("PUT /invitations/:invitationId - Success", () => {
    it("Should return 'Successfully edited invitation'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };
      const response = await request(app)
        .put("/invitations/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited invitation"
      );
    });
    it("Should return 'Successfully edited invitation'", async () => {
      const payload = {
        invitationDescription: "TEST AJA DULU",
      };
      const response = await request(app)
        .put("/invitations/1")
        .send(payload)
        .set({ user_id: 3 });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Object));
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited invitation"
      );
    });
  });
  describe("PUT /invitations/:invitationId - Error", () => {
    it("Should return 'Invitation description is required'", async () => {
      const payload = {
        invitationDescription: "",
      };
      const response = await request(app)
        .put("/invitations/1")
        .send(payload)
        .set({ user_id: 3 });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Invitation description is required"
      );
    });
    it("Should return 'Invitation description is required'", async () => {
      const payload = {};
      const response = await request(app)
        .put("/invitations/1")
        .send(payload)
        .set({ user_id: 3 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Invitation description is required"
      );
    });
  });
});
describe("PUT /invitations/:invitationId/accept", () => {
  describe("PUT /invitations/:invitationId/accept - Success", () => {
    it("Should return 'Accepted invitation'", async () => {
      const response = await request(app).put("/invitations/1/accept").set({
        user_id: 4,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("message", "Accepted invitation");
    });
  });
  describe("PUT /invitations/:invitationId/accept - Error", () => {
    it("Should return 'Invitation not found'", async () => {
      const response = await request(app).put("/invitations/100/accept").set({
        user_id: 4,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Invitation not found");
    });
    it("Should return 'You are not authorized to accept this invitation!'", async () => {
      const response = await request(app).put("/invitations/1/accept").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to accept this invitation!"
      );
    });
    it("Should return 'You are not authorized to accept this invitation!'", async () => {
      const response = await request(app).put("/invitations/1/accept").set({
        user_id: 4,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Invitation already accepted"
      );
    });
    it("Should return 'There is no empty slot for this magnet'", async () => {
      const payload = {
        invitationDescription: "TEST",
      };

      await request(app)
        .post("/invitations/event/1/magnet/3/user/5")
        .set({
          target_user_age: 21,
          user_id: 4,
        })
        .send(payload);
      const response = await request(app).put("/invitations/2/accept").set({
        user_id: 5,
      });
      console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "There is no empty slot for this magnet"
      );
    });
  });
});
describe("PUT /invitations/:invitationId/reject", () => {
  describe("PUT /invitations/:invitationId/reject - Success", () => {
    it("Should return 'Successfully cancelled invitation'", async () => {
      const response = await request(app).put("/invitations/1/reject").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty(
        "message",
        "Successfully cancelled invitation"
      );
    });
  });
  describe("PUT /invitations/:invitationId/reject - Error", () => {
    it("Should return 'Invitation not found'", async () => {
      const response = await request(app).put("/invitations/100/reject").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Invitation not found");
    });
    it("Should return 'You are not authorized to edit/delete this invitation!'", async () => {
      const response = await request(app).put("/invitations/1/reject").set({
        user_id: 5,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this invitation!"
      );
    });
  });
});

describe("DELETE /invitations/:invitationId", () => {
  describe("DELETE /invitations/:invitationId - Success", () => {
    it("Should return 'Successfully deleted invitation'", async () => {
      const response = await request(app).delete("/invitations/1").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted invitation"
      );
    });
  });
  describe("DELETE /invitations/:invitationId - Error", () => {
    it("Should return 'Invitation not found'", async () => {
      const response = await request(app).delete("/invitations/100").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);

      expect(response.body).toHaveProperty("message", "Invitation not found");
    });
    it("Should return 'You are not authorized to edit/delete this invitation!'", async () => {
      const response = await request(app).delete("/invitations/2").set({
        user_id: 1,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);

      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this invitation!"
      );
    });
  });
});

describe("GET /magnets/user", () => {
  describe("GET /magnets/user - Success", () => {
    it("Should return array of magnets that created by specific user", async () => {
      const response = await request(app).get("/magnets/user").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Array));
      expect(response.status).toBe(200);
    });
  });
  describe("GET /magnets/user- Error", () => {
    it("Should return 'Can't find magnet list'", async () => {
      const response = await request(app).get("/magnets/user").set({
        user_id: 1,
      });
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Object));
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Can't find magnet list");
    });
  });
});
describe("GET /magnets/:magnetId", () => {
  describe("GET /magnets/:magnetId - Success", () => {
    it("Should return object of specific magnet", async () => {
      const response = await request(app).get("/magnets/1");
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("UserId", expect.any(Number));
      expect(response.body).toHaveProperty("EventId", expect.any(Number));
      expect(response.body).toHaveProperty(
        "confirmationDate",
        expect.any(String)
      );
      expect(response.body).toHaveProperty("status", expect.any(Boolean));
      expect(response.body).toHaveProperty(
        "ageRequirement",
        expect.any(String)
      );
      expect(response.body).toHaveProperty(
        "specialRequirement",
        expect.any(String)
      );
      expect(response.body).toHaveProperty(
        "magnetDescription",
        expect.any(String)
      );
      expect(response.body).toHaveProperty("participant", expect.any(Number));
      expect(response.body).toHaveProperty(
        "vacantParticipant",
        expect.any(Number)
      );
    });
  });
  describe("GET /magnets/:magnetId - Error", () => {
    it("Should return 'Magnet not found'", async () => {
      const response = await request(app).get("/magnets/99");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toEqual(expect.any(Object));
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Magnet not found");
    });
  });
});
describe("POST /magnets", () => {
  describe("POST /magnets - Success", () => {
    it("Should return 'Successfully created new magnet'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/03",
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty(
        "message",
        "Successfully created new magnet"
      );
    });
  });
  describe("POST /magnets - Error", () => {
    it("Should return 'Confirmation date is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "",
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };

      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Confirmation date is required"
      );
    });
    it("Should return 'Confirmation date is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);

      expect(response.body).toHaveProperty(
        "message",
        "Confirmation date is required"
      );
    });
    it("Should return 'Age requirement is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/05",
        ageRequirement: "",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Age requirement is required"
      );
    });
    it("Should return 'Age requirement is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/05",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Age requirement is required"
      );
    });
    it("Should return 'Magnet description is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/03",
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Magnet description is required"
      );
    });
    it("Should return 'Magnet description is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/03",
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Magnet description is required"
      );
    });
    it("Should return 'Special requirement is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/05",
        ageRequirement: 30,
        specialRequirement: "",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Special requirement is required"
      );
    });
    it("Should return 'Special requirement is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "2022/10/05",
        magnetDescription: "TEST",
        ageRequirement: 30,
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app).post("/magnets").send(payload);
      expect(response.status).toBe(400);

      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Special requirement is required"
      );
    });
  });
});
describe("PUT /magnets", () => {
  describe("PUT /magnets - Success", () => {
    it("Should return 'Successfully edited magnet'", async () => {
      const payload1 = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
        status: false,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload1);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited magnet"
      );
    });
  });
  describe("PUT /magnets - Error", () => {
    it("Should return 'You are not authorized to edit/delete this magnet!'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 2,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this magnet!"
      );
    });
    it("Should return 'Magnet not found'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/99")
        .set({
          user_id: 2,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Magnet not found");
    });
    it("Should return 'Confirmation date is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        confirmationDate: "",
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      expect(response.status).toBe(400);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.body).toHaveProperty(
        "message",
        "Confirmation date is required"
      );
    });
    it("Should return 'Confirmation date is required'", async () => {
      const payload = {
        UserId: 5,
        EventId: 3,
        status: true,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 6,
        vacantParticipant: 3,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Confirmation date is required"
      );
    });
    it("Should return 'Age requirement is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Age requirement is required"
      );
    });
    it("Should return 'Age requirement is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Age requirement is required"
      );
    });
    it("Should return 'Magnet description is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Magnet description is required"
      );
    });
    it("Should return 'Magnet description is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Magnet description is required"
      );
    });
    it("Should return 'Special requirement is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Special requirement is required"
      );
    });
    it("Should return 'Special requirement is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Special requirement is required"
      );
    });
    it("Should return 'Participant number is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 0,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Participant number is required"
      );
    });
    it("Should return 'Participant number is required'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: false,
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Participant number is required"
      );
    });
    it("Should return 'Please choose whether you want to open or close this magnet'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        status: "",
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please choose whether you want to open or close this magnet"
      );
    });
    it("Should return 'Please choose whether you want to open or close this magnet'", async () => {
      const payload = {
        confirmationDate: "2022/10/03",
        ageRequirement: "18",
        specialRequirement: "Male or Female",
        magnetDescription: "TEST",
        participant: 3,
        vacantParticipant: 2,
      };
      const response = await request(app)
        .put("/magnets/1")
        .set({
          user_id: 3,
        })
        .send(payload);
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please choose whether you want to open or close this magnet"
      );
    });
  });
});
describe("DELETE /magnets", () => {
  describe("DELETE /magnets - Success", () => {
    it("Should return 'Successfully deleted magnet'", async () => {
      const response = await request(app).delete("/magnets/1").set({
        user_id: 3,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted magnet"
      );
    });
  });
  describe("DELETE /magnets - Error", () => {
    it("Should return 'Magnet not found'", async () => {
      const response = await request(app).delete("/magnets/99").set({
        user_id: 2,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Magnet not found");
    });
    it("Should return 'You are not authorized to edit/delete this magnet!'", async () => {
      const response = await request(app).delete("/magnets/2").set({
        user_id: 1,
      });
      // console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "You are not authorized to edit/delete this magnet!"
      );
    });
  });
});
describe("GET /events", () => {
  describe("GET /events - Success", () => {
    it("Should return array of events", async () => {
      const response = await request(app).get("/events");
      // console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });
});
describe("GET /events/:eventId", () => {
  describe("GET /events/:eventId - Success", () => {
    it("Should return object of event", async () => {
      const response = await request(app).get("/events/4");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("location", expect.any(String));
      expect(response.body).toHaveProperty("description", expect.any(String));
      expect(response.body).toHaveProperty("location", expect.any(String));
      expect(response.body).toHaveProperty("CategoryId", expect.any(Number));
      expect(response.body).toHaveProperty("AdminId", expect.any(Number));
      expect(response.body).toHaveProperty("ticketPrice", expect.any(Number));
      expect(response.body).toHaveProperty("eventDate", expect.any(String));
      expect(response.body).toHaveProperty("eventDuration", expect.any(String));
      expect(response.body).toHaveProperty(
        "eventHomepageLink",
        expect.any(String)
      );
    });
  });
  describe("GET /events/:eventId - Error", () => {
    it("Should return 'Event not found'", async () => {
      const response = await request(app).get("/events/99");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Event not found");
    });
  });
});
describe("GET /events/category/:categoryId", () => {
  describe("GET /events/category/:categoryId - Success", () => {
    it("Should return list of events from specific category", async () => {
      const response = await request(app).get("/events/category/1");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });
  describe("GET /events/category/:categoryId - Error", () => {
    it("Should return 'Category not found'", async () => {
      const response = await request(app).get("/events/category/99");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Category not found");
    });
  });
});
describe("POST /events", () => {
  describe("POST /events - Success", () => {
    it("Should return 'Successfully created new event'", async () => {
      const payload = {
        User: 1,
        CategoryId: 1,
        name: "Soundsfest",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully created new event"
      );
    });
  });
  describe("POST /events - Error", () => {
    it("Should return 'Please choose event's category'", async () => {
      const payload = {
        CategoryId: "",
        name: "Soundsfest",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Please choose event's category"
      );
    });
    it("Should return 'Event's name is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's name is required"
      );
    });
    it("Should return 'Event's name is required'", async () => {
      const payload = {
        CategoryId: 1,
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's name is required"
      );
    });
    it("Should return 'Please choose event's category'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        location: "",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's location is required"
      );
    });
    it("Should return 'Event's description is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "",
        location: "Bogor",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's description is required"
      );
    });
    it("Should return 'Event's description is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        location: "Bogor",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's description is required"
      );
    });
    it("Should return 'Event's location is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's location is required"
      );
    });
    it("Should return 'Event's date is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDate: "",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's date is required"
      );
    });
    it("Should return 'Event's date is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        User: 1,
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's date is required"
      );
    });
    it("Should return 'Event's official homepage is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's official homepage is required"
      );
    });
    it("Should return 'Event's official homepage is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's official homepage is required"
      );
    });
    it("Should return 'Event's duration is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's duration is required"
      );
    });
    it("Should return 'Event's duration is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's duration is required"
      );
    });
    it("Should return 'Information of the event creator is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Information of the event creator is required"
      );
    });
    it("Should return 'Information of the event creator is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: "",
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Information of the event creator is required"
      );
    });
    it("Should return 'Event's ticket price is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's ticket price is required"
      );
    });
    it("Should return 'Event's ticket price is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
        ticketPrice: "",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's ticket price is required"
      );
    });
    it("Should return 'Event's image/photo is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "",
        ticketPrice: 2000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's image/photo is required"
      );
    });
    it("Should return 'Event's image/photo is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        User: 1,
        location: "Bogor",
        ticketPrice: 1000,
        eventDate: "2022/09/01",
      };
      const response = await request(app).post("/events").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's image/photo is required"
      );
    });
  });
});
describe("PUT /events/:eventId", () => {
  describe("PUT /events/:eventId - Success", () => {
    it("Should return 'Successfully edited event'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Test",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 4000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited event"
      );
    });
  });
  describe("PUT /events/:eventId - Error", () => {
    it("Should return 'Please choose event's category'", async () => {
      const payload = {
        CategoryId: "",
        name: "Soundsfest",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Please choose event's category"
      );
    });
    it("Should return 'Event's name is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "",
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's name is required"
      );
    });
    it("Should return 'Event's name is required'", async () => {
      const payload = {
        CategoryId: 1,
        location: "Bogor",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's name is required"
      );
    });
    it("Should return 'Please choose event's category'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        location: "",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's location is required"
      );
    });
    it("Should return 'Event's description is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "",
        location: "Bogor",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's description is required"
      );
    });
    it("Should return 'Event's description is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        location: "Bogor",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's description is required"
      );
    });
    it("Should return 'Event's location is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDate: "2022/01/01",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's location is required"
      );
    });
    it("Should return 'Event's date is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDate: "",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        User: 1,
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's date is required"
      );
    });
    it("Should return 'Event's date is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's date is required"
      );
    });
    it("Should return 'Event's official homepage is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's official homepage is required"
      );
    });
    it("Should return 'Event's official homepage is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "",
        eventDuration: "2 days",
        image: "dummy.com",
        ticketPrice: 3000,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's official homepage is required"
      );
    });
    it("Should return 'Event's duration is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's duration is required"
      );
    });
    it("Should return 'Event's duration is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "",
        image: "dummy.com",
        ticketPrice: 3000,
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's duration is required"
      );
    });
    it("Should return 'Event's ticket price is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's ticket price is required"
      );
    });
    it("Should return 'Event's ticket price is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "dummy.com",
        User: 1,
        location: "Bogor",
        eventDate: "2022/09/01",
        ticketPrice: "",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's ticket price is required"
      );
    });
    it("Should return 'Event's image/photo is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        image: "",
        ticketPrice: 2000,
        location: "Bogor",
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's image/photo is required"
      );
    });
    it("Should return 'Event's image/photo is required'", async () => {
      const payload = {
        CategoryId: 1,
        name: "Soundsfest",
        description: "Test",
        eventHomepageLink: "dummy.com",
        eventDuration: "2 days",
        User: 1,
        location: "Bogor",
        ticketPrice: 1000,
        eventDate: "2022/09/01",
      };
      const response = await request(app).put("/events/1").send(payload);
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Event's image/photo is required"
      );
    });
  });
});
describe("DELETE /events/:eventId", () => {
  describe("DELETE /events/:eventId - Success", () => {
    it("Should return 'Successfully deleted event'", async () => {
      const response = await request(app).delete("/events/4");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted event"
      );
    });
  });
  describe("DELETE /events/:eventId - Error", () => {
    it("Should return 'Event not found'", async () => {
      const response = await request(app).delete("/events/99");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Event not found");
    });
  });
});
describe("GET /categories", () => {
  describe("GET /categories - Success", () => {
    it("Should return array of categories", async () => {
      const response = await request(app).get("/categories");
      //   console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });
});
describe("GET /categories/:categoryId", () => {
  describe("GET /categories:categoryId - Success", () => {
    it("Should return object of specific category", async () => {
      const response = await request(app).get("/categories/1");
      //   console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("image", expect.any(String));
    });
  });
  describe("GET /categories:categoryId - Error", () => {
    it("Should return 'Ctaegory not found'", async () => {
      const response = await request(app).get("/categories/99");
      //   console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Category not found");
    });
  });
});
describe("POST /categories", () => {
  describe("POST /categories - Success", () => {
    it("Should return 'Successfully created new category'", async () => {
      const payload = {
        name: "Test",
        image: "Test",
      };

      const response = await request(app).post("/categories").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully created new category"
      );
    });
  });
  describe("POST /categories - Delete", () => {
    it("Should return 'Category's image is required'", async () => {
      const payload = {
        name: "Test",
        image: "",
      };

      const response = await request(app).post("/categories").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's image is required"
      );
    });
    it("Should return 'Category's image is required'", async () => {
      const payload = {
        name: "Test",
      };

      const response = await request(app).post("/categories").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's image is required"
      );
    });
    it("Should return 'Category's name is required'", async () => {
      const payload = {
        name: "",
        image: "Test",
      };

      const response = await request(app).post("/categories").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's name is required"
      );
    });
    it("Should return 'Category's name is required'", async () => {
      const payload = {
        image: "Test",
      };

      const response = await request(app).post("/categories").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's name is required"
      );
    });
  });
});
describe("PUT /categories", () => {
  describe("PUT /categories - Success", () => {
    it("Should return 'Successfully edited category'", async () => {
      const payload = {
        name: "Test123",
        image: "Test123",
      };

      const response = await request(app).put("/categories/1").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully edited category"
      );
    });
  });
  describe("PUT /categories - Error", () => {
    it("Should return 'Category's image is required'", async () => {
      const payload = {
        name: "Test",
        image: "",
      };

      const response = await request(app).put("/categories/1").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's image is required"
      );
    });
    it("Should return 'Category's image is required'", async () => {
      const payload = {
        name: "Test",
      };

      const response = await request(app).put("/categories/1").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's image is required"
      );
    });
    it("Should return 'Category's name is required'", async () => {
      const payload = {
        name: "",
        image: "Test",
      };

      const response = await request(app).put("/categories/1").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's name is required"
      );
    });
    it("Should return 'Category's name is required'", async () => {
      const payload = {
        image: "Test",
      };

      const response = await request(app).put("/categories/1").send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Category's name is required"
      );
    });
    it("Should return 'Category not found'", async () => {
      const payload = {
        image: "Test",
      };

      const response = await request(app)
        .delete("/categories/99")
        .send(payload);
      //   console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Category not found");
    });
  });
});
describe("DELETE /categories/:categoryId", () => {
  describe("DELETE /categories/:eventId - Success", () => {
    it("Should return 'Successfully deleted category'", async () => {
      const response = await request(app).delete("/categories/1");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted category"
      );
    });
  });
  describe("DELETE /categories/:eventId - Error", () => {
    it("Should return 'Category not found'", async () => {
      const response = await request(app).delete("/categories/99");
      //   console.log(response, "<<<<<<<<<<<<<<<< ini  response");
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Category not found");
    });
  });
});
