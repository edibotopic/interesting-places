# Interesting Places

A basic CRUD application for users to record points-of-interest.

## General model

A user records **experiences**, which are given:

* Name
* Summary
* Date

Experiences consist of **interesting places**, which include:

* Name
* Description
* Latitude
* Longtitude
* Rating
* Image

Maps are generated for any place where lat/long data is entered.

![example screenshot from local dev](./assets/screenshot.png)

## Deployment

A MongoDB database is hosted using Cloud Atlas and the application is deployed
with Render:

![example screenshot on render](./assets/screenshot_render.png)

API documentation is built using Swagger and live at
[interesting-places.onrender.com/documentation](https://interesting-places.onrender.com/documentation):

![example of Swagger docs](./assets/screenshot_api.png)

## Functionality

* User account creation and login
* User creation of place groups ("experiences") and places
* Image support (not stored)
* Map support
* API
* Swagger docs
* Unit tests
* Publically-accessible

## Local development

Clone the repo and change into the project directory:

```bash
git clone git@github.com:edibotopic/interesting-places.git
cd interesting-places
```

To install dependencies:

```bash
# interesting-places
npm install
```

To start a development server:

```bash
npm run dev
```

You can then access the app on localhost through port `3000`.

To run unit tests, make sure the server is running and then run:

```bash
npm run test
```

## Todo

* [x] Extension to model (e.g., name, description, lat, long, rating)
* [x] Add enhancements (e.g., user images, admin user)
* [x] API docs
* [x] Deploy
* [x] Confirm passing tests
* [x] Structure and complete README
* [x] Submit

## Bugs

* Invalid place details send user to faulty input screen (404 on input)
* Empty string for lat, long and rating returns 0 (should be "")
* Similarly, no lat/long data results in an empty map (shouldn't render in that case)
