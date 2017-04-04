'use strict';

steamUser.toHtml = function (){
  let template = Handlebars.compile($('#stats-template').text());
  $('#game-stats').append(template(this));
};
