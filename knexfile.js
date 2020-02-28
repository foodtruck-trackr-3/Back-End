// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run(`PRAGMA foreign_keys = ON`, done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run(`PRAGMA foreign_keys = ON`, done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
