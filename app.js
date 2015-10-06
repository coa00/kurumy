var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort

var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    var str = data + "";
    // sys.puts("here: "+data);
    console.log(data);
    var arrayOfStrings = data.split(' ');
    console.log(arrayOfStrings[15]);
  });

  serialPort.on('error', function(err) {
    console.log('err ' + err);
  });

  setTimeout(function() {
    serialPort.write("ls\n", function(err, results) {
      console.log('results ' + results);
    });
  }, 1000);
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
