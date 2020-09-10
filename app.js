const fs=require('fs');

var unirest = require("unirest");






async function getMId(movieID){

    var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

    req.headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "2e422a2ff6msh8f0a08e968b8f07p1a4a46jsn20d5a6e653b4"
    });


    var movieId=await req.query({
        "i": movieID,
	    "r": "json"
    })
    
   return movieId.body


}

async function saveIds(mID){
var movie=await getMId(mID)

fs.appendFileSync('finalResult.txt','{'+'title: '+ movie.Title+' | year: '+ movie.Year+'Genre'+movie.Genre+'Rate:'+movie.Ratings[0].Value+'}'+'\r\n');


}

async function getfNames(){
   var data=await fs.readFileSync('moviesID.txt', 'utf8')
   var newdata=data.split('\r\n');
  return newdata

}
getfNames()

 async function main(){
     var movies=await getfNames();

      movies.forEach(async movie => {
           await saveIds(movie);
    
       });
 
    
 }
 main()

