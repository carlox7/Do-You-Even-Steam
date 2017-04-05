'use strict';

(function(module) {
  const statsController = {};

  statsController.init = function(){
    $('#about-us').hide();
    $('#home-page').hide();
    $('#top-games').hide();
    $('#help-page').hide();
    $('#banner').fadeIn();
    $('#banner-title').fadeIn();
    $('#game-stats').fadeIn();
  }
  module.statsController = statsController;
})(window)
