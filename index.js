// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let input = req.params.date;
  let timestamp = parseInt(input);
  let dateFormat = new Date(input);
  let currentTime = new Date();
  
  if (dateFormat != 'Invalid Date') {
    res.json({
      unix: dateFormat.getTime(),
      utc: dateFormat.toUTCString()
    });
  } else if (timestamp == Number(timestamp)) {
    res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString()
    });
  } else if (input == undefined) {
    res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString()
    });
  } else {
    res.json({
      error: 'Invalid Date'
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
