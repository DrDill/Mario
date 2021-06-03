class Maszt {
	constructor(img, x, y, w, h, n) {
		this.obraz = new Obraz(img, 176, 64, 16, 144);
		this.flaga = new Flaga(img, x-24,y+28, 48, 48);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.nastepnyPoziom = n;
		this.typ = "maszt";
	}
}
