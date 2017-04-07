'use strict';

(function(module) {
  const leaderboardController = {};

  leaderboardController.init = function(){
    $('#about-us').hide();
    $('#home-page').hide();
    $('#top-games').hide();
    $('#help-page').hide();
    $('#game-stats').hide();
    $('#help-page').hide()
    $('#leaderboard').fadeIn();
    steamUser.getTable();
  }
  module.leaderboardController = leaderboardController;
})(window)
