class Platforma {
	constructor(img, x, y, w, h, z) {
		this.obraz = new Obraz(img, 0, 192, 48, 8);
		this.stan = {
			poruszanie: {
				ruch: (dane) => {
					if(this.x <= this.zakres.min + dane.obiekty.mapa.x) {
						this.x = this.zakres.min + dane.obiekty.mapa.x;
						this.pedX = 2;
					}
					if(this.x + this.w >= this.zakres.max + dane.obiekty.mapa.x) {
						this.x = this.zakres.max - this.w + dane.obiekty.mapa.x;
						this.pedX = -2;
					}

					this.x += this.pedX;
				}
			}
		};
		this.obecnyStan = this.stan.poruszanie;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pedX = 2;
		this.zakres = z;
		this.typ = "platforma";
	}
}
