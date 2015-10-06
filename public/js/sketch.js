var socket;
var serialData = [];

function setup() {

    createCanvas(windowWidth, windowHeight);

    socket = io();
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on('data',
        function(data) {
          serialData = data;
        }
    );
}

function draw() {
  background(32,178,170);
  // noStroke();

  var padding = 100;
  var rad;
  var maxRad = 100;
  var cnt=1;
  var x=0,y=0;
  for(var i=0;i<16;i++){
      rad = map((1024-serialData[i]),0,1024,0,maxRad);
      x = cnt % 4;
      y = Math.floor(i / 4);
      noStroke();
      fill(255);
      ellipse(x * maxRad + padding,y * maxRad + padding,rad,rad);
      cnt++;
  }
}
