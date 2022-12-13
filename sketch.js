// https://en.wikipedia.org/wiki/Maurer_rose#p5.js_Code
function sketch_Flwr(p) {
  p.setup = function () {
    p.createCanvas(W=200,W);
    p.frameRate(12);
    
    p.d = p.random(3,54);
    p.n = p.random(2,13);
  }

  p.draw = function () {
    p.background(0);
    p.noFill()
    p.stroke(55,55,255)
    w=W/2
    p.beginShape()
    p.translate(w,w)
    for (p.t=360;p.t--;) {
      p.n+=0.000000001;
      p.d+=0.000000001;
      p.k=p.t*p.d;
      p.r=(w)*p.sin(p.n*p.k);
      p.x=p.r*p.cos(p.k);
      p.y=p.r*p.sin(p.k);
      p.vertex(p.x,p.y);
    }
    p.endShape();
  }
}
new p5(sketch_Flwr, 'Flwr')
