class BloczekCegiel {
	constructor(img, x,y,w,h) {
		this.obraz = new Obraz(img, 32, 128, 16, 16);
		this.stan = {
			drganie: {
				licznik: 0,
				ruch: (dane) => {
					this.obecnyStan.licznik++;
					if(this.obecnyStan.licznik<5) {
						this.y -= 2;
					} else if(this.obecnyStan.licznik<10){
						this.y += 2;
					} else{
						this.obecnyStan.licznik = 0;
						this.obecnyStan = this.stan.spoczynek;
					}
					return;
				}
			},
			spoczynek: {
				ruch: (dane) => {
					this.y = this.sy;
					return;
				}
			},
		};
		this.obecnyStan = this.stan.spoczynek;
		this.x = x;
		this.y = y;
		this.sy = y;
		this.w = w;
		this.h = h;
		this.typ = "bloczekCegiel";
	}
};
