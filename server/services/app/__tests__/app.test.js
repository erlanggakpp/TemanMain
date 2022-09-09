const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { Categories } = require("../../../../db.json");
const { events } = require("../../../../db.json");
const { magnets } = require("../../../../db.json");
const { users } = require("../../../../db.json");
const { requests } = require("../../../../db.json");
const { invitations } = require("../../../../db.json");
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
    await queryInterface.bulkInsert("Events", events, {}),
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

describe("GET /events", () => {
  describe("GET /events - Success", () => {
    it("Should return array of events", async () => {
      const response = await request(app).get("/events");
      //   console.log(response.body);
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
    it("Should return 'Please choose event's category'", async () => {
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
