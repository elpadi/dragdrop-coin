class Coin {
	
	constructor() {
		this.img = new Image();
		this.heads();
	}

	tails() {
		this.img.src = 'img/tails.png';
		this.isHeads = false;
	}

	heads() {
		this.img.src = 'img/heads.png';
		this.isHeads = true;
	}

	flip() {
		return this.isHeads ? this.tails() : this.heads();
	}

}

class App {
	
	constructor() {
		this.coin = new Coin();
		this.coin.img.draggable = true;
		this.activateZone('zone1');
		Array.from(document.querySelectorAll('.drop-zone'))
			.forEach(this.attachZoneEventListeners.bind(this));
	}

	attachZoneEventListeners(zone) {
		zone.addEventListener('dragenter', e => e.preventDefault());
		zone.addEventListener('dragover', e => e.preventDefault());
		zone.addEventListener('drop', this.onCoinDrop.bind(this));
	}

	activateZone(id) {
		let zone = document.querySelector('#' + id);
		this.activeZone = id;
		if (zone) zone.appendChild(this.coin.img);
	}

	onZoneChange(zone) {
		this.activateZone(zone.id);
		this.coin.flip();
	}

	onCoinDrop(e) {
		let zone = e.target;
		// ignore dropping the image in the current zone.
		if (zone.id !== this.activeZone) {
			this.onZoneChange(zone);
		}
	}

}
		
let app = new App();
