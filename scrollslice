
function sketch_ScrollSlice(m) {
    let img;
    let th = 100;
  
  m.preload = function() {
    m.img = m.loadImage('https://live.staticflickr.com/6553/52478346022_d46089a222.jpg');
  }
  
  m.setup = function () {
    m.frameRate(0.5);
    m.createCanvas(m.img.width, m.img.height);
  
    for (let x = 0; x < m.width; x += xTh) {
      xTh = m.int(m.random(40, 100));
      let stripXPos = m.int(m.random(m.img.width-xTh, 0));
      let stripX = m.img.get(stripXPos, 0, xTh, m.img.height);
      m.image(stripX, x, 0); 
    }

    m.mouseWheel = function () {
      for (let x = 0; x<m.width; x += th) {
        th = m.int(m.random(80, 100));
        let stripXPos = m.int(m.random(m.img.width-th, 0));
        let strip = m.img.get(stripXPos, 0, th, m.img.height);
        m.image(strip, x, 0);
        //filter(GRAY);
      }
    }
  }
}
new p5(sketch_ScrollSlice, 'ScrollSlice')
