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


// Timestamp Microservice endpoint
app.get("/api/:date?", function(req, res) {
  let input = req.params.date;
  let unix_output, utc_output;

  // If no date parameter, use current date
  if (!input) {
    unix_output = new Date();
    utc_output  = unix_output.toUTCString();
    return res.json({unix : unix_output.valueOf(), utc : utc_output});  
  }

  // Check if input is a valid date string
  const isValidDate = Date.parse(input);

  // Check if input is a valid unix timestamp (all digits)
  const isValidUnixNumber = /^\d+$/.test(input);

  if (!isNaN(isValidDate)) {
    unix_output = new Date(input);
    utc_output  = unix_output.toUTCString();
    return res.json({unix : unix_output.valueOf(), utc : utc_output});
  }
  else if (isValidUnixNumber) {
    unix_output = new Date(parseInt(input));
    utc_output  = unix_output.toUTCString();
    return res.json({unix : unix_output.valueOf(), utc : utc_output});
  }
  else {
    res.json({error: "Invalid Date"});
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
