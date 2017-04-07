'use strict';

(function(module) {
  const homeController = {};

  homeController.init = function(){
    $('#about-us').hide();
    $('#game-stats').hide();
    $('#top-games').hide();
    $('#help-page').hide();
    $('#leaderboard').hide();
    $('#help-page').hide();
    $('#home-page').fadeIn();
  };
  module.homeController = homeController;
})(window);
