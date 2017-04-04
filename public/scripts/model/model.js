'use strict';

const steamUser = {};
steamUser.all = [];

steamUser.requestSteamData = function(callback){
  $.ajax({
    url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C41AD8B5B0998A582AFA4872B4E51E6C&steamid=${steamUser.steamId.response.steamid}&format=json&include_appinfo=1`,
    method: 'GET'
  })
  .then(data => steamUser.all = data)
  .then(steamUser.totalTimePlayed);
};

$('#steam-form button').on('click', function(e){
  e.stopPropagation();
  e.preventDefault();
  steamUser.vanityUrl = $('#steam-form input').val();
  steamUser.requestSteamId(steamUser.requestSteamData);

});

steamUser.requestSteamId = function(callback) {
  $.ajax({
    url: `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=8283646ADA1BE31B6E4D3E3A82DC52FD&vanityurl=${steamUser.vanityUrl}`,
    method: 'GET',
  })
  .then(data => steamUser.steamId = data)
  .then(callback);
};

steamUser.toHtml = function (){
  let template = Handlebars.compile($('#stats-template').text());
  $('#game-stats').append(template(this));
};
