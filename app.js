var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//publicを使う
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var dummyArray = [500,600,100,1024,
  980,888,821,123,
  123,555,155,123];

var bSocketConnect = false;

//Arudino接続済みの場合はこちらを実行
var useSeiral = true;
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort

if (useSeiral)
{
  // シリアルポートの設定

  // シリアルを接続作成
  var serialPort = new SerialPort(
    "/dev/cu.usbmodem1421", {
    parser: serialport.parsers.readline("\n"),
    baudrate: 9600
    }
  );


  serialPort.on("open", function () {
    serialPort.on('data', function(data) {
      var str = data + "";
      console.log(data);

      //空白で分割して配列に格納
      var arrayData = data.split(' ');
      console.log(arrayData);
      //webSocketに接続済みであれば送信
      if (bSocketConnect) io.emit('data',arrayData);
    });
    //接続エラー
    serialPort.on('error', function(err) {
      console.log('err ' + err);
    });

    //タイムアウト
    setTimeout(function() {
      serialPort.write("ls\n", function(err, results) {
        console.log('results ' + results);
      });
    }, 1000);
  });
}else{
  setInterval(function (argument) {
    var dummyArray = [];
    for (var i=0;i<16;i++){
      //dummyArray.push(Math.random()*1024)
      dummyArray.push(1024)
    }
    io.emit('data',dummyArray);
  },1000);
}
/**
webSocketの接続
**/
io.sockets.on('connection',function(){
    //フラグを立てるのみ
    bSocketConnect = true;
  }
);

http.listen(3000, function(){
  console.log('listening on *:',process.env.PORT || 3000);
});
