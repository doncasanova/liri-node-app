//calls keys from .env file
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
//----------------------------------------------------------------------------------
// calls twitter
function twitterCall() {
  
  var client = new Twitter(keys.twitter);
  var params = { screen_name: 'Fred Flinstone' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
    for (var i =0; i < tweets.length; i++ ){
      console.log(tweets[i].text);
      addTextToFile(tweets[i].text + "\n");
    }
  }
  });
}

//-----------------------------------------------------------------------------------
// calls spotify
function spotifyCall() {
 
  var spotify = new Spotify(keys.spotify);
  var songName = (process.argv.slice([3]));
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
      output = "\n" + "================= DATA HERE ==================" +
        "\n" + "Song Name: " + "'" + songName + "'" +
        "\n" + "Album Name: " + data.tracks.items[0].album.name +
        "\n" + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
        "\n" + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
      console.log(output);
      var textToadd = output
      addTextToFile(textToadd)
    };
});
}

//-------------------------------------------------------------------------------------
//calls movie 
function movieCall(){

// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's rating is: " + JSON.parse(body).time);
    var textToadd = ("The movie's rating is: " + JSON.parse(body).imdbRating);
    addTextToFile(textToadd)
    // console.log(body)
  }
});
}

//-----------------------------------------------------------------------------------------
// adds text to the log file
function addTextToFile(textToadd){

fs.appendFile('log.txt', textToadd, function(err) {

  if (err) {
    console.log(err);
  }
  else {
    console.log("Content Added!");
  }
});
}

// not sure of how to call function when asked for. 




//-----------------------------------------------------------------------------------------
// check box function for enduser to request a action
function checkBox() {
  
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "whatIwant",
        message: "What would you like to do??",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
      }
    ]).then(function(inquirerResponse) {
  // If the inquirerResponse confirms, we display the inquirerResponse's username and pokemon from the answers.
  console.log("this is inquirers useful info " + inquirerResponse.whatIwant)
  
  switch (inquirerResponse.whatIwant) {
    case `my-tweets`:
    console.log('twitter')
    twitterCall();
      break;
    
    case `spotify-this-song`:
    console.log('hello')
    spotifyCall();
      break;
    
    case `movie-this`:
      withdraw();
      break;
    
    case `do-what-it-says`:
      lotto();
      break;
    }
  // if (inquirerResponse.confirmUsername && inquirerResponse.confirmPassword && inquirerResponse.confirmPokemon) {
  //       console.log("\nWelcome " + inquirerResponse.username);
  //       console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
  //     }
  //     else {
  //       console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
  //     }
    });
}

checkBox()

