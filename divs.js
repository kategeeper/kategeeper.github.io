
  //function setup() {
    //noCanvas();

    // let Flwr = createDiv();
    // Flwr.class('card');
    // Flwr.id('Flwr');

    // let img01 = createDiv();
    // img01.class('card');
    // img01.style('background-image','url("https://live.staticflickr.com/65535/52354298631_b7fb91e32f_c.jpg")');

    // let img02 = createDiv();
    // img02.class('card');
    // img02.style('background-image','url("https://live.staticflickr.com/65535/52479394858_694416ace9_b.jpg")');

    // let img03 = createDiv();
    // img03.class('card');
    // img03.style('background-image','url("https://live.staticflickr.com/65535/52479126474_b2c236fe0b_b.jpg")');

  //}



function container(d) {

  let divArray = [];
  let num = 100;

  let imgs = [
    //'url("")',
    'url("https://live.staticflickr.com/65535/52478345852_375cf74676_b.jpg")',
    // 'url("https://live.staticflickr.com/65535/52354618649_b9d46dcb28_b.jpg")',
    // 'url("https://live.staticflickr.com/65535/52354298631_b7fb91e32f_b.jpg")',
    'url("https://live.staticflickr.com/65535/52354535114_d2591c2ab8_b.jpg")',
    'url("https://live.staticflickr.com/65535/52457164432_135ffd9876_b.jpg")',
    'url("https://live.staticflickr.com/65535/52479395528_e161470f00_b.jpg")',
    'url("https://live.staticflickr.com/65535/52487999542_312e838042_b.jpg")',
    'url("https://live.staticflickr.com/65535/52366775425_504c685caa_b.jpg")',
    'url("https://live.staticflickr.com/65535/52479308905_31eb2a8785_b.jpg")',
    'url("https://live.staticflickr.com/65535/52479126474_b2c236fe0b_b.jpg")',
    'url("https://live.staticflickr.com/65535/52479394858_694416ace9_b.jpg")',
    'url("https://live.staticflickr.com/65535/52354535014_3b254741cd.jpg")'
  ];

  d.setup = function () {
    d.noCanvas();

    // let Flwr = d.createDiv();
    // Flwr.class('card');
    // Flwr.id('Flwr');

    for (let i = 0; i < num; i++) {
      divArray.push(new new_Div(i));
    }
  }

  function getImg() {
    return imgs[d.floor(d.random(0, imgs.length))];
  }

  class new_Div {
    constructor(divID) {
      let divDefault = d.createDiv('');
      if (divID != 0) {
        divDefault.style('background-image', getImg());
      }
      divDefault.class('card');
      divDefault.id(divID);
    }
  }
}
new p5(container, 'container')