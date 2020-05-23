const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  login, 
  findById,
};

function find() {
  return db("users")
    .select("users.id", "users.username")
    .orderBy("users.id");
}

function findBy(filter) {
  return db("users")
     .where(filter)
     .orderBy("users.id");
}

function findById(id) {
    return db("users").where({ id }).first();
  }

function login(id) {
    return db("users").where({ id }).update({ loggedIn: true})
}

async function add(user) {
  try {
    const [id] = await db("users").insert({username: user.username, password: user.password }, "id");
    
    return findById(id);
  } catch (error) {
    throw error;
  }
}



