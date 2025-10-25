let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0LvAOkgUoTVo91TI335k0YlwThSI6C8JK8Ra5qJPW6enqwiAd7MPIFRhR5Xe3TqOJJe7YI-YKmCpj/pub?gid=0&single=true&output=csv";
let img1, img2, img3, img4, img5, img6;
let imgs = [];
let bubbles = [];

function preload() {
  data = loadTable(url, "csv", "header");
  img1 = loadImage('almondmilk.png');
  img2 = loadImage('caesar.png');
  img3 = loadImage('noodles.png');
  img4 = loadImage('VDmilk.png');
  img5 = loadImage('elk.png');
}

function setup() {
  createCanvas(500, 400);
  imgs = [img1, img2, img3, img4, img5];
}

function draw() {
  background(152, 230, 230);

  if (data) {
    let numRows = data.getRowCount();
    let fat = data.getColumn("Fat");
    let names = data.getColumn("Food");

    for (let i = 0; i < numRows; i++) {
      let x = 70 + i * 85;
      let y = 350;
      let h = fat[i];
      
    if (imgs[i]) {
      imageMode(CENTER);
      image(imgs[i], x, y, 50, 50); 
      }
      
    if (dist(mouseX, mouseY, x, y) < 25) {
      textSize(14);
      fill(25, 103, 103);
      text(names[i], x, y - 40);
    }
      
      textSize(32);
      fill(0);
      textAlign(CENTER);
      text("Fat", width / 2, 50);
      textSize(14);
      text("Click on the image to see fat content. Fat = Bubble Radius", width / 2, 75);
    }
 }
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-2, 0);
  }

  show() {
    noStroke();
    fill(255, 255, 204, 50);
    ellipse(this.x, this.y, this.r * 2);
  }
}

function mousePressed() {
  let fat = data.getColumn("Fat").map(f => float(f));
  for (let i = 0; i < imgs.length; i++) {
    let x = 70 + i * 85, y = 350;
    if (dist(mouseX, mouseY, x, y) < 25) {
      let r = map(fat[i], 0, max(fat), 10, 60);
      bubbles.push(new Bubble(x, y - 60, r));
    }
  }
}
