'use strict';

(function(module) {
  const aboutController = {};

  aboutController.init = function(){
    $('#game-stats').hide();
    $('#home-page').hide();
    $('#about-us').fadeIn();
  }
  module.aboutController = aboutController;
})(window)
