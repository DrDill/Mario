class Wejscie {
	constructor() {
		this.nacisniety = {};
		document.onkeydown = (event) => {
			this.nacisniety[event.keyCode] = true;
		}

		document.onkeyup = (event) => {
			this.nacisniety[event.keyCode] = false;
		}
	}

	aktualizacja(dane) {
		let mario = dane.obiekty.mario;

		if(this.nacisnieto(39) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie && !mario.zablokowany) {
			mario.kierunek = "prawo";
			mario.pedX = 8;

			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				mario.obecnyStan = mario.stan.skakanie;
			}
		} else if(this.nacisnieto(37) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie && !mario.zablokowany) {
			mario.kierunek = "lewo";
			mario.pedX = -8;

			if(mario.pedY == 0) {
				mario.obecnyStan = mario.stan.poruszanie;
			} else {
				mario.obecnyStan = mario.stan.skakanie;
			}
		} else if(!mario.zablokowany) {
			mario.pedX = 0;
		}

		if(this.nacisnieto(32) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie && !mario.zablokowany) {
			mario.obecnyStan = mario.stan.skakanie;
		}

    if(this.nacisnieto(17) && !mario.momentSmierci && mario.obecnyStan != mario.stan.miganie && !mario.zablokowany) {
      if(mario.mozeStrzelac && mario.naladowany) {
        mario.naladowany = false;
        setTimeout(() => {
          mario.naladowany = true;
        }, 300);
        let p = 10;
        if(mario.kierunek === "prawo") {
          p = 10;
        } else {
          p = -10;
        }
        dane.obiekty.tabelaPociskow.push(
          new Pocisk(dane.grafika, mario.x + mario.w/2, mario.y + mario.h/2, 24, 24, p)
        );
      }
    }
	}

	nacisnieto(kod) {
		return this.nacisniety[kod];
	}
}
