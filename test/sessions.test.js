import { expect } from "chai";
import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import mongoose from "mongoose";
import { userModel } from "../src/persistences/mongo/models/user.model.js";
mongoose.connect(envConfig.MONGO_URL);

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Session Test", ()=>{

    it("[POST] /api/session/register this endpoint must register an user", async ()=>{
        const newUser = {
            first_name: "Test user",
            last_name: "Test",
            email: "test_user@test.com",
            password: "123",
            age: 20
        };

        const {status, _body, ok} = await requester.post("/api/session/register").send(newUser);
        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
    });

    let cookie;
    it("[POST] /api/session/login this endpoint must log in an user", async()=>{
        const loginUser = {
            email: "test_user@test.com",
            password: "123"
        };

        const {status, _body, ok, headers} = await requester.post("/api/session/login").send(loginUser);
        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        };

        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.first_name).to.be.equal("Test user");
        expect(_body.payload.email).to.be.equal("test_user@test.com");
        expect(_body.payload.role).to.be.equal("user");
    });

    it("[GET] /api/session/current this endpoint must show the user information", async()=>{
        const {status, _body, ok} = await requester.get("/api/session/current")
        .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.email).to.be.equal("test_user@test.com");
        expect(_body.payload.role).to.be.equal("user");
    });

    after(async()=>{
        await userModel.deleteOne({email: "test_user@test.com"});
        mongoose.disconnect();
    });

});
