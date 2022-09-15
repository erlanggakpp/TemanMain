const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helper/bcryptjs");
const { HTMLDateFormat } = require("../helper/customFormat.js");

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hashPassword("qwerty123"),
          firstName: "admin",
          lastName: "admin",
          address: "Jakarta",
          birthdate: "1990/01/01",
          profilePict: "https://i.pravatar.cc/300",
          instagramAccount: "@admin",
          twitterAccount: "@admin",
          phoneNumber: "0812345",
          gender: "Male",
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin2@mail.com",
          password: hashPassword("qwerty123"),
          firstName: "admin2",
          lastName: "admin2",
          address: "Jakarta",
          birthdate: "1990/01/01",
          profilePict: "https://i.pravatar.cc/300",
          instagramAccount: "@admin2",
          twitterAccount: "@admin2",
          phoneNumber: "0812345",
          gender: "Male",
          role: "Admin2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "visitor@mail.com",
          password: hashPassword("qwerty123"),
          firstName: "visitor",
          lastName: "visitor",
          address: "Jakarta",
          birthdate: "1990/01/01",
          profilePict: "https://i.pravatar.cc/300",
          instagramAccount: "@visitor",
          twitterAccount: "@visitor",
          phoneNumber: "0812345",
          gender: "Female",
          role: "Visitor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "visitor2@mail.com",
          password: hashPassword("qwerty123"),
          firstName: "visitor2",
          lastName: "visitor2",
          address: "Jakarta",
          birthdate: "1990/01/01",
          profilePict: "https://i.pravatar.cc/300",
          instagramAccount: "@visitor2",
          twitterAccount: "@visitor2",
          phoneNumber: "0812345",
          gender: "Female",
          role: "Visitor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      null
    );
  } catch (error) {
    expect(error).toBeInstanceOf(Object);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      "Users",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    );
  } catch (error) {
    expect(error).toBeInstanceOf(Object);
  }
});

describe("testing CRUD user server success", () => {
  it("read all user with access token => GET /users", () => {
    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        // console.log(response, "RESPONSES LOGIN");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app).get("/users").set("access_token", access_token);
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("create user => POST /users", () => {
    const data = {
      email: "temanmai123n@mail.com",
      password: hashPassword("qwerty123"),
      firstName: "Teman",
      lastName: "Main",
      address: "Jakarta",
      birthdate: "2022-09-05",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "TemanMain",
      twitterAccount: "TemanMain",
      phoneNumber: "089567435678",
      gender: "Male",
      role: "Admin",
    };

    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .post("/users")
          .set("access_token", access_token)
          .send(data)
          .then((response) => {
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
            expect(response.body).toHaveProperty("user", expect.any(Object));
          });
      });
  });

  it("show user => GET /users/:id", () => {
    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .get("/users/1")
          .set("access_token", access_token)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
          });
      });
  });

  it("update user => PUT /users/:id", () => {
    const data = {
      email: "admin2@mail.com",
      password: hashPassword("qwerty123"),
      firstName: "admin2 edited",
      lastName: "admin2 edited",
      address: "Jakarta",
      birthdate: HTMLDateFormat("01/01/1990"),
      profilePict: "https://i.pravatar.cc/300",
      instagramAccount: "@admin2",
      twitterAccount: "@admin2",
      phoneNumber: "0812345",
      gender: "Male",
      role: "Admin",
    };

    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .put("/users/2")
          .set("access_token", access_token)
          .send(data)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
          });
      });
  });

  it("delete user => DELETE /users/:id", () => {
    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .delete("/users/2")
          .set("access_token", access_token)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
          });
      });
  });
});

