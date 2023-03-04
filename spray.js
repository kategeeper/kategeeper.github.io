//reference: https://note.com/outburst/n/n631a3845186c?magazine_key=mc9b486906e56https://note.com/outburst/n/n631a3845186c?magazine_key=mc9b486906e56 //

p5.disableFriendlyErrors = true;
let cnv;
let cnvbg;
let swatchCnv;
let boardX;
let boardY;
let layer1;
let layer2;
let cSlider; //color value
let dSlider; //tool diameter / 2
let fSlider; //flow amount
let aSlider; //theta = random(a)
let rotSlider; //tool rotation
let xwSlider;
let ywSlider;

let c, d, f, theta, r, x, y;
let currentMode;
let getMode;

let path = [];
let tightness = 3;

let mX, mY;
let a, rot;
let ff = 15;
let xw;
let yw;

let scale = 1.5;

let hueSlider;
let saturationOn = false;
let sat = 0;
function toggleSat() {
  saturationOn = !saturationOn;
}

function randomize() {
  dSlider.value(random(0, 80));
  cSlider.value(random(0, 100));
  fSlider.value(random(100, 200.1)); //fSlider.value(random(0.1, 200.1));
  aSlider.value(random(0, 6.28)); //aSlider.value(random(0.1, 6.28));
  rotSlider.value(random(1, 6.28));
  xwSlider.value(random(0.5, 1));
  ywSlider.value(random(0.5, 1));
  hueSlider.value(random(0, 360));
  satSlider.value(random(10, 90));
  let rMode = int(random(1, 8));
  currentMode.selected(str(rMode));
  setSwatch();
}

function initialize() {
  dSlider.value(20);
  cSlider.value(0);
  fSlider.value(150); //fSlider.value(random(0.1, 200.1));
  aSlider.value(6.28); //aSlider.value(random(0.1, 6.28));
  rotSlider.value(6.28);
  xwSlider.value(1);
  ywSlider.value(1);
  hueSlider.value(0);
  satSlider.value(50);
  let rMode = int(1);
  currentMode.selected(str(rMode));
  setSwatch();
}

function setup() {
  //frameRate(30);
  boardX = 900;
  // boardY = windowHeight * 0.85;
  boardY = 640;
  // pixelDensity(1);
  noSmooth();
  cnv = createCanvas(boardX, boardY);
  cnv.parent("sketch_holder");
  cnvbg = color(190);

  layer1 = createGraphics(boardX, boardY);

  dSlider = createSlider(1, 101, 20);
  dSlider.parent("d_slider");
  dSlider.class("slider_style");

  cSlider = createSlider(0, 100, 0);
  cSlider.parent("c_slider");
  cSlider.class("slider_style");
  fSlider = createSlider(0.1, 200.1, 180.1);
  fSlider.parent("f_slider");
  fSlider.class("slider_style");

  aSlider = createSlider(0, 6.2831853071795, 6.28, 0);

  aSlider.parent("a_slider");
  aSlider.class("slider_style");

  rotSlider = createSlider(0, 6.2831853071795, 6.28, 0);
  rotSlider.parent("rot_slider");
  rotSlider.class("slider_style");
  xwSlider = createSlider(0.05, 1, 1, 0);
  xwSlider.parent("xw_slider");
  xwSlider.class("slider_style");
  ywSlider = createSlider(0.05, 1, 1, 0);
  ywSlider.parent("yw_slider");
  ywSlider.class("slider_style");

  // redSlider = createSlider(0, 255, 0);
  // grnSlider = createSlider(0, 255, 0);
  // bluSlider = createSlider(0, 255, 0);

  colorMode(HSB);
  hueSlider = createSlider(0, 360, 0);
  hueSlider.parent("hue_slider");
  hueSlider.class("slider_style");

  satSlider = createSlider(0, 100, 0);
  satSlider.parent("sat_slider");
  satSlider.class("slider_style");

  layer1.clear();

  currentMode = createRadio();
  currentMode.parent("mode_holder");
  currentMode.option("1", "a");
  currentMode.option("2", "s");
  currentMode.option("3", "d");
  currentMode.option("4", "f");
  currentMode.option("5", "z");
  currentMode.option("6", "x");
  currentMode.option("7", "c");
  // currentMode.option("h", "h"); // currentMode.option("i", "i"); // currentMode.option("j", "j"); // currentMode.option("k", "k");
  currentMode.selected("1");

  swatchCnv = createGraphics(200, 50);
  swatchCnv.parent("swatch_holder");
  swatchCnv.id("swatch_Cnv");
  swatchCnv.style("display", "flex");
  swatchCnv.style("cursor", "pointer");
  swatchCnv.translate(100, 25);

  const resetBtn = createButton("");
  resetBtn.parent("reset_holder");
  resetBtn.id("reset_btn");
  resetBtn.mousePressed(clearSketch);

  const saveBtn = createButton("SAVE");
  saveBtn.parent("saveBtn_holder");
  saveBtn.id("save_btn");
  saveBtn.mousePressed(saveSketch);

  const randomBtn = createButton("random");
  randomBtn.parent("mode_holder");
  randomBtn.id("random_btn");
  randomBtn.mousePressed(randomize);

  // const initBtn = createButton("reset");
  // intitBtn.parent("initBtn_holder");
  // initBtn.id("init_btn");
  // initBtn.mousePressed(initialize);

  a = aSlider.value();
  rot = rotSlider.value();
  xw = 1;
  yw = 1;

  swatchCnv.mousePressed(toggleSat);

  initialize();
  // setSwatch();
} // end of setup

