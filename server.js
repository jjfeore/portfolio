'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function(request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.use(express.static('./public'));

app.listen(PORT, function(){
  console.log(`our server is running on port: ${PORT}`);
});
