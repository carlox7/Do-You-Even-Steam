'use strict';

(function(module) {
  const aboutController = {};

  aboutController.init = function(){
    $('#game-stats').hide();
    $('#home-page').hide();
    $('#top-games').hide();
    $('#help-page').hide()
    $('#banner').fadeIn();
    $('#banner-title').fadeIn();
    $('#about-us').fadeIn();
  }
  module.aboutController = aboutController;
})(window)
