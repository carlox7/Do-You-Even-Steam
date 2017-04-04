'use strict';

const request = require('superagent');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static('./public'));

app.get('/getid', function(req,res){
  request.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.KEY}&vanityurl=${req.headers.vanityurl}`)
  .end(function(err,response){
    console.log(response.body.response.steamid);
    res.send(response.body.response.steamid);
  });
});

app.get('/games', function(req,res){
  request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${req.headers.steamid}&format=json&include_appinfo=1`)
  .end((err,response) => {
    console.log(response.body);
    res.send(response.body.response);
  });
});

app.listen(PORT, function () {
  console.log(`Your app is being served on localhost: ${PORT}`);
});
