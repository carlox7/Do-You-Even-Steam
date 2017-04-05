'use strict';

(function(module) {
  const helpController = {};

  helpController.init = function(){
    $('#game-stats').hide();
    $('#home-page').hide();
    $('#top-games').hide();
    $('#about-us').hide();
    $('#banner').hide();
    $('#banner-title').hide();
    $('#help-page').fadeIn();
  }
  module.helpController = helpController;
})(window)
