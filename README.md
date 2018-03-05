# Portfolio

[![Build Status](https://travis-ci.org/T-Systems-RUS/Portfolio.svg?branch=develop)](https://travis-ci.org/T-Systems-RUS/Portfolio)

## How to run

1. Get PostgreSQL server locally or via docker:
`docker run --name some-postgres -e POSTGRES_PASSWORD=my-secret-pw -d postgres`
(where `my-secret-pw` is your `postgres` user password)

2. Run `npm install` to install all dependencies

3. Run `npm run db:init` to initialize database (tweak DB connection settings via`server/config/config.json`)

4. Run `npm run client-server` to run both client and server in development watch mode. 