describe("testing CRUD user server failed", () => {
  it("All input must be filled error => POST /users", () => {
    const data = {
      email: "",
      password: hashPassword("qwerty123"),
      firstName: "Teman2",
      lastName: "Main2",
      address: "Jakarta",
      birthdate: "2022-09-05",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "TemanMain2",
      twitterAccount: "TemanMain2",
      phoneNumber: "089567435678",
      gender: "Female",
      role: "Visitor",
    };

    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .post("/users")
          .set("access_token", access_token)
          .send(data)
          .then((response) => {
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("error", expect.any(String));
          });
      });
  });

  it("Invalid email format error => POST /users", () => {
    const data = {
      email: "temanmainmailcom",
      password: hashPassword("qwerty123"),
      firstName: "Teman",
      lastName: "Main",
      address: "Jakarta",
      birthdate: "2022-09-05",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "TemanMain",
      twitterAccount: "TemanMain",
      phoneNumber: "089567435678",
      gender: "Male",
      role: "Admin",
    };

    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .post("/users")
          .set("access_token", access_token)
          .send(data)
          .then((response) => {
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("error", expect.any(String));
          });
      });
  });

  it("Email already registered error => POST /users", () => {
    const data = {
      email: "visitor@mail.com",
      password: hashPassword("qwerty123"),
      firstName: "Teman",
      lastName: "Main",
      address: "Jakarta",
      birthdate: "2022-09-05",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "TemanMain",
      twitterAccount: "TemanMain",
      phoneNumber: "089567435678",
      gender: "Male",
      role: "Admin",
    };

    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .post("/users")
          .set("access_token", access_token)
          .send(data)
          .then((response) => {
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("error", expect.any(String));
          });
      });
  });

  it("User not found error => POST /users", () => {
    const dataLogin = { email: "admin@mail.com", password: "qwerty123" };
    let access_token;

    return request(app)
      .post("/users/login")
      .send(dataLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
        access_token = response.body.access_token;
      })
      .then(() => {
        return request(app)
          .get("/users/100")
          .set("access_token", access_token)
          .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("error", expect.any(String));
          });
      });
  });

  it("Read all user without access token => GET /users", () => {
    return request(app)
      .get("/users")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("Read all user with invalid access token => GET /users", () => {
    let invalid_access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW50ZXN0QG1haWwuY29tIiwiaWF0IjoxNjYyNzI4NzM1fQ.s7iYpgbgBCslvhOtP6p67jpdqiG6HoudiVDoU";
    return request(app)
      .get("/users")
      .set("access_token", invalid_access_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });
});

describe("testing auth user server success", () => {
  it("register user admin => POST /users/register", () => {
    const data = {
      email: "Admintest@mail.com",
      password: hashPassword("qwerty123"),
      firstName: "Admin",
      lastName: "Test",
      address: "Jakarta",
      birthdate: "2022-10-23",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "@AdminTest",
      twitterAccount: "AdminTest",
      phoneNumber: "089567435678",
      gender: "Female",
    };

    return request(app)
      .post("/users/register")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty("user", expect.any(Object));
      });
  });

  it("login user admin => POST /users/login", () => {
    const data = {
      email: "admin@mail.com",
      password: "qwerty123",
    };

    return request(app)
      .post("/users/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
      });
  });

  it("register user visitor => POST /users/public/register", () => {
    const data = {
      email: "Visitortest@mail.com",
      password: hashPassword("qwerty123"),
      firstName: "Visitor",
      lastName: "Test",
      address: "Jakarta",
      birthdate: "2022-10-23",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "@VisitorTest",
      twitterAccount: "VisitorTest",
      phoneNumber: "089567435678",
      gender: "Female",
    };

    return request(app)
      .post("/users/public/register")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty("user", expect.any(Object));
      });
  });

  it("login user visitor => POST /users/public/login", () => {
    const data = {
      email: "visitor@mail.com",
      password: "qwerty123",
    };

    return request(app)
      .post("/users/public/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("age", expect.any(Number));
        expect(response.body).toHaveProperty("gender", expect.any(String));
      });
  });
});

describe("testing auth user server failed", () => {
  it("All input must be filled error register user admin => POST /users/register", () => {
    const data = {
      email: "",
      password: hashPassword("qwerty123"),
      firstName: "Admin",
      lastName: "Test",
      address: "",
      birthdate: "2022-10-23",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "@AdminTest",
      twitterAccount: "AdminTest",
      phoneNumber: "089567435678",
      gender: "Female",
    };

    return request(app)
      .post("/users/register")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("All field must be filled error login user admin => POST /users/login", () => {
    const data = {
      email: "admin2@mail.com",
      password: "",
    };

    return request(app)
      .post("/users/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("Wrong email or password login user admin => POST /users/login", () => {
    const data = {
      email: "admin2@mail.com",
      password: "12345",
    };

    return request(app)
      .post("/users/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("All input must be filled error register user visitor => POST /users/public/register", () => {
    const data = {
      email: "",
      password: hashPassword("qwerty123"),
      firstName: "Visitor",
      lastName: "Test",
      address: "Jakarta",
      birthdate: "2022-10-23",
      profilePict:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      instagramAccount: "@VisitorTest",
      twitterAccount: "",
      phoneNumber: "089567435678",
      gender: "",
    };

    return request(app)
      .post("/users/public/register")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("All field must be filled error login user visitor => POST /users/public/login", () => {
    const data = {
      email: "",
      password: "qwerty123",
    };

    return request(app)
      .post("/users/public/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });

  it("Wrong email or password login user visitor => POST /users/public/login", () => {
    const data = {
      email: "visi@mail.com",
      password: "12345",
    };

    return request(app)
      .post("/users/public/login")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("error", expect.any(String));
      });
  });
});
