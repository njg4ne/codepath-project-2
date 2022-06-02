📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Week 2 Assignment: Student Store

Submitted by: **NAME**

Estimated time spent: **#** hours spent in total

Deployed Application (optional): [Student Store Deployed Site](ADD_LINK_HERE)

### Application Features

#### REQUIRED FEATURES

- [x] The API should contain an endpoint that serves an array of all products in the store
- [x] An endpoint should exist for creating orders and saving them to a JSON file. Each order should contain the email of the person placing the order, the items associated with the order, and the quantity of each item purchased.
- [x] A Store model should handle all data management logic for the API and be the interface for read/write operations to the JSON file.
- [x] The frontend should include a landing page that displays the products available for purchase.
- [x] ~~There should be a `Sidebar` component that appears on every page and has two states - `open` and `closed`. When the sidebar is opened, it should display a shopping cart of all the products the user currently has in their cart. It should also calculate and display the total amount in dollars for the checked-out items. When it's closed, the sidebar should be much thinner and not display its internal content.~~ Drawer component
- [x] Each product should have an individual ~~page~~ modal that shows the details of the product and allows the user to add that product to their shopping cart.
- [x] A checkout form should be available that allows the user to enter their email and send their order to the API.

#### STRETCH FEATURES

- ~~[ ] Deploy your website with Heroku & Surge. ~~
- [x] Create an endpoint that serves only a single product based on the product's id
- [x] Create an endpoint for fetching all orders in the database, and an endpoint for serving an individual order based on its id.
- [x] Build a page in the UI that displays the list of all past orders and lets the user click on any individual order to take them to a more detailed page of the transaction.
- [x] Allow users to use an input to filter orders by the email of the person who placed the order.

### Walkthrough Video



https://user-images.githubusercontent.com/89935777/171714806-7af221dd-71ee-4481-a13a-85f0eeb46002.mp4

### Reflection
~~
* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Add your response here

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
Add your response here

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Add your response here~~

### Open-source libraries used

- https://mui.com/
- https://www.npmjs.com/package/nodemon

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.
