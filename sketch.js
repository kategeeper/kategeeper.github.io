// https://en.wikipedia.org/wiki/Maurer_rose#p5.js_Code
setup=_=>{createCanvas(W=200,W);background(0);d=random(3,54);n=random(2,13)}
draw=_=>{background(0,255);noFill()
stroke(255,255,0)
frameRate(12)
w=W/2
beginShape()
translate(w,w)
for (t=360;t--;){
n+=.000000001;d+=.000000001
k=t*d
r=(w)*sin(n*k)
x=r*cos(k)
y=r*sin(k)
vertex(x,y)}endShape()}
