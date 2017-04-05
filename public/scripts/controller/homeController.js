'use strict';

(function(module) {
  const homeController = {};

  homeController.init = function(){
    $('#about-us').hide();
    $('#game-stats').hide();
    $('#home-page').fadeIn();
  }
  module.homeController = homeController;
})(window)
