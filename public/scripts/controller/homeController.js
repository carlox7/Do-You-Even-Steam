'use strict';

(function(module) {
  const homeController = {};

  homeController.init = function(){
    $('#about-us').hide();
    $('#game-stats').hide();
    $('#top-games').hide();
    $('#help-page').hide()
    $('#banner').fadeIn();
    $('#banner-title').fadeIn();
    $('#home-page').fadeIn();
  }
  module.homeController = homeController;
})(window)
