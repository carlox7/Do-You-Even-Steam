'use strict';
//Maps total time played for each game in minutes and sums up all values and divides by 60 to get hours played
steamData.totalTimePlayed = () => {
  let totalMinutes = steamData.all.response.games.map(function (data) {
    return data.playtime_forever;
  }).reduce((acc, val) => acc + val);
  steamData.totalTime = Math.round(totalMinutes / 60);
  steamData.toHtml();
};

steamData.gameNames = () => {
  steamData.all.response.games.map(function (data){
    console.log(data.name);
    return data.name;
  });
};
