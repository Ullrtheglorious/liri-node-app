require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require(__dirname + "/keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbApi = (keys.omdb);
var input = process.argv[2];
var input2 = process.argv[3];

switch (input) {
// twitter input
    case "my-tweets":
        myTweets();
    break;
//  spoitify input
    case "spotify-this-song":
        if (input2) {
            spotifySong(input2);
        } else {
            spotifySong('hello');
        }
    break;
// omdb input
    case "movie-this":
        if (input2) {
            movie(input2)
        } else {
            movie("Mr. Nobody")
        }
    break;
// random function
    case "do-what-it-says":
        randomThing();
    break;
// default liri function
    default:
        liriDefault();
    break;
}


function myTweets() {
    var params = {
        screen_name: 'UllrtheGlorious',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.log("----------------------------------------------------------------");
                fs.appendFile("log.txt", "Tweet: " + tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n" + "\r\n", (error) => { /* handle error */ });
            }
        }
    });
}

function randomThing() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');
        // spotifySong(txt[1]);
        console.log(txt)
    });
}






