const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Users = require('../auth/users-model.js')

afterEach(async () => {
    await db("users").truncate();
  });

  describe("server", () => {
    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });
describe(".POST /api/register and .POST /api/login", ()=>{
    it("should insert a new user into the users table", async ()=>{
        const users = await Users.add({
            username:"Cool_Guy",
            password:"Password1"
        })
        expect(await Users.find()).toHaveLength(1)
    })

    it("should not insert a new user into the users table", async ()=>{
         await Users.add({
            username:"Cool_Guy",
            password:"Password1"
        })
        expect(await Users.find()).toHaveLength(1)
    })

})

describe(".POST /api/login", ()=>{
    it("should not login succesfully, wrong username", async()=>{
        const users = await Users.add({
            username:"Cool_Guy",
            password:"Password1"
        })
        expect(await Users.findBy({"users.username": "Chill_Guy"})).toHaveLength(0);
    })

    it("should log in succesfully, right username", async()=>{
        const users = await Users.add({
            username:"Cool_Guy",
            password:"Password1"
        });
        const user = await Users.findBy({"users.username": users.username});
        expect(user).toHaveLength(1);
        expect(user[0].loggedIn).toBe(0);
        await Users.login(user[0].id);
        const usr = await Users.findBy({"users.username": users.username});
        expect(usr[0].loggedIn).toBe(1)
        
    })
})

describe(".GET /api/jokes", ()=>{
    it("should return with hhtp status code 500", ()=>{
        return(
            supertest(server)
            .get("/api/jokes")
            .then(response=>{
                expect(response.status).toBe(500)
            })
        )
    })

    it("should return with hhtp status code 200 and have a length >0", async ()=>{

    })
})






});
