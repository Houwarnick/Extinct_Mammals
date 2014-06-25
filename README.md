extinct-mammals
===============

Simple NodeJS/mongoDB API

##Objective
This will help solidify your understanding of mongoDB alongside of NodeJS using a popular ORM for mongo called mongoose
You'll build a public API of extinct mammals retrieved from Wikipedia: http://en.wikipedia.org/wiki/List_of_extinct_mammals

##Day One
###Step 1: Build your project
* Create your package.json file with mongoose and express as dependencies
* Make sure mongod is running in your terminal
* Create a server.js file that will hold all of your API's logic
* Be sure to require and initialize express

###Step 2: Setup the mongoDB connection (reference: http://mongoosejs.com/docs/)
* In your server.js require the mongoose library and create a connection to your database server
* Create your mammalSchema with three fields: `name`, `type`, and `year_extinct`
* Use express to create two endpoints on `/`, one a GET and one a POST

#### `GET /`
  * returns a JSON array of all extinct mammals, ordered by name
  
#### `POST /`
  * saves a new Mammal model based on the fields given in the JSON request

###Step 3: Insert some data
* Using your new API and the wikipedia article, add some extinct mammals: http://en.wikipedia.org/wiki/List_of_extinct_mammals

##Day Two
###Step 4: Break up your project into multiple modules
* (You can use https://gist.github.com/fwielstra/1025038 as a good example)
* Create an api.js to hold your `get` and `post` calls
* Create a mammal.js that contains the schema and model creation for `Mammal`
* Create an app.js file that brings everything together:
  * it should require the express and mongoose modules
  * it should instantiate express and connect to the mongo server
  * it should require the api module and connect the endoints to their appropriate functions in api.js
  * it should start the server listening on a desired port

###Step 5: Routing and fetching
* Use a more complicated routing structure for your `GET /` call:
  * change the route to point to `/mammals` rather than just `/`
  * make it so that if someone requests `/mammals/marsupials` or `mammals/rodents` the call will return only mammals of that type
  * include an `order_by` query param that instructs the API to order the results by the given field

###Step 6 (Black Diamond): Query by id
* Use regex to determine whether someone is asking for `/mammals/:id` or `/mammals/:type` and return the appropriate response

##Integration Tests with Jasmine
###Step 1: Create your spec file
You can name it whatever you'd like, but since we're testing the API, let's call it test/spec/apispec.js
###Step 2: Make sure you have the correct setup
* Make sure mongodb is running (either in another tab or via `mongod &`)
* Make sure `node app.js` is running and has no problems
* Make sure you're required the `request` lib in your spec
* "Describe" your test case, maybe something like "tests the api"

###Step 3: Create a spec to make sure GET `/mammals` returns data
* NOTE: make sure you have some data in your collection
* Hint: Use the "toThrow" matcher in Jasmine to make sure try to parse JSON from the response body doesn't throw an error:

```javascript
request("http://localhost:8888/mammals", function(err, response, body) {
 var checkJSON = function() {
  //if body isn't valid JSON, this will throw an error and break stuff
  JSON.parse(body);
 }
 expect(checkJSON).not.toThrow();
 done();
});
```

###Step 4: Create specs to make sure both variations of `/mammals` work
GET `/mammals` should work as well as `/mammals/marsupial` (or however you input the type)

###Step 5: Create a spec to ensure that POST `/mammals` works
You're going to need to utilize the post method of the request library, like so:

```javascript
request({
 uri: url+"/mammals",
 method: 'POST',
 json: {
  "name": "TEST MAMMAL", 
  "type": "test", 
  "year_extinct": 2013
 } 
}, function(err, response, body) {
 //code for assertion and done() here
});
```
