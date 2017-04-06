'use strict';

const steamUser = {};
steamUser.all = [];
steamUser.vanityUrl;


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
  }).reduce((acc, val) => acc + val).toFixed(2);
  steamUser.totalTime = totalHours;
  steamUser.shameWalk = Number(steamUser.totalTime * 3).toFixed(2);
  steamUser.moneyShame = Number(steamUser.totalTime * 13).toFixed(2);
  steamUser.londonShame = Number(steamUser.totalTime / 9).toFixed(2);
  steamUser.harryPotterShame = Number(steamUser.totalTime / 59).toFixed(2);
  steamUser.pokemonShame = Number(steamUser.totalTime / 50).toFixed(2);
  steamUser.codeFellowsShame = Number(steamUser.totalTime / 810).toFixed(2);
  steamUser.friendsShame = Number(steamUser.totalTime / 83).toFixed(2)
  steamUser.tenKShame = Number((steamUser.totalTime / 10000) * 100).toFixed(2);
  steamUser.spaceShame = Number(steamUser.totalTime * 17150).toFixed(2);
  steamUser.toHtml();
  steamUser.gamesToHtml();

};


steamUser.insertRecord = function(callback) {
  console.log(steamUser.vanityUrl);
  console.log(steamUser.totalTime);
    $.ajax({
      url : '/leaderboard',
      method: 'POST',
      headers:{
        name: steamUser.vanityUrl,
        time: steamUser.totalTime
      }
  });
}
