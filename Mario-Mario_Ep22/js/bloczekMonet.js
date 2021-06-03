class BloczekMonet {
	constructor(img, x,y,w,h) {
		this.obraz = new Obraz(img, 0, 128, 16, 16);
		this.animacja = {
			pelny: new Obraz(img, 0, 128, 16, 16),
			pusty: new Obraz(img, 16, 128, 16, 16)
		};
		this.stan = {
			drganie: {
				licznik: 0,
				ruch: (dane) => {
					this.obecnyStan.licznik++;
					if(this.obecnyStan.licznik<5) {
						this.y -= 2;
						if(this.monety > 0) this.moneta.y -= 8;
					} else if(this.obecnyStan.licznik<10){
						this.y += 2;
						if(this.monety > 0) this.moneta.y -= 5;
					} else if(this.obecnyStan.licznik<17) {
						if(this.monety > 0) this.moneta.y -= 3;
					} else{
						this.obecnyStan.licznik = 0;
						this.obecnyStan = this.stan.spoczynek;
					}
					return;
				},
				animacja: (dane) => {
					if(this.monety>0) {
						this.obraz = this.animacja.pelny;
					} else {
						this.obraz = this.animacja.pusty;
					}
				}
			},
			spoczynek: {
				ruch: (dane) => {
					this.y = this.sy;
					this.moneta.y = this.sy;
					return;
				},
				animacja: (dane) => {
					if(this.monety>0) {
						this.obraz = this.animacja.pelny;
					} else {
						this.obraz = this.animacja.pusty;
					}
				}
			},
		};
		this.obecnyStan = this.stan.spoczynek;
		this.x = x;
		this.y = y;
		this.sy = y;
		this.w = w;
		this.h = h;
		this.monety = 10;
		this.moneta = new Moneta(img, x, y, w, h);
		this.typ = "bloczekMonet";
	}
};
