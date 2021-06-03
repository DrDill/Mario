class Poruszanie {
	aktualizacja(dane) {
		this.mario(dane);
		this.potwor(dane);
		this.bloczekMonet(dane);
		this.platforma(dane);
		this.bloczekCegiel(dane);
		this.fragmentCegiel(dane);
		this.bloczekGrzybow(dane);
		this.grzyb(dane);
		this.pocisk(dane);
		this.flaga(dane);
	}

	mario(dane) {
		dane.obiekty.mario.obecnyStan.ruch(dane);
	}

	potwor(dane) {
		dane.obiekty.tabelaPotworow.forEach(function(p) {
			p.obecnyStan.ruch(dane);
		});
	}

	bloczekMonet(dane) {
		dane.obiekty.tabelaBloczkowMonet.forEach((bm) => {
			bm.obecnyStan.ruch(dane);
		});
	}

	platforma(dane) {
		dane.obiekty.tabelaPlatform.forEach((p) => {
			p.obecnyStan.ruch(dane);
		});
	}

	bloczekCegiel(dane) {
		dane.obiekty.tabelaBloczkowCegiel.forEach((bc) => {
			bc.obecnyStan.ruch(dane);
		});
	}

	fragmentCegiel(dane) {
		dane.obiekty.tabelaFragmentowCegiel.forEach((fc) => {
			fc.obecnyStan.ruch(dane);
		});
	}

	bloczekGrzybow(dane) {
		dane.obiekty.tabelaBloczkowGrzybow.forEach((bg) => {
			bg.obecnyStan.ruch(dane);
		});
	}

	grzyb(dane) {
		dane.obiekty.tabelaGrzybow.forEach((g) => {
			g.obecnyStan.ruch(dane);
		});
	}

	pocisk(dane) {
		dane.obiekty.tabelaPociskow.forEach((p) => {
			p.obecnyStan.ruch(dane);
		});
	}

	flaga(dane) {
		dane.obiekty.maszt.flaga.obecnyStan.ruch(dane);
	}
}
