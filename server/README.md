# T-Portfolio server

## How to run

1. Get PostgreSQL server locally or via docker:
`docker run --name some-postgres -e POSTGRES_PASSWORD=my-secret-pw -d postgres`
(where `my-secret-pw` is your `postgres` user password)

2. Run `yarn` to install all dependencies

3. Run `yarn run db:init` to initialize database (tweak DB connection settings via`server/config/config.json`)

4. Run `yarn run server:watch` to run both client and server in development watch mode. 
