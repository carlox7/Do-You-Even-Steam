'use strict';
//Maps total time played for each game in minutes and sums up all values and divides by 60 to get hours played
steamUser.totalTimePlayed = () => {
  let totalMinutes = steamUser.all.response.games.map(function (data) {
    return data.playtime_forever;
  }).reduce((acc, val) => acc + val);
  steamUser.totalTime = Math.round(totalMinutes / 60);
  steamUser.toHtml();
};

steamUser.gameNames = () => {
  steamUser.all.response.games.map(function (data){
    console.log(data.name);
    return data.name;
  });
};
