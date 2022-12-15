// https://en.wikipedia.org/wiki/Maurer_rose#p5.js_Code
function sketch_Flwr(p) {
  p.setup = function () {
    p.createCanvas(W=500,W);
    p.frameRate(12);

    p.d = p.random(3,54);
    p.n = p.random(2,13);

    p.d2 = p.random(3,54);
    p.n2 = p.random(2,13);

    p.d3 = p.random(3,54);
    p.n3 = p.random(2,13);
  }

  p.draw = function () {
    p.clear();
    p.noFill()
    p.strokeWeight(0.3);
    p.stroke(45,70,205)
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

    p.beginShape()
    //p.stroke(55,55,255)
    p.translate(-w/48,-w/48)
    for (p.t=360;p.t--;) {
      p.n2+=0.000000001;
      p.d2+=0.000000001;
      p.k=p.t*p.d2;
      p.r=(w)*p.sin(p.n2*p.k);
      p.x=p.r*p.cos(p.k);
      p.y=p.r*p.sin(p.k);
      p.vertex(p.x,p.y);
    }
    p.endShape();

    p.beginShape()
    //p.stroke(55,55,255)
    p.translate(-w/48,-w/48)
    for (p.t=360;p.t--;) {
      p.n3+=0.000000001;
      p.d3+=0.000000001;
      p.k=p.t*p.d3;
      p.r=(w)*p.sin(p.n3*p.k);
      p.x=p.r*p.cos(p.k);
      p.y=p.r*p.sin(p.k);
      p.vertex(p.x,p.y);
    }
    p.endShape();

  }
}
new p5(sketch_Flwr, '0')