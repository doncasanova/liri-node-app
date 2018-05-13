
// var fs = require("fs");
var input = (process.argv.slice([2]));
console.log(input)

var keys = require('./keys.js');

var spotify = (keys.spotify);
var client = (keys.twitter);

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Then run a request to the OMDB API with the movie specified
request("https://api.twitter.com/1.7.1/direct_messages.json?since_id= + keys.twitter.consumer_key + &count=1",
function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(body);
//   }
// });
});
