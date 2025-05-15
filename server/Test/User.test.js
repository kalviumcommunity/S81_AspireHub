const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/user_test_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await User.deleteMany(); // Clean up after each test
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Drop the test database
  await mongoose.connection.close(); // Close the connection
});

describe("User API", () => {
  it("GET /api/users - should return empty array initially", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // Initially, the users array should be empty
  });

  it("POST /api/users - should create a new user", async () => {
    const newUser = {
      username: "john123",
      password: "securepass",
    };

    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.username).toBe("john123");
  });

  it("PUT /api/users/:id - should update an existing user", async () => {
    const user = await User.create({
      username: "oldname",
      password: "123456",
    });

    const res = await request(app).put(`/api/users/${user._id}`).send({
      username: "newname",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("newname");
  });

  it("PUT /api/users/:id - should return 400 if ID is invalid", async () => {
    const res = await request(app)
      .put("/api/users/invalid-id")
      .send({ username: "failUser" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/users - should return all users", async () => {
    const user1 = new User({
      username: "john123",
      password: "password1",
    });
    await user1.save();

    const user2 = new User({
      username: "jane456",
      password: "password2",
    });
    await user2.save();

    const res = await request(app).get("/api/users");



    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].username).toBe("john123");
    expect(res.body[1].username).toBe("jane456");

  });



});
