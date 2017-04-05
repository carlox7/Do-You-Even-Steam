'use strict';

//compiles Handlebar template
steamUser.toHtml = function (){
  let template = Handlebars.compile($('#stats-template').text());
  $('#game-stats').append(template(this));
};
