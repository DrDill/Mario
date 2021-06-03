class Pocisk {
	constructor(img, x, y, w, h, p) {
		this.obraz = new Obraz(img, 0, 176, 8, 8);
		this.animacja = {
			obrot: {
				klatka: [new Obraz(img, 0, 176, 8, 8),
								new Obraz(img, 8, 176, 8, 8),
								new Obraz(img, 0, 184, 8, 8),
								new Obraz(img, 8, 184, 8, 8)],
				obecnaKlatka: 0
			},
			wybuch: {
				klatka: [new Obraz(img, 16, 176, 16, 16),
								new Obraz(img, 32, 176, 16, 16),
								new Obraz(img, 48, 184, 16, 16),
								new Obraz(img, 64, 184, 16, 16)],
				obecnaKlatka: 0
			}
		};
		this.stan = {
			obrot: {
				ruch: (dane) => {
					this.x += this.pedX;
					if(this.y > dane.obiekty.mapa.h) {
						let nrPocisku = dane.obiekty.tabelaPociskow.indexOf(this);
						dane.obiekty.tabelaPociskow.splice(nrPocisku, 1);
					}
				},
				animacja: (dane) => {
					if(dane.nrKlatki % 5 == 0) {
						this.obraz = this.animacja.obrot.klatka[this.animacja.obrot.obecnaKlatka];
						this.animacja.obrot.obecnaKlatka++;
					}

					if(this.animacja.obrot.obecnaKlatka > 3) {
						this.animacja.obrot.obecnaKlatka = 0;
					}
				}
			},
			wybuch: {
				ruch: (dane) => { },
				animacja: (dane) => {
					this.w = 2 * w;
					this.h = 2* h;
					if(dane.nrKlatki % 5 == 0) {
						this.obraz = this.animacja.wybuch.klatka[this.animacja.wybuch.obecnaKlatka];
						this.animacja.wybuch.obecnaKlatka++;
					}

					if(this.animacja.wybuch.obecnaKlatka > 3) {
						let nrPocisku = dane.obiekty.tabelaPociskow.indexOf(this);
						dane.obiekty.tabelaPociskow.splice(nrPocisku, 1);
					}
				}
			}
		};
		this.obecnyStan = this.stan.obrot;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pedX = p;
		this.pedY = 0;
		this.typ = "pocisk";
	}
}
