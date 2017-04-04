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

steamUser.toHtml = function (){
  let template = Handlebars.compile($('#stats-template').text());
  $('#game-stats').append(template(this));
};
