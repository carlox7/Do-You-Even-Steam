'use strict';

(function(module) {
  const topGamesController = {};

  topGamesController.init = function(){
    $('#about-us').hide();
    $('#game-stats').hide();
    $('#home-page').hide();
    $('#top-games').fadeIn();
  }
  module.topGamesController = topGamesController;
})(window)
