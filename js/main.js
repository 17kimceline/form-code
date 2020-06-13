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
 * 		Complimentary Colours calculated here: 
 * 			https://www.sessions.edu/color-calculator/
 *
 */
const spaceship_num = 90;
const gradient = 50;
const star_num = 1000;

// arrays to hold in color
let back = [];
let sp_back = []
let stars = [];
const max_star_size = 0.5;

// x and y coodrinates of my small spaceship
let space_coord = [];
let rate = 2;
const max_rate = 2;
const min_rate = -2;
const pastel_colors = ["#d3dcce", "#f0f8ff", "#ffbab8", "#dfebe8", "#ff8787", "fbf3ff",
						"#d4c8e1", "#ffe4e1", "#cbcba9"] 


// far they can go off the screen 
const freedom = 100;

// angle of the portal gates
let angle = 0;



/*
	x-coordinates
*/
function setup() {
	createCanvas(windowWidth,windowHeight);
	// my five main colours dudettes
	bg = [color("#140c35"),color("#3166f4"), color("#31f4ef"), 
		  color("#e9ff76"),color("#fcffec")]

	// The approximate complemtary colours of the five dudettes
	/*sp = [color("#f46231"),color("#c77630"), color("#f09f98"), 
		  color("#f7cee8"),color("#ffecfc")]
*/
	sp = [color("#5c5148"),color("#a9602f"),
		  color("#bf550d"), color("#44c3ce"),
		  color("#fffef0"),color("#ffecfc")]	

	
	// keep that frame rate fresh
	frameRate(20);
	init();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// creates the colours for the background gradients
function backgroundAura(c,a, back, gradient){

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
		if(a){
			color.setAlpha(30 + 5*i/(gradient-1)); 
		}

		back.push([color]);
	}

}

/*
	My function pased on function backgroundAura()
*/
function backgroundAura2(c, back, gradient){
	let n = c.length
	let index = 0;
	let diff = 1/(n-1)

	let bb = Math.ceil(gradient/(n-1))

	for (let i = 0; i < gradient; i++) {
		let color;
		let k = (i%bb)/bb
		print(i, k, index, diff, i/gradient)
		// update the index
		if(i/gradient >= diff){
			index++;
			diff += 1/(n-1)
		}
		color = lerpColor(c[index], 
						  c[index +1], 
						  k+0.1)
		back.push([color]);
	}

}



function init() {
	backgroundAura(bg, true, back, 50);
	backgroundAura2(sp, sp_back, 50)

	// create my little spaceships
	for (let i = 0; i<spaceship_num; i++){
		let y = random(0, innerHeight)
		let x = random(0, innerWidth)

		// give them random rates because each pilot got their own feelings
		dx = Math.random()*(max_rate - min_rate) + min_rate
		dy = Math.random()*(max_rate - min_rate) + min_rate
		space_coord.push([x,y, dx, dy/2]) // x y dx, dy
	}

	// create the stars
	for (let i =0; i< star_num;i++){
		let y = random(0, innerHeight)
		let x = random(0, innerWidth)
		let s = random(0, max_star_size)
		stars.push([x,y, s])

	}
	
}



// creates rotating portal gatess
function createPortal(start, gate_size, angle, color){
	noFill()
	strokeWeight(gate_size)
	stroke(color)
	arc(innerWidth/2, innerHeight/2, 
		start, start, angle, 
		QUARTER_PI + angle);
}

function draw() {
	background("#140c25");
	let d = min(innerWidth, innerHeight);
	
	// draw stars
	for(let i = 0; i< star_num; i++){
		fill("white")
		
		r = random(d/70, d/100)
		ellipse(stars[i][0], stars[i][1], stars[i][2]*r);
	}
	// create gradient number of ellipses to create background
	noStroke();
	for (let i = 0; i < gradient; i++ ) {
		fill(back[i][0]);
		ellipse(innerWidth/2, innerHeight/2, (d)*(1-i/(gradient+1)));
	}

	// drawig my spaceships
	noStroke();
	for (let i = 0; i < spaceship_num; i++){
		r = floor(random(0, pastel_colors.length))
		c = color(pastel_colors[r])
		stroke(c)
		noFill(c)
		
		space = space_coord[i]
		x = space[0];
		y = space[1];
		dx = space[2];
		dy = space[3];

		// let them go off screen for a little bit
		space[2] = (((x > innerWidth+freedom) ||x < -freedom) ? -dx : dx)
		space[3] = (((y > innerHeight+freedom) || y < -freedom) ? -dy : dy)

		
		// using my classy distance formula to get distance from center
		let s = Math.sqrt(Math.pow((x-(innerWidth/2)), 2) + Math.pow((y-(innerHeight/2)),2));
		s= s/(d/3)

		strokeWeight(d/(300)*s)
		space[0] += space[2]*s*s
		space[1] += space[3]*s*s

		dir = (space[2] < 0 ? -1 : 1)
		x = space[0];
		y = space[1];
		diry = (space[3] < 0 ? -1 : 1)

		// spaceship
		beginShape();
			vertex(x - 10*s*dir, y + 8*s*dir); // wing1
			vertex(x - 7*s*dir, y); // butt
			vertex(x - 10*s*dir, y - 8*s*dir); // wing2
			vertex(x + 12*s*dir, y); //node
		endShape(CLOSE);
	}

	// drawing portal gates
	gate_size = d/40;
	num_spiral = 50;
	constant = 30/num_spiral
	k = 0;
	for (let i = 0; i < num_spiral; i++){

		k = (1-(i/num_spiral) + k)
		//sp_back[i][0].setAlpha(200);
		createPortal(d + freedom - gate_size*k*1, 
					gate_size*(1 - (i/num_spiral)), 
					angle + constant*i, 
					sp_back[i%50][0]);
	}
	angle+=0.01
	

}

 

