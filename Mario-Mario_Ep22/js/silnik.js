class Silnik {
	constructor() {
		let canvas = {
			skyCtx: document.getElementById("sky-canvas").getContext("2d"),
			bgCtx: document.getElementById("bg-canvas").getContext("2d"),
			fgCtx: document.getElementById("fg-canvas").getContext("2d")
		}

		let grafika = new Image();
		grafika.src = "img/elements.png";
		grafika.addEventListener("load", function() {
			grafika = this;
		});

		let listaMap = ["map_1"];
		let listaNieb = ["sky_1", "sky_2"];

		let mapa = [];
		listaMap.forEach(function(nazwa) {
			mapa[nazwa] = new Image();
			mapa[nazwa].src = "img/"+nazwa+".png";
			mapa[nazwa].addEventListener("load", function() {
				mapa[nazwa] = this;
			});
		});

		let niebo = [];
		listaNieb.forEach(function(nazwa) {
			niebo[nazwa] = new Image();
			niebo[nazwa].src = "img/"+nazwa+".png";
			niebo[nazwa].addEventListener("load", function() {
				niebo[nazwa] = this;
			});
		});


		this.dane = {
			nrKlatki: 0,
			canvas: canvas,
			grafika: grafika,
			mapa: mapa,
			niebo: niebo,
			audio: {
				melodia: new Audio("audio/theme_melody.mp3"),
				skok: new Audio("audio/jump_melody.mp3"),
				moneta: new Audio("audio/coin_melody.mp3")
			},
			kontroler: {}
		}

		this.dane.kontroler = {
			wejscie: new Wejscie(),
			obiekty: new Obiekty_LVL_1(this.dane),
			animacje: new Animacje(),
			fizyka: new Fizyka(),
			render: new Render(),
			poruszanie: new Poruszanie(),
			smierc: new Smierc(),
			zmianaPoziomu: (p) => {
				this.obecnyMario = {
					zycia: this.dane.obiekty.mario.zycia,
					monety: this.dane.obiekty.mario.monety
				};
				switch(p) {
					case "LVL_1":
						this.dane.kontroler.obiekty = new Obiekty_LVL_1(this.dane);
						break;
					case "LVL_2":
						this.dane.kontroler.obiekty = new Obiekty_LVL_2(this.dane);
						break;
				}
				this.dane.obiekty.mario.zycia = this.obecnyMario.zycia;
				this.dane.obiekty.mario.monety = this.obecnyMario.monety;
			}
		}

		this.dane.canvas.skyCtx.imageSmoothingEnabled = false;
		this.dane.canvas.bgCtx.imageSmoothingEnabled = false;
		this.dane.canvas.fgCtx.imageSmoothingEnabled = false;

		this.start();
	}

	start() {
		let petla = () => {
			this.dane.kontroler.wejscie.aktualizacja(this.dane);
			this.dane.kontroler.poruszanie.aktualizacja(this.dane);
			this.dane.kontroler.animacje.aktualizacja(this.dane);
			this.dane.kontroler.fizyka.aktualizacja(this.dane);
			this.dane.kontroler.render.aktualizacja(this.dane);

			this.dane.nrKlatki++;
			requestAnimationFrame(petla);
		}
		petla();
	}
}
window.onload = new Silnik();
