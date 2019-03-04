# Foody, An OnLine Food Ordering APP

Lighthouse Labs Web Development Program

## Project contributors

Tristan Berezowski, Ralf Pinheiro, Vincent Wong

## Overview

- Foody is a full stack application allowing users to order from restaurants online.

- Users can view and edit selected items, with their cart inventory and order prices generated dynamically. Upon ordering the app will notify the restaurant via SMS.

- Restaurants (when logged in) can see their unaccepted orders, and upon accepting will notify users via SMS as well.

- Users website page will be updated to show their order has been accepted.

## Dependencies

- license: ISC
- node 5.10 or above
- npm 3.8 or above
- body-parser: 1.15.2 or above
- cookie-session: 2.0.0-beta.3 or above
- dotenv: 2.0.0 or above
- ejs: 2.4.1 or above
- express: 4.13.4 or above
- knex: 0.11.7 or above
- knex-logger: 0.1.0 or above
- morgan: 1.7.0 or above
- node-sass-middleware: 0.9.8 or above
- pg: 6.0.2 or above
- twilio: 3.29.0 or above

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp.env.example .env`

2. Update the .env file with your correct local information

- DB_HOST = localhost
- DB_USER = labber
- DB_PASS = labber
- DB_NAME = midterm
- DB_SSL = false
- DB_PORT = 5432

3. Install dependencies: `npm i`

4. Fix to binaries for sass: `npm rebuild node-sass`

5. Run migrations: `npm run knex migrate:latest`

- Check the migrations folder to see what gets created in the DB

6. Run the seed: `npm run knex seed:run`

- Check the seeds file to see what gets seeded in the DB

7. Run the server: `npm run local`

8. Visit `http://localhost:8080/`

## Final Product

![alt text](/public/images/home_index_url.png "Foody Menu")

![alt text](/public/images/home_index_cart.png "Cart")

![alt text](/public/images/order_url.png "Order Details")

![alt text](/public/images/order_submit_url.png "Order Submission")

![alt text](/public/images/restaurant_order_list.png "Restaurant Order List")

![alt text](/public/images/restauran_order_detail.png "Restaurant Order Details")