function saveSketch() {
  saveCanvas();
}

function swatchBg() {
  let thr = 80;
  if (cSlider.value() >= thr) {
    return "black";
  } else if (cSlider.value() <= thr) {
    return "rgb(200, 200, 200)";
  }
}

let angle = 0;

function auto(angle, autom8) {
  let aut0 = map(sin(angle), -1, 1, 0.05, 1);
  let something = autom8.value(aut0);
  angle += 0.05;
}

// start of draw()
function draw() {
  blendMode(BLEND);
  cnv.background(cnvbg);
  //layer1.background(190);

  if (saturationOn) {
    sat = satSlider.value();
  } else {
    sat = 0;
  }

  swatchCnv.style("background", swatchBg());
  // swatchCnv.style("background", "rgb(220, 220, 220)");
  // swatchCnv.style("background", "rgb(0, 0, 0)");
  // swatchCnv.style("background", "rgb(128, 128, 128)");

  image(layer1, 0, 0);
  image(swatchCnv, 0, 0);
  c = cSlider.value();
  d = dSlider.value();
  f = fSlider.value();
  mX = mouseX;
  mY = mouseY;
  a = aSlider.value();
  rot = rotSlider.value();

  currentMode.changed(setSwatch);
  cSlider.input(setSwatch);
  dSlider.input(setSwatch);
  fSlider.input(setSwatch);
  aSlider.input(setSwatch);

  if (keyIsPressed) {
    if (keyCode === 82) {
      randomize();
    }
    if (key === "a") {
      currentMode.selected("1");
      setSwatch();
    }
    if (key === "s") {
      currentMode.selected("2");
      setSwatch();
    }
    if (key === "d") {
      currentMode.selected("3");
      setSwatch();
    }
    if (key === "f") {
      currentMode.selected("4");
      setSwatch();
    }
    if (key === "z") {
      currentMode.selected("5");
      setSwatch();
    }
    if (key === "x") {
      currentMode.selected("6");
      setSwatch();
    }
    if (key === "c") {
      currentMode.selected("7");
      setSwatch();
    }
    if (key === "v") {
      satSlider.value(0);
      setSwatch();
    }
    if (key === "e") {
      aSlider.value(6.28);
      setSwatch();
    }
    if (key === "w") {
      xwSlider.value(1);
      ywSlider.value(1);
      setSwatch();
    }
    if (key === "1") {
      dSlider.value(5);
      setSwatch();
    }
    if (key === "2") {
      dSlider.value(17);
      setSwatch();
    }
    if (key === "3") {
      dSlider.value(40);
      setSwatch();
    }
    if (key === "4") {
      dSlider.value(70);
      setSwatch();
    }
    if (key === "5") {
      dSlider.value(101);
      setSwatch();
    }
    if (key === "q") {
      dSlider.value(0.1);
      setSwatch();
    }
    if (key === "t") {
      rotSlider.value() - 0.1;
    }
  }

  // if (keyIsPressed) {
  //   if (keyCode === 82) {
  //     randomize();
  //   }
  // }

  // if (keyIsPressed) {
  //   if (key === "a") {
  //     currentMode.selected("1");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "s") {
  //     currentMode.selected("2");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "d") {
  //     currentMode.selected("3");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "f") {
  //     currentMode.selected("4");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "z") {
  //     currentMode.selected("5");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "x") {
  //     currentMode.selected("6");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "c") {
  //     currentMode.selected("7");
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "v") {
  //     satSlider.value(0);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "e") {
  //     aSlider.value(6.28);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "w") {
  //     xwSlider.value(1);
  //     ywSlider.value(1);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "1") {
  //     dSlider.value(5);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "2") {
  //     dSlider.value(17);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "3") {
  //     dSlider.value(40);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "4") {
  //     dSlider.value(70);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "5") {
  //     dSlider.value(101);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "q") {
  //     dSlider.value(0.1);
  //     setSwatch();
  //   }
  // }
  // if (keyIsPressed) {
  //   if (key === "t") {
  //     rotSlider.value() - 0.1;
  //   }
  // }

  // Tool Cursor //////
  // controls at top:
  // if (mY > -10) {
  //   showCursor(mouseX, mouseY, d);
  // }

  // ////////////////////

  // // Tool Activate ///////////////

  // if (mouseIsPressed && mouseButton === LEFT && mY > 0) {
  //   setSwatch();
  //   path.push(createVector(mouseX, mouseY));
  //   if (path.length > 2) {
  //     path.splice(0, 1);
  //   }
  //   toolTest();
  // } else if (mouseIsPressed && mouseButton === LEFT) {
  //   setSwatch();
  // } //////////////////////////////

  //controls at bottom:
  if (mY > -10 && mY < height + 10) {
    showCursor(mouseX, mouseY, d);
  }
  ////////////////////

  // Tool Activate ///////////////
  if (mouseIsPressed && mouseButton === LEFT && mY < cnv.height) {
    setSwatch();
    path.push(createVector(mouseX, mouseY));
    if (path.length > 2) {
      path.splice(0, 1);
    }
    toolTest();
  } else if (mouseIsPressed && mouseButton === LEFT) {
    setSwatch();
  } //////////////////////////////

  if (mouseY > height) {
    path.splice(0, path.length);
  }
} // end of draw()

