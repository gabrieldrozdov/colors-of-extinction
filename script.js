let grid = document.querySelector('.grid');

// Fetch data from JSON and generate cells
let jsonBackup;
let cells;
fetch('data.json')
	.then((response) => response.json())
	.then((json) => {
		jsonBackup = json;
		totalCells = json.length;

		// Create cells
		for (let i=0; i<json.length; i++) {
			let cell = document.createElement('div');
			cell.classList.add("cell");
			cell.id = i;

			// Parse colors to create gradient
			let cellGradient = "";
			let prevPercent = 0;
			let colors = json[i]["colors"].split(',');
			for (let j=0; j<colors.length; j++) {
				let colorSplit = colors[j].split(' ');

				// Remove extra space if added by accident
				if (colorSplit.length == 3) {
					colorSplit = [colorSplit[1], colorSplit[2]];
				}

				// Create gradient
				if (j==0) {
					cellGradient += colorSplit[1] + " 0%, "
				} else if (j==colors.length - 1) {
					cellGradient += colorSplit[1] + " " + parseInt(parseInt(colorSplit[0])+prevPercent) + "%";
				} else {
					cellGradient += colorSplit[1] + " " + parseInt(parseInt(colorSplit[0])+prevPercent) + "%, ";
				}
				prevPercent = parseInt(colorSplit[0])+prevPercent;
			}
			cell.style.background = `linear-gradient(90deg, ${cellGradient})`;

			cell.addEventListener('click', (e) => { highlight(cell, e) })
			
			grid.appendChild(cell);
		}
	});

let infoGrid = document.querySelector(".cell-grid");
let infoSpecies = document.querySelector(".cell-species");
let infoName = document.querySelector(".cell-name");
let infoExtinct = document.querySelector("#cell-info-extinct");
let infoCause = document.querySelector("#cell-info-cause");
let infoOrigin = document.querySelector("#cell-info-origin");
let infoTaxa = document.querySelector("#cell-info-taxa");
let infoColors = document.querySelector(".cell-colors");
function generateContent(id) {

	// Create pixel image
	let cellGrid = "";
	let cellHex = "";

	// Parse colors
	let colors = jsonBackup[id]["colors"].split(',');
	for (let i=0; i<colors.length; i++) {
		let colorSplit = colors[i].split(' ');

		// Remove extra space if added by accident
		if (colorSplit.length == 3) {
			colorSplit = [colorSplit[1], colorSplit[2]];
		}

		// Add pixels to the grid
		for (let j=0; j<parseInt(colorSplit[0]); j++) {
			cellGrid += `<div style='background-color:${colorSplit[1]}'></div>`;
		}

		// Add hex values
		cellHex += `
			<div class="cell-colors-entry">
				<div class="cell-colors-block" style="background-color: ${colorSplit[1]}"></div>
				<div class="cell-colors-text">
					<span><strong>HEX</strong></span>
					<span>${colorSplit[1].slice(1)}</span>
				</div>
			</div>
		`
	}

	// Populate info
	infoGrid.innerHTML = cellGrid;
	infoSpecies.innerText = jsonBackup[id]["species"];
	infoName.innerText = jsonBackup[id]["name"];
	infoExtinct.innerText = jsonBackup[id]["extinct"];
	infoCause.innerText = jsonBackup[id]["cause"];
	infoOrigin.innerText = jsonBackup[id]["origin"];
	infoTaxa.innerText = jsonBackup[id]["taxa"];
	infoColors.innerHTML = cellHex;
}

// Show info when clicking on a cell
let cellContent = document.querySelector(".cell-content");
function highlight(cell, e) {
	let cells = document.querySelectorAll(".cell");
	if (cell.classList.contains("active")) { // Remove highlight
		for (let i of cells) {
			cell.classList.remove("active");
			i.classList.remove("faded");
		}
		cellContent.style.transform = "translateY(-100vh)";
	} else { // Highlight cell
		for (let i of cells) {
			i.classList.remove("active");
			i.classList.add("faded");
		}
		cell.classList.add("active");
		cell.classList.remove("faded");

		// Generate content
		let id = cell.id;
		generateContent(id);
		cellContent.style.transform = "translateY(0vh)";
	
		// Vertical positioning
		if ((parseInt(id)+1)%5 == 0) {
			cellContent.style.top = "0vh";
		} else if ((parseInt(id)+1)%5 == 1) {
			cellContent.style.top = "0vh";
		} else if ((parseInt(id)+1)%5 == 2) {
			cellContent.style.top = "20vh";
		} else if ((parseInt(id)+1)%5 == 3) {
			cellContent.style.top = "20vh";
		} else if ((parseInt(id)+1)%5 == 4) {
			cellContent.style.top = "20vh";
		}

		// Horizontal positioning
		let posX = (Math.floor((parseInt(id)+1)/5)+1)*20;
		if (e.clientX > window.innerWidth/2) {
			cellContent.style.left = `${posX-60}vh`;
		} else {
			cellContent.style.left = `${posX}vh`;
		}
	}
}

