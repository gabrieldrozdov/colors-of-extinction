let grid = document.querySelector('.grid');
let totalCells = 100;

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
	for (let j=0; j<100; j++) {
		if (j < 20) {
			cellImage += `<div style='background-color:#${colors[0]}'></div>`;
		} else if (j < 40) {
			cellImage += `<div style='background-color:#${colors[1]}'></div>`;
		} else if (j < 60) {
			cellImage += `<div style='background-color:#${colors[2]}'></div>`;
		} else if (j < 80) {
			cellImage += `<div style='background-color:#${colors[3]}'></div>`;
		} else {
			cellImage += `<div style='background-color:#${colors[4]}'></div>`;
		}
	}

	let cellInfo = `
		<div class="cell-gradient" style="background:linear-gradient(90deg, #${colors[0]} 0%, #${colors[1]} 25%, #${colors[2]} 50%, #${colors[3]} 75%, #${colors[4]} 100%)"></div>
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
	cell.innerHTML = cellInfo;

	grid.appendChild(cell);
	let gradient = cell.querySelector(".cell-gradient");
	gradient.addEventListener('click', () => { highlight(cell) })
}

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
	
		let cellContent = cell.querySelector(".cell-content");
		if (parseInt(cell.dataset.position) % 10 == 8 || parseInt(cell.dataset.position) % 10 == 9) {
			cellContent.style.left = "-200%";
		} else {
			cellContent.style.left = "100%";
		}
		if (100 - parseInt(cell.dataset.position) <= 10) {
			cellContent.style.top = "-300%";
		} else if (100 - parseInt(cell.dataset.position) <= 20) {
			cellContent.style.top = "-200%";
		} else if (100 - parseInt(cell.dataset.position) <= 30) {
			cellContent.style.top = "-100%";
		} else {
			cellContent.style.top = "0%";
		}
	
		cell.classList.add("active");
		cell.classList.remove("faded");
	}
}