function toolTest() {
  // let ff = 15;
  // let xw = 1;
  // let yw = 1;
  // rot = rotSlider.value();

  c = cSlider.value();
  h = color(hueSlider.value(), satSlider.value(), cSlider.value());
  d = dSlider.value();
  f = fSlider.value();
  xw = xwSlider.value();
  // yw = ywSlider.value();

  for (let i = 1; i < path.length; i++) {
    let current = path[i];
    let previous = path[i - 1];
    let distance = previous.dist(current);
    let extraPoints = round((distance / d) * tightness);
    layer1.push();
    layer1.translate(previous.x, previous.y);
    layer1.rotate(rot);
    for (let i = 0; i < (f * d) / ff; i++) {
      let theta = random(a);
      let r = calcR(currentMode.value(), d);
      let xoff = r * cos(theta);
      let yoff = r * sin(theta);

      // layer1.stroke(c);
      // layer1.point(xoff * xw, yoff * yw);
      layer1.noStroke();
      layer1.fill(h);
      layer1.circle(xoff * xw, yoff * yw, scale);
    }
    layer1.pop();
    for (let j = 0; j < extraPoints; j++) {
      let interpolation = map(j, 0, extraPoints, 0.0, 1.0);
      let inbetween = p5.Vector.lerp(previous, current, interpolation);
      layer1.push();
      layer1.translate(inbetween.x, inbetween.y);
      layer1.rotate(rot);
      for (let i = 0; i < (f * d) / ff; i++) {
        let theta = random(a);
        let r = calcR(currentMode.value(), d);
        let xoff = r * cos(theta);
        let yoff = r * sin(theta);
        // layer1.stroke(c);
        //default: layer1.point(xoff, yoff);
        // layer1.point(xoff * xw, yoff * yw);
        //layer1.point(sqrt(xoff), yoff);

        // layer1.stroke(c);
        // layer1.point(xoff * xw, yoff * yw);
        layer1.noStroke();
        layer1.fill(h);
        layer1.circle(xoff * xw, yoff * yw, scale);
      }
      layer1.pop();
    }
  }
}

