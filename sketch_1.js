function divide(start, end, n) {
  const coordinates = [];

  // Calculate the step size
  const stepX = (end[0] - start[0]) / (n - 1);
  const stepY = (end[1] - start[1]) / (n - 1);

  // Generate the coordinates
  for (let i = 0; i < n; i++) {
    const x = start[0] + stepX * i;
    const y = start[1] + stepY * i;
    coordinates.push([x, y]);
  }

  return coordinates;
}

function divideCircle(centerX, centerY, radius, n) {
  const coordinates = [];
  const angleStep = (2 * Math.PI) / n;
  
  // Generate the coordinates
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    coordinates.push([x, y]);
  }
  
  return coordinates;
}

function checky(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] > 0) {
      return false;
    }
  }
  return true;
}



var colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  background(0, 0, 0);
  noFill();
  strokeWeight(height / 655 / 1);
  stroke(0, 0, 50);
  curveDetail(50);

  scm = new ColorScheme;
  scm.from_hue(Math.random() * 360)
   .scheme(['contrast', 'analogic'].at(Math.round(Math.random())))
   .distance((Math.random() + 0.3) / 1.3)
   .add_complement(false)
   .variation('default')
   .web_safe(true);

  colors = scm.colors();
  //const bg = color('#' + colors.at(2));
  //bg.setAlpha(50);
  //background(bg);
  //colors.splice(2,1);
  //colors.splice(5,1);
  //colors.splice(8,1);

  console.log(colors);
}

const circles_num = 5;

var drawend = False;
function draw() {

  const start = [0, height / 2];
  const end = [width, height / 2];
  const n = 3;

  const xvari = 0;
  var yvari = height / 350 * (Math.random() + 0.7);
  if (typeof points == "undefined") {
    const start = [0, height];
    const end = [width, height];
    const n = Math.random() * 109 + 7;
    points = divide(start, end, n);
  }
  if (checky(points)){
    noLoop();
  }
  else{
    points = drawline(points, xvari, yvari);
  }
}

function drawline(points, xvari, yvari) {
  hx = color('#' + colors.at(Math.random() * 8));
  //hx = color(0, 0, 0);
  //print('#' + colors.at(Math.random() * 8));
  hx.setAlpha(15);
  stroke(hx);
  beginShape();
  curveVertex(points[0][0], points[0][1]);

  let change;
  for (let i = 0; i < points.length; i++) {
    change = Math.random() * -yvari + 0.5; //* 2 - yvari;

    if (points[i][1] + change < 1.5) {
      points[i] = [points[i][0], points[i][1] + change];
    } else {
      if (points[i][1] + change > height - 1.5) {
        points[i] = [points[i][0], points[i][1] + change];
      } else {
        points[i] = [points[i][0], points[i][1] + change];
      }
    }
    curveVertex(points[i][0], points[i][1]);
  }
  curveVertex(points[points.length-1][0], points[points.length-1][1]);

  endShape();
  return points;
}

function mouseClicked() {
  if(isLooping()){
    noLoop();
  }
  else{
    loop();
  }
  //save("best.png");
}
function windowResized() {
  //background(0, 0, 0);
  resizeCanvas(windowWidth, windowHeight, True);
  //loop();
  //redraw();
}

function keyPressed(){
  if(key == 'r'){
    redraw();
  }
  if(key == 's'){
    save('best.png');
  }
}