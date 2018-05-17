//calls keys from .env file
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
//----------------------------------------------------------------------------------
// calls twitter
function twitterCall(userName) {

  var client = new Twitter(keys.twitter);
  var params = { screen_name: userName };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        addTextToFile(tweets[i].text + "\n");
      }
    }
  });
}

//-----------------------------------------------------------------------------------
// calls spotify
function spotifyCall(songName) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
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

      addTextToFile(output)
    };
  });
}

//-------------------------------------------------------------------------------------
//calls movie 
function movieCall(nameOfmovie) {

  // We then run the request module on a URL with a JSON
  request(`http://www.omdbapi.com/?t=${nameOfmovie}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

      var movieOb = JSON.parse(body)
      
      for (var i = 0; i < movieOb.Ratings.length; i++) {
        if (movieOb.Ratings[i].Source == 'Rotten Tomatoes') {
          rottenTom = movieOb.Ratings[i].Value;
        }
      }

      // Then we print out the imdbRating
      console.log("The movie's title is: " + movieOb.Title);
      console.log("Year the movie came out: " + movieOb.Year);
      console.log("The movie's rating is: " + movieOb.imdbRating);
      console.log("The movie's Rotten tomatoes rating is: " + rottenTom);
      console.log("Country where the movie was produced: " + movieOb.Country);
      console.log("Language of the movie: " + movieOb.Language);
      console.log("Plot of the movie: " + movieOb.Plot);
      console.log("Actors in the movie: " + movieOb.Actors);
      // var textToadd = ("The movie's rating is: " + movieOb.imdbRating);

      output = '\n' + "=================movie stuff here====================" +
        "\n" + "The movie's title is: " + movieOb.Title +
        " \n" + "Year the movie came out: " + movieOb.Year +
        " \n " + "The movie's rating is: " + movieOb.imdbRating +
        " \n" + "The movie's Rotten tomatoes rating is: " + rottenTom +
        " \n" + "Country where the movie was produced: " + movieOb.Country +
        " \n" + "Language of the movie: " + movieOb.Language +
        " \n" + "Plot of the movie: " + movieOb.Plot +
        " \n" + "Actors in the movie: " + movieOb.Actors;
      addTextToFile(output)
      // console.log(movieOb)

      // * Rotten Tomatoes Rating of the movie.
    }
  });
}

//-----------------------------------------------------------------------------------------
// calls text from random.txt file
function textFileCall() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    var movie = dataArr[1]

    addTextToFile('song added from random.txt   ' + dataArr[1] + "\n");

  });

}

//-----------------------------------------------------------------------------------------
// adds text to the log file
function addTextToFile(textToadd) {
  fs.appendFile('log.txt', textToadd, function (err) {

    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });
}




//-----------------------------------------------------------------------------------------
// check box function for enduser to request a action
function checkBox() {

  inquirer
    .prompt([
      {
        type: "list",
        name: "whatIwant",
        message: "What would you like to do??",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "call-from-text-file"]
      },
      {
        type: "input",
        message: "What would you like?",
        name: "username"
      }
    ]).then(function (inquirerResponse) {
      // If the inquirerResponse confirms, we display the inquirerResponse's username and pokemon from the answers.
      console.log("this is inquirers useful info " + inquirerResponse.whatIwant)

      switch (inquirerResponse.whatIwant) {
        case `my-tweets`:
          twitterCall(inquirerResponse.username);
          break;

        case `spotify-this-song`:
          spotifyCall(inquirerResponse.username);
          break;

        case `movie-this`:
          if (inquirerResponse.username === '') {
            var movie = "Mr. Nobody"
          } else {
            var movie = inquirerResponse.username
          }
          movieCall(movie)
          break;

        case `call-from-text-file`:
          textFileCall()
          movieCall(movie)
          break;
      }
    });
}

checkBox()

