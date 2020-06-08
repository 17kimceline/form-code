/*
 * Form Code Project! 
 *	by Celine Kim
 *
 * Credits:
 * 		Function backgroundAura() from Artist ScieCode
 * 			https://codepen.io/sciecode/pen/QzMPgr
 * 		This artist was also inspired by Hyper Glu's Going to Quasar.
 * 		https://www.behance.net/gallery/45428489/Going-to-Quasar
 *
 */
const spaceship_num = 20;
const gradient = 50;

// arrays to hold in color
let back = [];

// x and y coodrinates of my small spaceship
let space_coord = [];
let rate = 0.3;

function setup() {
	createCanvas(windowWidth,windowHeight);

	// my five main colours dudettes
	c = [color("#140c35"),color("#3166f4"), color("#31f4ef"),
		  color("#e9ff76"),color("#fcffec")]
	// keep that frame rate fresh
	frameRate(20);
	init();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// creates the colours for the background gradients
function backgroundAura(){

	for (let i = 0; i < gradient; i++) {
		let color;
		let ratio = i/(gradient-1);

		// first color
		if (ratio < 1/4){
			color = lerpColor(c[0], c[1], i/gradient/4); // lerp: find third color between two
		}
		// second color 
		else if (ratio < 1/2) {
			color = lerpColor(c[1], c[2],(i-gradient/4)/(gradient/4));
		}
		// third color 
		else if (ratio < 3/4) {
			color = lerpColor(c[2], c[3], (i-2*gradient/4)/(gradient/4-1));
		}
		else {
			color = lerpColor(c[3], c[4], (i-2*gradient/4)/(gradient/4-1));
		}
		//sets the transparency value of a color
		color.setAlpha(20 + 5*i/(gradient-1)); 
		back.push([color]);
	}

}
function init() {
	backgroundAura();

	// create my little spaceships
	for (let i = 0; i<spaceship_num; i++){
		let y = random(0, innerHeight)
		let x = random(0, innerWidth)
		let color = c[Math.floor(Math.random()*5)]

		space_coord.push([x,y, rate, rate, color]) // x y dx, dy
	}
	
}

let angle = 0;

// creates rotating portal gatess
function createPortal(d, start, gate_size, angle){
	fill(c[4]);
	arc(innerWidth/2, innerHeight/2, 
		d-start, d-start, angle, 
		PI+QUARTER_PI +angle);

	fill(c[0]);
	ellipse(innerWidth/2, innerHeight/2, d-70-gate_size);
}

function draw() {
	background("#140c25");
	let d = min(innerWidth, innerHeight);

	gate_size = d/15;
	createPortal(d, 70, gate_size, angle);
	createPortal(d, 100+gate_size, (gate_size*2), -angle);

	angle += 0.01;

	// create gradient number of ellipses to create background
	noStroke();
	for (let i = 0; i < gradient; i++ ) {
		fill(back[i][0]);
		ellipse(innerWidth/2, innerHeight/2, d*(1-i/(gradient+1)));
	}

	// drawig my spaceships
	noStroke();
	for (let i = 0; i < spaceship_num; i++){
		//fill(space[4]) // this is if your want coloured spaceships!
		fill(c[4])

		space = space_coord[i]
		x = space[0];
		y = space[1];
		dx = space[2];
		dy = space[3];

		// let them go off screen for a little bit
		space[2] = (((x > innerWidth+20) ||x < -20) ? -dx : dx)
		space[3] = (((y > innerHeight+20) || y < -20) ? -dy : dy)

		// using my classy distance formula to get distance from center
		let s = Math.sqrt(Math.pow((x-(innerWidth/2)), 2) + Math.pow((y-(innerHeight/2)),2));
		s= s*2/(d/2)

		space[0] += space[2]*s
		space[1] += space[3]*s

		dir = (space[2] < 0 ? -1 : 1)
		x = space[0];
		y = space[1];

		// spaceship
		beginShape();
		vertex(x - 10*s*dir, y + 8*s*dir); // wing1
		vertex(x - 7*s*dir, y); // butt
		vertex(x - 10*s*dir, y - 8*s*dir); // wing2
		vertex(x + 10*s*dir, y);
		endShape(CLOSE);
	}

}

 

