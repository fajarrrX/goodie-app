const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { generate, verify } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let access_token;
let access_token_customer;
let idOutlet;

beforeAll(async (done) => {
  try {
    const user = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hash("123456", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "owner@mail.com",
          password: hash("123456", 10),
          role: "owner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    if (user) {
      // console.log(user);
      access_token = generate({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });
      access_token_customer = generate({
        id: user[1].id,
        email: user[1].email,
        role: user[1].role,
      });
      console.log(access_token, "<<< punya admin");
      console.log(access_token_customer, "<<< punya customer");
      done();
    }
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Outlets", null, {});
    done();
  } catch (error) {
    done(error);
  }
});

//CREATE
//Success test case
describe("Create Outlet POST /outlets", () => {
  describe("Success Create", () => {
    test("response with access token", (done) => {
      request(app)
        .post("/outlets")
        .set("access_token", access_token)
        .send({
          name: "StarBucket",
          phone_number: "08123456789",
          address: "jakarta",
          image_url:
            "test"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", "StarBucket");
          expect(body).toHaveProperty(
            "image_url",
            "test"
          );
          expect(body).toHaveProperty("phone_number", "08123456789");
          expect(body).toHaveProperty("address", "jakarta");
          expect(body).toHaveProperty("id");
          idOutlet = body.id;
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Create Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .post("/outlets")
        .set("access_token", "")
        .send({
          name: "StarBucket",
          phone_number: "08123456789",
          address: "jakarta",
          image_url:
            "test"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });

  describe("Error Create Because You're not an Admin", () => {
    test("You Should login first to get admin token", (done) => {
      request(app)
        .post("/outlets")
        .set("access_token", access_token_customer)
        .send({
          name: "StarBucket",
          phone_number: "08123456789",
          address: "jakarta",
          image_url:
            "test"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "You're not authorized");
          done();
        });
    });
  });

  describe("Error Create Because Sequelize Validation", () => {
    test("Fields Outlet Cannot be Empty", (done) => {
      request(app)
        .post("/outlets")
        .set("access_token", access_token)
        .send({
          name: "",
          phone_number: "",
          address: "",
          image_url:
            ""
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Name of outlet must be filled!" },
          ]);
          done();
        });
    });
  });
});

//READ
//Success test cases
describe("Read outlets GET /outlets", () => {
  describe("Success Read", () => {
    test("Response with access token", (done) => {
      request(app)
        .get("/outlets")
        .set("access_token", access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty("outlet");
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Read Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .get("/outlets")
        .set("access_token", "")
        .send({
          name: "StarBucket",
          phone_number: "08123456789",
          address: "jakarta",
          image_url:
            "test"
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });
});
