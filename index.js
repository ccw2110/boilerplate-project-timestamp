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


app.get("/api", function (req, res) {
  const currentUnix = new Date().getTime();
  const currenteUtc = new Date().toUTCString();
  res.json({unix: currentUnix, "utc" :currenteUtc });
});

app.get("/api/:dateinput", function (req, res) {
  const dateinput = req.params.dateinput
  const unixPattern = /\d{5,}/

  if (unixPattern.test(dateinput)){
    const dateUnix = parseInt(dateinput)
    res.json({unix: dateUnix, "utc" : new Date(dateUnix).toUTCString() });
  } else{
    const fdate = new Date(dateinput)
    if (fdate.toString() === "Invalid Date") {
      res.json({error: "Invalid Date"});
    } else {
      res.json({unix: fdate.getTime(), utc : fdate.toUTCString()});
    }
  }


});






// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