function calcR(gm, d) {
  let getMode = gm;
  if (getMode === "1") {
    let r = d * sqrt(random());
    return r;
  } else if (getMode === "2") {
    let r = d * (1 - sqrt(random()));
    return r;
    // let r = d * (1 - random());
    // alternative:
    //(1 - sqrt(random()));
    return r;
  } else if (getMode === "3") {
    let r = d * (1 - random(random(random())));
    // (-1 - random(random(random()));
    //(1 - -random(random(random())^ 2)); *****
    //(1 - -random(random(random() ^ 2)));
    //(1 - random(random(random() ^ 3)));
    return r;
  } else if (getMode === "4") {
    let r = d * sqrt(0.1 + random());
    return r;
  } else if (getMode === "5") {
    let r = d * sqrt(1 + random() * -0.5);
    return r;
  } else if (getMode === "6") {
    let r = d * (1 - -random(random(random() ^ 2)));
    return r;
  } else if (getMode === "7") {
    let r =
      (d * (1 - random(random(random())))) /
      (1 - random(random(random(random()) ^ 2)));
    return r;
  }
  // else if (getMode === "h") {
  // } else if (getMode === "i") {
  //   let r = d * sqrt(random());
  //   xw = sqrt(((1 * r) / 3) ^ 3);
  //   yw = sqrt(((1 * r) / 3) ^ 3);
  //   return r;
  // } else if (getMode === "j") {
  //   let r = d * sqrt(random());
  //   xw = sqrt((1 * r) ^ 2);
  //   yw = sqrt((1 * r) ^ 2);
  //   return r;
  // } else if (getMode === "k") {
  //   return r;
  // }
}

function setSwatch() {
  swatchCnv.clear();
  h = color(hueSlider.value(), satSlider.value(), cSlider.value());
  rot = rotSlider.value();
  c = cSlider.value();
  d = dSlider.value();
  f = fSlider.value();
  a = aSlider.value();
  // h = hueSlider.value();
  xw = xwSlider.value();
  yw = ywSlider.value();
  swatchCnv.push();
  // swatchCnv.translate(previous.x, previous.y);
  swatchCnv.rotate(rot);
  for (let i = 0; i < (f * d) / 4; i++) {
    let theta = random(a);
    let r = calcR(currentMode.value(), d);
    let xoff = r * cos(theta);
    let yoff = r * sin(theta);
    // swatchCnv.stroke(c);
    // swatchCnv.point(xoff * xw, yoff * yw, scale);
    swatchCnv.noStroke();
    swatchCnv.fill(h);
    swatchCnv.circle(xoff * xw, yoff * yw, scale);
  }
  swatchCnv.pop();
}

function clearSketch() {
  cnv.background(cnvbg);
  layer1.clear();
}

function mousePressed() {
  path.splice(0, path.length);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mapExp(val, start1, stop1, start2, stop2) {
  let inE = map(val, start1, stop1, 0, 1);
  let outE = exp(inE);
}

function showCursor(x, y, d) {
  noFill();
  blendMode(DIFFERENCE);
  setLineDash([2, (d * PI) / (6 * PI)]);
  strokeWeight(1);
  stroke(60, 100, 100);
  circle(x, y, d * 2);
  setLineDash([1, 2]);
  d = d * 1.2;
  line(x - d, y, x + d, y);
  line(x, y - d, x, y + d);
}

// function windowResized() {
//   resizeCanvas(900, windowHeight * 0.8);
// }
