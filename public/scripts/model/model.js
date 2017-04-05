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

    // this is the sort by playtime function;
    steamUser.all.games.sort(function(a, b) {
   return parseFloat(b.playtime_forever) - parseFloat(a.playtime_forever);

    });
    steamUser.all.games.forEach(function(a){
      console.log(steamUser.all.games.playtime_forever = a.playtime_forever / 60);
      a.playtime_forever = Number((a.playtime_forever / 60).toFixed(2));
    });
  })
  .then(() => {
    steamUser.totalTimePlayed();
  })
  .then(()=>{
    if (localStorage.steamId){
      statsController.init();
    }
  });
};


steamUser.showStatsPage = function(){
  if (localStorage.steamId){
    steamUser.steamId = localStorage.steamId;
    steamUser.requestSteamData();
    statsController.init();
  }
}
steamUser.showStatsPage();




$('#steam-form').submit(function(event){
  event.preventDefault();
  event.stopPropagation();
  if($.isNumeric($('#steam-form input').val()) && ($('#steam-form input').val().length == 17)){
    steamUser.steamId = $('#steam-form input').val()
    steamUser.requestSteamData(steamUser.steamId);
    statsController.init();
    localStorage.setItem("steamId", $('#steam-form input').val())
  }

  else {
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
    localStorage.setItem("steamId", steamUser.steamId)
  })
  .then(callback)
};

//Maps total time played for each game and compares them to time of listed activities
steamUser.totalTimePlayed = () => {
  let totalHours = steamUser.all.games.map(function (data) {
    return data.playtime_forever;
  }).reduce((acc, val) => acc + val);
  steamUser.totalTime = totalHours
  steamUser.shameWalk = Math.round(steamUser.totalTime * 3);
  steamUser.moneyShame = steamUser.totalTime * 13;
  steamUser.londonShame = Math.round(steamUser.totalTime / 9);
  steamUser.harryPotterShame = Math.round(steamUser.totalTime / 59);
  steamUser.pokemonShame = Math.round(steamUser.totalTime / 50);
  steamUser.codeFellowsShame = Number((steamUser.totalTime / 810).toFixed(2));
  steamUser.toHtml();
  steamUser.gamesToHtml();

};
