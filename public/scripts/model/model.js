'use strict';

const steamData = {};
var userInput;
steamData.all = [];
steamData.steamId;

steamData.requestSteamData = function(callback){
  $.ajax({
    url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C41AD8B5B0998A582AFA4872B4E51E6C&steamid=${steamData.steamId.response.steamid}&format=json&include_appinfo=1`,
    method: 'GET',
  })
  .then(data => steamData.all = data)
  .then(steamData.totalTimePlayed);
};

$('#steam-form button').on('click', function(e){
  e.stopPropagation();
  e.preventDefault();
  userInput = $('#steam-form input').val();
  console.log(userInput);
  steamData.requestSteamId(steamData.requestSteamData);

});

steamData.requestSteamId = function(callback) {
  $.ajax({
    url: `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=8283646ADA1BE31B6E4D3E3A82DC52FD&vanityurl=${userInput}`,
    method: 'GET',
  })
  .then(data => steamData.steamId = data)
  .then(callback);
};
