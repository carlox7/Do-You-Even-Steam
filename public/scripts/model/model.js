'use strict'

const steamData = {};

steamData.all = [];

steamData.requestSteamData = function(callback){
  $.ajax({
    url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C41AD8B5B0998A582AFA4872B4E51E6C&steamid=76561198003587946&format=json&include_appinfo=1',
    method: 'GET',
  })
  .then(data => steamData.all = data)
  .then(callback);
};
