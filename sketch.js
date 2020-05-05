let row_tot, col_tot; //total row and col
let cell = [];

let spacer = 10; //cell size

function setup() {

	createCanvas(700, 700);
	frameRate(5);

	//row_tot and col_tot
	row_tot = height / spacer;
	col_tot = width / spacer;



	//initialize cell
	for (let i = 0; i < col_tot; i++) {
		cell[i] = [];
		//	next_cell[i] = [];

		for (let j = 0; j < row_tot; j++) {

			cell[i][j] = new CA();
			//	next_cell[i][j] = new CA();
		}
	}
}


function draw() {

	background(255); //black background

	//initialize cell
	let next_cell = [];
	for (let i = 0; i < col_tot; i++) {

		next_cell[i] = [];

		for (let j = 0; j < row_tot; j++) {
			next_cell[i][j] = new CA();
		}
	}

	//rule
	for (let i = 0; i < col_tot; i++) {
		for (let j = 0; j < row_tot; j++) {

			//edge case

			//count the neighbour
			let sum = 0;

			for (let p = -1; p <= 1; p++) {
				for (let q = -1; q <= 1; q++) {
					let col = (i + p + col_tot) % col_tot;
					let row = (j + q + row_tot) % row_tot;
					sum += cell[col][row].state;
				}
			}
			sum -= cell[i][j].state;

			//Game of life rule
			if (cell[i][j].state == 1 && (sum < 2 || sum > 3)) next_cell[i][j].death(); //death
			else if ((cell[i][j].state == 0) && (sum == 3)) next_cell[i][j].birth(); //birth
			else next_cell[i][j].stasis(cell[i][j]); //stasis


		}
	}

	//update old
	cell = next_cell;

	//render
	for (let i = 0; i < col_tot; i++) {
		for (let j = 0; j < row_tot; j++) {
			cell[i][j].show(i, j);
		}
	}

	// saving the frame
	saveCanvas('Img', 'png');

}

class CA {
	constructor() {
		this.state = random(1) < .5 ? 0 : 1;
		if (this.state == 1) this.strength = 255;
		else this.strength = 0;
	}

	show(a, b) {
		let p = a * spacer;
		let q = b * spacer;

		//draw the rec
		if (this.state == 1) {
			noStroke();
			//fill(255);
			//color finder

			let amt = map(this.strength, 0, 255, 0, 1);
			let to = color(148, 191, 78);
			//let to = color(145, 145, 145);
			let from = color(231, 232, 76);
			let col = lerpColor(from, to, amt);

			//let col=color(this.strength);
                	fill(col);
			this.strength -= 5;

			//ellipse(p, q, spacer, spacer);
			rect(p, q, spacer, spacer)
		} 
		else {
			noStroke();
			//fill(255);
			//color finder

			let amt = map(this.strength, 0, 255, 0, 1);
			//	let to  = color(145, 145, 145);
			let from = color(231, 232, 76);
			let to = color(98, 195, 217);
			let col = lerpColor(from, to, amt);
			//let col=color(this.strength);
			fill(col);
			this.strength += 5;
			//print(this.strength);
			//ellipse(p, q, spacer, spacer);
			rect(p, q, spacer, spacer)
		}

	}


	death() {
		this.state = 0;
		this.strength = 0;
	}

	birth() {
		this.state = 1;
		this.strength = 255;
	}
	stasis(recieved_cell) {
		this.state = recieved_cell.state;
		this.strength = recieved_cell.strength;
	}

}

