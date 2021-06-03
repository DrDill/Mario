class Potwor {
	constructor(img, x, y, w, h) {
		this.obraz = new Obraz(img, 0, 96, 16, 16);
		this.animacja = {
			poruszanie: {
				klatka: [new Obraz(img, 0, 96, 16, 16),
							new Obraz(img, 16, 96, 16, 16),
							new Obraz(img, 32, 96, 16, 16),
							new Obraz(img, 48, 96, 16, 16)],
				obecnaKlatka: 0
			},
			skok: new Obraz(img, 0, 96, 16, 16)
		};
		this.stan = {
			poruszanie: {
				ruch: (dane) => {
					if(this.kierunek === "prawo") {
						this.x += this.pedX;
					} else {
						this.x -= this.pedX;
					}
				},
				animacja: (dane) => {
					if(dane.nrKlatki % 5 == 0) {
						this.obraz = this.animacja.poruszanie.klatka[this.animacja.poruszanie.obecnaKlatka];
						this.animacja.poruszanie.obecnaKlatka++;
					}

					if(this.animacja.poruszanie.obecnaKlatka > 3) {
						this.animacja.poruszanie.obecnaKlatka = 0;
					}
				}
			},
			skakanie: {
				ruch: (dane) => {
					return;
				},
				animacja: (dane) => {
					this.obraz = this.animacja.skok;
				}
			}
		};
		this.obecnyStan = this.stan.poruszanie;
		this.kierunek = "prawo";
		this.pedY = 0;
		this.pedX = 1;
		this.typ = "potwor";
		this.x =x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}
