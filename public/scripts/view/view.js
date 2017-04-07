'use strict';

//compiles Handlebar template
steamUser.toHtml = function (){
  let template = Handlebars.compile($('#stats-template').text());
  $('#game-stats').empty();
  $('#game-stats').append(template(this));
};

steamUser.gamesToHtml = function (){
  let template = Handlebars.compile($('#top-games-template').text());
  $('#top-games').empty();
  let gamesArray = steamUser.all.games;
  gamesArray.forEach(function(a){
    $('#top-games').append(template(a));
  });
};
steamUser.leaderboard = function(){
  let template = Handlebars.compile($('#leaderboard-template').text());
  $('#leaderboard').empty();
  let scoresArray = leaderboard.scores;
  scoresArray.forEach(function(a){
    $('#leaderboard').append(template(a));
  });
};