// Close entry manually
function closeEntry() {
	let cells = document.querySelectorAll(".cell");
	for (let i of cells) {
		i.classList.remove("active");
		i.classList.remove("faded");
	}
	cellContent.style.transform = "translateY(-100vh)";
}

// Menu in and out
let navToggle = document.querySelector("#nav-toggle");
let navPlus = document.querySelector("#nav-toggle svg");
let navLinks = document.querySelector("#nav-links");
let menuState = false;
function menuToggle() {
	if (menuState == false) {
		grid.style.pointerEvents = "none";
		grid.style.filter = "grayscale(100%) brightness(50%)";
		cellContent.style.pointerEvents = "none";
		cellContent.style.filter = "grayscale(100%) brightness(50%)";
		navPlus.style.transform = "rotate(45deg)";
		navLinks.style.transform = "translateX(0%)";
		menuState = true;
	} else {
		grid.style.pointerEvents = "all";
		grid.style.filter = "grayscale(0%) brightness(100%)";
		cellContent.style.pointerEvents = "all";
		cellContent.style.filter = "grayscale(0%) brightness(100%)";
		navPlus.style.transform = "rotate(0deg)";
		navLinks.style.transform = "translateX(-100%)";
		menuState = false;
	}
}

// About in and out
let about = document.querySelector(".about");
function aboutIn() {
	about.style.transform = "translateY(0%)";
}
function aboutOut() {
	about.style.transform = "translateY(100%)";
}

// Form in and out
let form = document.querySelector(".form");
function formIn() {
	form.style.transform = "translateY(0%)";
}
function formOut() {
	form.style.transform = "translateY(100%)";
}

// Detect if mouse is pressed
let mousedown = false;
document.addEventListener("mousedown", () => {mousedown = true});
document.addEventListener("mouseup", () => {mousedown = false});

// Pick color for submission form
let formColor = document.querySelector(".form-color");
let formColorIndicator = document.querySelector(".form-color-indicator");
formColor.addEventListener("mousedown", pickColor1);
formColor.addEventListener("mousemove", pickColor2);
let formColorSelection = `hsl(180, 100%, 50%)`;
function pickColor1(e) {
	let rect = formColor.getBoundingClientRect();
	let x = (e.clientX-rect.left)/formColor.offsetWidth;
	let y = (e.clientY-rect.top)/formColor.offsetHeight;
	if (x<0) {x=0};
	if (y<0) {y=0};
	if (x>1) {x=1};
	if (y>1) {y=1};
	formColorSelection = `hsl(${360*x},100%,${-100*y+100}%)`;
	formColorIndicator.style.left = `calc(${x*100}% - .75rem)`;
	formColorIndicator.style.top = `calc(${y*100}% - .75rem)`;
	formColorIndicator.style.backgroundColor = formColorSelection;
}
function pickColor2(e) {
	if (mousedown) {
		let rect = formColor.getBoundingClientRect();
		let x = (e.clientX-rect.left)/formColor.offsetWidth;
		let y = (e.clientY-rect.top)/formColor.offsetHeight;
		if (x<0) {x=0};
		if (y<0) {y=0};
		if (x>1) {x=1};
		if (y>1) {y=1};
		formColorSelection = `hsl(${360*x},100%,${-100*y+100}%)`;
		formColorIndicator.style.left = `calc(${x*100}% - .75rem)`;
		formColorIndicator.style.top = `calc(${y*100}% - .75rem)`;
		formColorIndicator.style.backgroundColor = formColorSelection;
	}
}

// Set color of pixel on grid for submission form
let formGrid = document.querySelector(".form-grid");
for (let i of formGrid.querySelectorAll("div")) {
	i.addEventListener("mousedown", () => {setColor1(i)});
	i.addEventListener("mousemove", () => {setColor2(i)});
}
function setColor1(e) {
	e.style.backgroundColor = formColorSelection;
	trackColor();
}
function setColor2(e) {
	if (mousedown) {
		e.style.backgroundColor = formColorSelection;
		trackColor();
	}
}

// Update input field as colors get added
let formColorInput = document.querySelector(".form-colorinput");
let formColors = {};
let submit = document.querySelector(".form-submit");
let submitAlert = document.querySelector(".form-submit-alert");
function trackColor() {
	formColors = {};
	for (let i of formGrid.querySelectorAll("div")) {
		let color = String(i.style.backgroundColor);
		if (color != "") {
			if (color in formColors) {
				formColors[color] = formColors[color] + 1;
			} else {
				formColors[color] = 1;
			}
		}
	}
	formColorInput.value = JSON.stringify(formColors);
	
	let count = 0;
	for (let key of Object.keys(formColors)) {
		count += formColors[key];
	}
	if (count == 100) {
		submit.style.opacity = 1;
		submit.style.pointerEvents = "all";
		submit.style.backgroundColor = "white";
		submitAlert.style.display = "none";
	}
}