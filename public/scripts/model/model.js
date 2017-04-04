'use strict';

const steamUser = {};
steamUser.all = [];

steamUser.requestSteamData = function(callback){
  $.ajax({
    url: '/games',
    method: 'GET',
    headers:{
      steamid: steamUser.steamId
    }
  })
  .then(data => {
    console.log(data);
    steamUser.all = data;
  })
  .then(steamUser.totalTimePlayed);
};

$('#steam-form button').on('click', function(e){
  e.stopPropagation();
  e.preventDefault();
  steamUser.vanityUrl = $('#steam-form input').val();
  steamUser.requestSteamId(steamUser.requestSteamData);

});

steamUser.requestSteamId = function(callback) {
  console.log(steamUser.vanityUrl);
  $.ajax({
    url: '/getid',
    method: 'GET',
    headers: {
      vanityUrl: steamUser.vanityUrl
    }
  })
  .then(data =>{
    console.log(data);
   steamUser.steamId = data
 })
  .then(callback);
};

//Maps total time played for each game in minutes and sums up all values and divides by 60 to get hours played
steamUser.totalTimePlayed = () => {
  let totalMinutes = steamUser.all.response.games.map(function (data) {
    return data.playtime_forever;
  }).reduce((acc, val) => acc + val);
  steamUser.totalTime = Math.round(totalMinutes / 60);
  steamUser.shameWalk = Math.round(steamUser.totalTime / 3);
  steamUser.moneyShame = steamUser.totalTime * 13;
  steamUser.londonShame = Math.round(steamUser.totalTime / 9);
  steamUser.harryPotterShame = Math.round(steamUser.totalTime / 59);
  steamUser.pokemonShame = Math.round(steamUser.totalTime / 50);
  steamUser.codeFellowsShame = Number((steamUser.totalTime / 810).toFixed(2));
  steamUser.toHtml();
};

steamUser.gameNames = () => {
  steamUser.all.response.games.map(function (data){
    console.log(data.name);
    return data.name;
  });
};

steamUser.shameWalk = () => {
  Math.round(steamUser.totalTime / 3);
  steamUser.toHtml();
};

steamUser.moneyShame = () => steamUser.totalTime * 13;

steamUser.londonShame = () => Math.round(steamUser.totalTime / 9);

steamUser.harryPotterShame = () => Math.round(steamUser.totalTime / 59);

steamUser.pokemonShame = () => Math.round(steamUser.totalTime / 50);
