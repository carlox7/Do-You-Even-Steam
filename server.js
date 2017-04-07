'use strict';

const pg = require('pg');
const request = require('superagent');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();


const conString = process.env.DATABASE_URL || 'postgres://patrick:test@localhost:5432/kilovolt';
const client = new pg.Client(conString);

client.connect();
client.on('error', function(error) {
  console.error(error);
});
app.use(express.static('./public'));

app.get('/getid', function(req,res){
  request.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.KEY}&vanityurl=${req.headers.vanityurl}`)
  .end(function(err,response){
    res.send(response.body.response.steamid);
  });
});

app.get('/games', function(req,res){
  request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${req.headers.steamid}&format=json&include_played_free_games=1&include_appinfo=1`)
  .end((err,response) => {
    res.send(response.body.response);
  });
});


app.listen(PORT, function () {
  console.log(`Your app is being served on localhost: ${PORT}`);
});

loadDB();

app.get('/leaderboard', (request, response) =>{
  client.query(`
    SELECT * FROM leaderboard
    `)
    .then(result => response.send(result.rows))
})

app.post('/leaderboard', (request, response) =>{
  client.query(`
  INSERT INTO leaderboard(name, time)
   VALUES ($1, $2)`,
  [request.headers.name, request.headers.time ]
  )
  .then(() => response.send('Insert complete'))
  .catch(console.error);
})


function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      leaderboard_id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      time VARCHAR(255)
    )`)
    .catch(function(err){
      console.log(err);
    }
  );
}

app.get('/*', (request, response) => response.sendFile('public/index.html', {root: '.'}));
