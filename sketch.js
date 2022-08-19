// https://en.wikipedia.org/wiki/Maurer_rose#p5.js_Code

setup=_=>{createCanvas(W=windowWidth,H=windowHeight);background(0);d=random(2,9);n=random(3,9)}
draw=_=>{background(0,50);noFill()
stroke(``)
frameRate(12)
w=W/2
h=H/2
beginShape()
translate(w,h)
for (t=360;t--;){
n+=.000000013;d+=.00000001
k=t*d
r=(w)*sin(n*k)
x=r*cos(k)
y=r*sin(k)
vertex(x,y)}endShape()}
