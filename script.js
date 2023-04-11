let grid = document.querySelector('.grid');
let totalCells = 100;

// Generate random cells for testing
for (let i=0; i<totalCells; i++) {
	let cell = document.createElement('div');
	cell.classList = "cell";
	cell.dataset.position = i;

	let colors = [
		Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0"),
		Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0"),
		Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0"),
		Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0"),
		Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0"),
	]

	let cellImage = "";

	// Color ranges
	let max = 100-Math.floor(Math.random()*50+1);
	function randombetween(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	let r1 = randombetween(5, max-3);
	let r2 = randombetween(5, max-2-r1);
	let r3 = randombetween(5, max-1-r1-r2);
	let r4 = max - r1 - r2 - r3;

	for (let j=0; j<100; j++) {
		if (j < r1) {
			cellImage += `<div style='background-color:#${colors[0]}'></div>`;
		} else if (j < r1+r2) {
			cellImage += `<div style='background-color:#${colors[1]}'></div>`;
		} else if (j < r1+r2+r3) {
			cellImage += `<div style='background-color:#${colors[2]}'></div>`;
		} else if (j < r1+r2+r3+r4) {
			cellImage += `<div style='background-color:#${colors[3]}'></div>`;
		} else {
			cellImage += `<div style='background-color:#${colors[4]}'></div>`;
		}
	}

	let cellInfo = `
		<div class="cell-gradient" style="background:linear-gradient(90deg, #${colors[0]} 0%, #${colors[1]} ${r1}%, #${colors[2]} ${r1+r2}%, #${colors[3]} ${r1+r2+r3}%, #${colors[4]} 100%)"></div>
		<div class="cell-content">
			<div class="cell-image">
				${cellImage}
			</div>
			<h2 class="cell-species">Megupsilon aporus</h2>
			<h3 class="cell-name">Catarina Pupfish</h3>
			<div class="cell-info">
				<p><strong>Extinct:</strong> 1994</p>
				<p><strong>Cause:</strong> Destruction of habitat</p>
				<p><strong>Origin:</strong> Mexico</p>
				<p><strong>Taxa:</strong> Agnatha</p>
			</div>
			<div class="cell-colors">
				<div class="cell-colors-entry">
					<div class="cell-colors-block" style="background-color: #${colors[0]}"></div>
					<div class="cell-colors-text">
						<span><strong>HEX</strong></span>
						<span>${colors[0]}</span>
					</div>
				</div>
				<div class="cell-colors-entry">
					<div class="cell-colors-block" style="background-color: #${colors[1]}"></div>
					<div class="cell-colors-text">
						<span><strong>HEX</strong></span>
						<span>${colors[1]}</span>
					</div>
				</div>
				<div class="cell-colors-entry">
					<div class="cell-colors-block" style=background-color: #${colors[2]}"></div>
					<div class="cell-colors-text">
						<span><strong>HEX</strong></span>
						<span>${colors[2]}</span>
					</div>
				</div>
				<div class="cell-colors-entry">
					<div class="cell-colors-block" style="background-color: #${colors[3]}"></div>
					<div class="cell-colors-text">
						<span><strong>HEX</strong></span>
						<span>${colors[3]}</span>
					</div>
				</div>
				<div class="cell-colors-entry">
					<div class="cell-colors-block" style="background-color: #${colors[4]}"></div>
					<div class="cell-colors-text">
						<span><strong>HEX</strong></span>
						<span>${colors[4]}</span>
					</div>
				</div>
			</div>
		</div>
	`
	cell.innerHTML += cellInfo;

	grid.appendChild(cell);
	let gradient = cell.querySelector(".cell-gradient");
	gradient.addEventListener('click', () => { highlight(cell) })
}

// Fetch data from JSON and generate cells
// let jsonBackup;
// fetch('data.json')
// 	.then((response) => response.json())
// 	.then((json) => {
// 		jsonBackup = json;
// 		totalCells = json.length
// 		for (let i=0; i<json.length; i++) {
// 			let cell = document.createElement('div');
// 			cell.classList = "cell";
// 			cell.dataset.position = i;
// 			let colors = json[i]["colors"].split(',');

// 			// Create pixel image
// 			let cellImage = "";
// 			let cellGradient = "";
// 			let prevPercent = 0;
// 			let cellHex = "";
// 			for (let j=0; j<colors.length; j++) {
// 				let colorSplit = colors[j].split(' ');
// 				if (colorSplit.length == 3) {
// 					colorSplit = [colorSplit[1], colorSplit[2]]
// 				}

// 				for (let k=0; k<parseInt(colorSplit[0]); k++) {
// 					cellImage += `<div style='background-color:${colorSplit[1]}'></div>`;
// 				}

// 				if (j==0) {
// 					cellGradient += colorSplit[1] + " 0%, "
// 				} else if (j==colors.length - 1) {
// 					cellGradient += colorSplit[1] + " " + parseInt(parseInt(colorSplit[0])+prevPercent) + "%";
// 				} else {
// 					cellGradient += colorSplit[1] + " " + parseInt(parseInt(colorSplit[0])+prevPercent) + "%, ";
// 				}
// 				prevPercent = parseInt(colorSplit[0])+prevPercent;

// 				cellHex += `
// 					<div class="cell-colors-entry">
// 						<div class="cell-colors-block" style="background-color: ${colorSplit[1]}"></div>
// 						<div class="cell-colors-text">
// 							<span><strong>HEX</strong></span>
// 							<span>${colorSplit[1].slice(1)}</span>
// 						</div>
// 					</div>
// 				`
// 			}

// 			// Populate info
// 			let cellInfo = `
// 				<div class="cell-gradient" style="background:linear-gradient(90deg, ${cellGradient})"></div>
// 				<div class="cell-content">
// 					<div class="cell-image">
// 						${cellImage}
// 					</div>
// 					<h2 class="cell-species">${json[i]["species"]}</h2>
// 					<h3 class="cell-name">${json[i]["name"]}</h3>
// 					<div class="cell-info">
// 						<p><strong>Extinct:</strong> ${json[i]["extinct"]}</p>
// 						<p><strong>Cause:</strong> ${json[i]["cause"]}</p>
// 						<p><strong>Origin:</strong> ${json[i]["origin"]}</p>
// 						<p><strong>Taxa:</strong> ${json[i]["taxa"]}</p>
// 					</div>
// 					<div class="cell-colors">
// 						${cellHex}
// 					</div>
// 				</div>
// 			`
// 			cell.innerHTML += cellInfo;
	
// 			grid.appendChild(cell);
// 			let gradient = cell.querySelector(".cell-gradient");
// 			gradient.addEventListener('click', () => { highlight(cell) })
// 			console.log(cell);
// 		}
// 	});

// Show info when clicking on a cell
let cells = document.querySelectorAll(".cell");
function highlight(cell) {
	if (cell.classList.contains("active")) {
		for (let i of cells) {
			cell.classList.remove("active");
			i.classList.remove("faded");
		}
	} else {
		for (let i of cells) {
			i.classList.remove("active");
			i.classList.add("faded");
		}
	
		// Position cell content to be visible
		let cellContent = cell.querySelector(".cell-content");
		if ((parseInt(cell.dataset.position)+2)%5 == 2) {
			cellContent.style.top = "-100%";
		} else if ((parseInt(cell.dataset.position)+2)%5 == 3) {
			cellContent.style.top = "-200%";
		} else if ((parseInt(cell.dataset.position)+2)%5 == 4) {
			cellContent.style.top = "-300%";
		}
		let remainder = (totalCells+2)%5;
		if (remainder == 0) {
			remainder = 10;
		} else {
			remainder = remainder + 5;
		}
		if (totalCells - parseInt(cell.dataset.position) <= remainder) {
			cellContent.style.left = "-200%";
		}
	
		cell.classList.add("active");
		cell.classList.remove("faded");
	}
}