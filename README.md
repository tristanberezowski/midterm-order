# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

# Online Ordering Web-app
By Ralf Pinheiro, Tristan Berezowski, and Vincent Wong

### User Story

- As consumer (index -> order)
1. Visit website
2. browse and select what you want to order
3. submit order with details
4. recieve notification for when it is ready to pick up
- 

- As restaurant owner (index -> owner)
1. Receive notification from sms
2. visit website as admin
3. accept order and specify how long until ready

## Data Needed For MVP

- Webpages
1. (order) index page
  - items to add to new order
2. client view/submit order page
  - all items selected and buttons
3. restaurant view orders list
  - list all orders submitted
  - order expands to view/accept/specify single order

#### Partials
1. Fixed sidebar for viewing cart/order
2. Header with link for restaurant owner login
3. Create with javascript -> order box has status, can expand on click -> description, information about order, submit for time

#### Order Structure
1. Order
  - id
  - pickup time
  - product
    - id
    - name
    - quantity
    - description
    - price
    - image
  - timestamp
  - user
    - id
    - phone number
    - name

#### Database Storage

  1. orders
    - id          (primary)
    - pickup_time
    - timestamp
  
  2. products
    - id          (primary)
    - name
    - image
    - description
    - price
  
  3. product_orders
    - id          (primary)
    - product_id  (foreign)
    - quantity
    - order_id    (foreign)
  
  4. guests
    - id          (primary)
    - phone_number
    - name
    - order_id    (foreign)

  5. restaurants
    - id          (primary)
    - password

## Technology Choices

  1. Deployment = Heroku
  2. Backend = node.js with express server
  3. Database = psql with knex
  4. Frontend = Bootstrap with sass
    - html with javascript
  
#### Modules

###### Core
  1. Express
  2. psql/knex
  3. bootstrap
  4. Sass
###### Function
  1. Session cookies
  2. Body Parser
  3. Hashing
  4. Twilio (api)

###### HTML/CDN links
  1. Jquery
  2. Bootstrap

### Define Routes

  1. Index "/"
    - get: index loads and you can make a new order from this page 
    - post: create the order object and redirect to order page
  2. Order Page "/:order"
    - get: loads all data from order of order.id = req.params.order
    - post: submit the order, text the restaurant and update page once successful
  3. Restaurant list "/owner"
    - get: loads all orders placed with links to each order page
    - submitting orders posts to "/owner/:id"
  4. Restaurant order "/owner/:id"
    - post: submit time for pickup