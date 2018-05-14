
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
  client1
});
//  console.log(client)

 client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// var request = require("request");
// function twitterRun(request){
// client.get("https://api.twitter.com/1.7.1/direct_messages.json?since_id= + keys.twitter.twitter_consumer_key + &count=1",
// function(error, response, body) {

//     console.log(body);
// //   }
// // });
// });
// }
// twitterRun(request)


// var request = require("request");
// function spotifyRun(request){
// request("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10",
// function(error, response, body) {

//   console.log(body);
// //   }
// // });
// });
// }



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