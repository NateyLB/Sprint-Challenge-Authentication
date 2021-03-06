const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";


module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },

testing: {
  client: "sqlite3",
  connection: {
    filename: "./database/test.db3",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
},

// heroku postgres
production: {
  client: "pg", // npm i pg
  connection: pgConnection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
},
};
