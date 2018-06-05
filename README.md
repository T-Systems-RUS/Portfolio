# T-Portfolio

[![Build Status](https://travis-ci.org/T-Systems-RUS/Portfolio.svg?branch=develop)](https://travis-ci.org/T-Systems-RUS/Portfolio)

## How to run

**PREREQUISITE**: Get PostgreSQL server locally or via docker:
`docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123 -d postgres` (where `123` is your `postgres` user password)

There are to possible scenarios to start the app:

### One process for client and server (easy to start with)

1. Run `yarn run client-server:install` to install both server and client dependencies

3. Run `yarn run db` to initialize database (tweak DB connection settings via`server/config/config.json`)

4. Run `yarn run client-server` to run both client and server in development watch mode. 


### Separate processes for client and server (easier to manage)

1. Go to `server` folder and run `yarn` to install server dependencies

3. Run `yarn run db` to initialize database (tweak DB connection settings via`server/config/config.json`)

4. Run `yarn run server:watch` to run server in development watch mode

5. Go to `client` folder and run `yarn` to install client dependencies

6. Run `yarn run dev` to run client in development watch mode. 
