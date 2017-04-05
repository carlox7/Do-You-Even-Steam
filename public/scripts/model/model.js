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
    steamUser.all = data;
    steamUser.all.games.sort(function(a, b) {
   return parseFloat(b.playtime_forever) - parseFloat(a.playtime_forever);
    });
    steamUser.all.games.forEach(function(currentGame){
      $('#top-games').append(currentGame.name);
      $('#top-games').append(currentGame.playtime_forever);
    });
    })
  .then(steamUser.totalTimePlayed);
};

$('#steam-form').submit(function(event){
  event.preventDefault();
  event.stopPropagation();
  if($.isNumeric($('#steam-form input').val()) && ($('#steam-form input').val().length == 17)){
    console.log('success');
    steamUser.steamId = $('#steam-form input').val()
    steamUser.requestSteamData(steamUser.steamId);
    statsController.init();
  }

  else {
  console.log('fail');
  steamUser.vanityUrl = $('#steam-form input').val();
  steamUser.requestSteamId(steamUser.requestSteamData);
  statsController.init();
}

});


steamUser.requestSteamId = function(callback) {
  $.ajax({
    url: '/getid',
    method: 'GET',
    headers: {
      vanityUrl: steamUser.vanityUrl
    }
  })
  .then(data =>{
    steamUser.steamId = data;
  })
  .then(callback);
};

//Maps total time played for each game and compares them to time of listed activities
steamUser.totalTimePlayed = () => {
  let totalMinutes = steamUser.all.games.map(function (data) {
    return data.playtime_forever;
  }).reduce((acc, val) => acc + val);
  steamUser.totalTime = Math.round(totalMinutes / 60);
  steamUser.shameWalk = Math.round(steamUser.totalTime * 3);
  steamUser.moneyShame = steamUser.totalTime * 13;
  steamUser.londonShame = Math.round(steamUser.totalTime / 9);
  steamUser.harryPotterShame = Math.round(steamUser.totalTime / 59);
  steamUser.pokemonShame = Math.round(steamUser.totalTime / 50);
  steamUser.codeFellowsShame = Number((steamUser.totalTime / 810).toFixed(2));
  steamUser.toHtml();
};

//Maps list of game names
steamUser.gameNames = () => {
  steamUser.all.games.map(function (data){
    console.log(data.name);
    return data.name;
  });
};
console.log(steamUser.all.games);
