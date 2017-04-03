'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('./public'));

app.listen(PORT, function () {
  console.log(`Your app is being served on localhost: ${PORT}`);
});
