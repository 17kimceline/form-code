function setup() {
  createCanvas(innerWidth, innerHeight)
  background(40, 50, 100)
  /*strokeWeight(10)
  stroke(255, 0,0)
  stroke(255, 0, 0)
  fill(255, 0, 255)
  ellipse(x, y, r)*/
}
/*
function mouseMoved(){
  let x = mouseX
  let y = map(mouseY, 0, height, height*0.25, height*0.75) 
  let d = mouseY

  let r = map(mouseX, 0, width, 0, 255)
  let g = map(mouseY, 0, height, 0, 255)
  fill(r, g, 0)
  ellipse(x,y, d)
}*/

let x = innerWidth/2
let y = innerHeight/2
let dy = 2
let dx = 2

function draw(){
  background(40,50,77,10)
  let d = width/8
  let r = d/2
  dx = (((x > width - r) || x < r) ? -dx : dx)
  dy = (y > height - r || (y < r) ? -dy : dy)
  
  x += dx
  y += dy
  
  //if (mouseIsPressed){
  ellipse(x,y,d)
  //}


}

