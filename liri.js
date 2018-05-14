
// var fs = require("fs");
var input = (process.argv.slice([2]));
console.log(input)


var keys = require('./keys.js');
var spotify = (keys.spotify);
// var client = (keys.twitter);

// var spotify = new Spotify(keys.spotify);
var client1 = (keys.twitter);


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'MBwRxdU3oiJnjzqhiXJSjXYAv',
  consumer_secret: 'c5SykiH8Vg8iuesIMZdzAHpHRMhw1TpbdWXB6Dp4fEYZivCZLV',
  access_token_key: '995408439881977863-JS9Y6SLjH2RWMeEuuUm3Zp2X7I9OXAe',
  access_token_secret: 'EJcJ8RY5pu8oSBZG7kgMMJTOBPCM8sPIw8LuVp9WcYoD6'
});
//  console.log(client)

//  client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.
//   console.log(response);  // Raw response object.
// });
var params = {screen_name: 'Fred Flinstone'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });
 

function checkBox(){
// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
        type: "checkbox",
        name: "whatIwant",
        message: "What would you like to do??",
        choices: [`my-tweets`, `spotify-this-song`, `movie-this`,`do-what-it-says`]
      }
  ])

  console.log('your choice  ' + name )
//   .then(function(inquirerResponse) {
//     // If the inquirerResponse confirms, we display the inquirerResponse's username and pokemon from the answers.
//     if (inquirerResponse.confirmUsername && inquirerResponse.confirmPassword && inquirerResponse.confirmPokemon) {
//       console.log("\nWelcome " + inquirerResponse.username);
//       console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
//     }
//     else {
//       console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
//     }
//   });
}