# Goodie App

This repository is web apps development using React, Express, Postgres.

## Live demos
link: `https://goodie-app.herokuapp.com/`
- using account admin: username: admin@mail.com pass: 123456
- using account owner: username: owner@mail.com pass: 123456

## How To Use

1. Clone this repository
2. Assuming that you have Node 12 LTS or greater installed, you can use npm to install packages.
3. cd server and running the application with command :
   - `npm install`
   - `npx sequelize-cli db:create`
   - `npx sequelize-cli db:migrate`
   - `npx sequelize-cli db:seed:all`
   - `npm run dev`
4. for the client side, cd ../ to jump to higher level folder and cd client and install all packages.
   - `npm install`
   - `npm start`

## How To Run test

1. make sure you have installed all the dependecies
2. runnign with command :
   - `npm run test`
nb. testing only in server side.
