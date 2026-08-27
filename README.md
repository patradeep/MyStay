# MyStay

A simple Airbnb-style listing web application built with Node.js, Express, MongoDB, and EJS.

Live demo: https://mystay-jnwe.onrender.com/listing

## Features
- Create, read, update, and delete listings
- User authentication (register / login) using Passport
- Image uploads (Multer + Cloudinary)
- Reviews for listings
- Flash messages and basic session handling

## Tech stack
- Node.js, Express
- MongoDB, Mongoose
- EJS (ejs-mate)
- Passport (passport-local, passport-local-mongoose)
- Multer, Cloudinary

## Getting started

Prerequisites:
- Node.js (uses engines field in `package.json`)
- MongoDB (local or Atlas)

Install dependencies:

```bash
npm install
```

Environment variables
Create a `.env` file at the project root with the following values (names may vary in `cloudConfig.js`):

- `DB_URL` or `MONGO_URI` — MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`
- `SESSION_SECRET`

Run the app:

```bash
node app.js
# or with nodemon if installed globally
nodemon app.js
```

By default the app listens on the port configured in `app.js` or the environment; open `http://localhost:3000/` and visit `/listing`.

## Project structure

- `app.js` — application entry
- `controllers/` — route handlers
- `models/` — Mongoose models (listing, review, user)
- `routers/` — Express routers
- `views/` — EJS templates
- `public/` — static assets (CSS)

## Routes (high level)

- `/listing` — listing index
- `/listing/new` — create listing
- `/listing/:id` — show listing
- `/listing/:id/edit` — edit listing
- `/review` — review routes
- `/user` — register/login/logout

## Deployment

The project is deployable to services like Render, Heroku, or similar. The current live URL used for reference is:

https://mystay-jnwe.onrender.com/listing

## Contributing

Open an issue or submit a pull request. For changes that add features or affect configuration, include setup notes for environment variables.
