var config = {
  apiKey: "AIzaSyBNJCfqOE8-LGpJYobyE2haWoeFbIFs42c",
  authDomain: "collaborative-sketch-ff81b.firebaseapp.com",
  databaseURL: "https://collaborative-sketch-ff81b.firebaseio.com",
  storageBucket: "collaborative-sketch-ff81b.appspot.com",
}

firebase.initializeApp(config)

var pointsData = firebase.database().ref()
var points = []

function setup() {
  var canvas = createCanvas(400, 400)
  background(255)
  fill(0)

  //created function at the same time that we're passing it as an argument
  //function not stored anywhere, only exists to be passed as an argument to .on() 
  //anonymous function

  //get newly added points from Firebase, add to points array
  pointsData.on('child_added', function (point){ 
    points.push(point.val()) 
  })

  //when a mouse if pressed on caanvas, execute drawPoint()
  canvas.mousePressed(drawPoint)
  canvas.mouseMoved(drawPointIfMousePressed)
}

function draw() {
  background(255)

  //draw eclipse at each point in points array
    for (var i = 0; i < points.length; i++) {
      var point = points[i]
      circle(point.x, point.y, 5)
    }
}

//pushes mouse position info to Firebase
function drawPoint() {
  //mouseX and mouseY provided by p5.js
  pointsData.push({ x: mouseX, y: mouseY })
}

function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint()
  }
}