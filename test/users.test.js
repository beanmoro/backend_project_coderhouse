import mongoose from "mongoose";
import envConfig from "../src/config/env.config.js";
import userRepository from "../src/persistences/mongo/repositories/user.repository.js";
import { expect } from "chai";

mongoose.connect(envConfig.MONGO_URL);

describe("Test User Repository", ()=>{

    it("Get all users", async()=>{
        const users = await userRepository.getAll();
        expect(users).to.be.an("array");
    });
    let userId;
    let userEmail;

    it("Create a user", async()=>{
        const newUser = {
            first_name: "Test user",
            last_name: "Test",
            email: "test_user@test.com",
            password: "123",
            age: 20
        };

        const user = await userRepository.create(newUser);
        userId = user._id;
        userEmail = user.email;

        expect(user.first_name).to.equal("Test user");
        expect(user.last_name).to.equal("Test");
        expect(user.email).to.equal("test_user@test.com");
        expect(user.password).to.equal("123");
        expect(user.role).to.equal("user");
    });

    it("Get a user by id", async()=>{
        const user = await userRepository.getById(userId);
        expect(user).to.be.an("object");
        expect(user.email).to.equal("test_user@test.com");
        expect(user.password).to.not.equal("asdasdasds");
        expect(user.password).to.not.an("number");
    });

    it("Get a user by email", async()=>{
        const user = await userRepository.getByEmail(userEmail);
        expect(user).to.be.an("object");
        expect(user.email).to.equal("test_user@test.com");
        expect(user.password).to.not.equal("asdasdasd");
        expect(user.password).to.not.an("number");
    });


    it("Update user", async()=>{
        const user = await userRepository.update(userId, {
            first_name: "User update",
            last_name: "Update",
            age: 50
        });

        expect(user.first_name).to.equal("User update");
        expect(user.last_name).to.equal("Update");
        expect(user.age).to.not.equal(20);
    });

    it("Delete a user by id", async()=>{
        await userRepository.deleteOne(userId);
        const user = await userRepository.getById(userId);
        expect(user).to.be.null;
    });

    after(async () => {
        mongoose.disconnect();
    });

});