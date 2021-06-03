class Flaga {
	constructor(img, x, y, w, h) {
		this.obraz = new Obraz(img, 160, 192, 16, 16);
		this.stan = {
			aktywna: {
				ruch: (dane) => {}
			},
			zdjeta: {
				ruch: (dane) => {
					if(this.y < y + 302) {
						this.y -= this.pedY;
					}
				}
			}
		};
		this.obecnyStan = this.stan.aktywna;
		this.x = x;
		this.y = y;
		this.pedY = -3;
		this.w = w;
		this.h = h;
		this.typ = "flaga";
	}
}
