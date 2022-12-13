function preload() {
  img = loadImage('https://live.staticflickr.com/65535/52478346022_d46089a222.jpg');
}

let img;
let th = 100;

function sketch_Market(m) {
  m.setup = function () {
    m.frameRate(0.5);
    m.createCanvas(img.width, img.height);
  
    for (let x = 0; x < width; x += xTh) {
    xTh = int(random(40, 100));
    let stripXPos = int(random(img.width-xTh, 0));
    let stripX = img.get(stripXPos, 0, xTh, img.height);
    m.image(stripX, x, 0); 
  }

function mouseWheel() {
      for (let x = 0; x<width; x += th) {
      th = int(random(80, 100));
      let stripXPos = int(random(img.width-th, 0));
      let strip = img.get(stripXPos, 0, th, img.height);
      image(strip, x, 0);
      //filter(GRAY);
  }
}
new p5(sketch_Market, 'Market')
