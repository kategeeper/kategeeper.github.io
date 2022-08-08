// https://en.wikipedia.org/wiki/Maurer_rose#p5.js_Code

let n;
let d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(random(255),random(255),random(255));
  frameRate(30);
}

function colrs(){
  let rD = random(255);
  let gR = random(255);
  let bL = random(255);
}

function draw() {
  colrs();
  
  n = mouseY
  d = mouseX
}

function mousePressed() {
  push();
  clear();
  background(random(255),random(255),random(255));
  
  beginShape();
  fill(random(255), random(255), random(255));
  stroke(random(255), random(255), random(255));
  angleMode(DEGREES);
  translate(windowWidth/2, windowHeight/2);
  for(let theta = 0; theta <= 360; theta++){
    let k = theta * d;
    let r = width/2 * sin(n *k);
    let  x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape();

  beginShape();
  noFill();
  stroke(random(255), random(255), random(255));
  for(let theta = 0; theta <= 360; theta++){
    let k = theta;
    let r = width/2 * sin(n*k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape();
  pop();
  
  fill(0);
  noStroke(0);
  strokeWeight(1);
  textFont('Monaco', 12);
  text('n:' + str(n), 10, height - 10);
  text('d:' + str(d), 60, height - 10);
}