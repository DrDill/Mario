class Fizyka {
	aktualizacja(dane) {
		if(dane.obiekty.mario.obecnyStan != dane.obiekty.mario.stan.miganie && dane.obiekty.mario.obecnyStan != dane.obiekty.mario.stan.wspinaczka) {
			this.grawitacja(dane.obiekty.mario);
		}

		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.grawitacja(p);
		});

		dane.obiekty.tabelaFragmentowCegiel.forEach((fc) => {
			this.grawitacja(fc);
		});

		dane.obiekty.tabelaGrzybow.forEach((g) => {
			if(g.obecnyStan != g.stan.wyjscie) {
				this.grawitacja(g);
			}
		});

		dane.obiekty.tabelaPociskow.forEach((p) => {
			if(p.obecnyStan != p.stan.wybuch) {
				this.grawitacja(p);
			}
		});

		this.wykrywanieKolizji(dane);
		this.smierc(dane);
	}

	grawitacja(obiekt) {
		if(obiekt.typ === "mario" && !obiekt.momentSmierci) {
			obiekt.obecnyStan = obiekt.stan.skakanie;
		}
		obiekt.pedY+=1;
		obiekt.y+=obiekt.pedY;
	}

	smierc(dane) {
		if(dane.obiekty.mario.y > 624) {
			dane.obiekty.mario.momentSmierci = true;
			dane.kontroler.smierc.strataZycia(dane);
			dane.obiekty.mario.mozeStrzelac = false;
			dane.obiekty.mario.mozeNiszczyc = false;
		}
	}

	wykrywanieKolizji(dane) {
		let wykrywanieKolizji = (obiekt1, obiekt2) => {
			if(obiekt1.x < obiekt2.x + obiekt2.w &&
					obiekt1.x + obiekt1.w > obiekt2.x &&
					obiekt1.y < obiekt2.y + obiekt2.h &&
					obiekt1.y + obiekt1.h > obiekt2.y) {
					this.kolizja(obiekt1, obiekt2, dane);
			}
		};

		let mario = dane.obiekty.mario;
		if(!mario.momentSmierci && mario.obecnyStan != mario.stan.miganie) {
			dane.obiekty.tabelaScian.forEach((sciana) => {
				wykrywanieKolizji(mario, sciana);
			});

			dane.obiekty.tabelaMonet.forEach((moneta) => {
				wykrywanieKolizji(mario, moneta);
			});

			dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				wykrywanieKolizji(mario, bloczekMonet);
			});

			dane.obiekty.tabelaPlatform.forEach((platforma) => {
				wykrywanieKolizji(mario, platforma);
			});

			dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
				wykrywanieKolizji(mario, bloczekCegiel);
			});

			dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
				wykrywanieKolizji(mario, bloczekGrzybow);
			});

			wykrywanieKolizji(mario, dane.obiekty.maszt);
		}

		dane.obiekty.tabelaPotworow.forEach((potwor) => {
			if(!mario.momentSmierci && mario.obecnyStan != mario.stan.miganie && !mario.zablokowany) wykrywanieKolizji(mario, potwor);

			dane.obiekty.tabelaScian.forEach((sciana) => {
				wykrywanieKolizji(potwor, sciana);
			});

			dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				wykrywanieKolizji(potwor, bloczekMonet);
			});

			dane.obiekty.tabelaPlatform.forEach((platforma) => {
				wykrywanieKolizji(potwor, platforma);
			});

			dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
				wykrywanieKolizji(potwor, bloczekCegiel);
			});

			dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
				wykrywanieKolizji(potwor, bloczekGrzybow);
			});
		});

		dane.obiekty.tabelaGrzybow.forEach((grzyb) => {
			if(grzyb.obecnyStan != grzyb.stan.wyjscie) {
				if(!mario.momentSmierci && mario.obecnyStan != mario.stan.miganie) wykrywanieKolizji(mario, grzyb);

				dane.obiekty.tabelaScian.forEach((sciana) => {
					wykrywanieKolizji(grzyb, sciana);
				});

				dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
					wykrywanieKolizji(grzyb, bloczekMonet);
				});

				dane.obiekty.tabelaPlatform.forEach((platforma) => {
					wykrywanieKolizji(grzyb, platforma);
				});

				dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
					wykrywanieKolizji(grzyb, bloczekCegiel);
				});

				dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
					wykrywanieKolizji(grzyb, bloczekGrzybow);
				});
			}
		});

		dane.obiekty.tabelaPociskow.forEach((pocisk) => {
			dane.obiekty.tabelaScian.forEach((sciana) => {
				wykrywanieKolizji(pocisk, sciana);
			});

			dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				wykrywanieKolizji(pocisk, bloczekMonet);
			});

			dane.obiekty.tabelaPlatform.forEach((platforma) => {
				wykrywanieKolizji(pocisk, platforma);
			});

			dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
				wykrywanieKolizji(pocisk, bloczekCegiel);
			});

			dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
				wykrywanieKolizji(pocisk, bloczekGrzybow);
			});

			dane.obiekty.tabelaPotworow.forEach((potwor) => {
				wykrywanieKolizji(pocisk, potwor);
			});
		});
	}

	kolizja(obiekt1, obiekt2, dane) {
		let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);
		if(obiekt1.typ === "mario") {
			let mario = obiekt1;
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel"  || obiekt2.typ === "bloczekGrzybow") {
				if(stronaKolizji[0]) {
					if(mario.obecnyStan == mario.stan.wspinaczka) {
						mario.obecnyStan = mario.stan.wspinaczka
					} else if(mario.pedX == 0) {
						mario.obecnyStan = mario.stan.stanie;
					} else {
						mario.obecnyStan = mario.stan.poruszanie;
					}
					mario.y = obiekt2.y - mario.h -.1;
					mario.pedY = 0;
					if(obiekt2.typ === "platforma") {
						mario.pedX = obiekt2.pedX;
						mario.kontrolerRuchu(dane);
					}
				}
				if(stronaKolizji[2]) {
					mario.y = obiekt2.y + obiekt2.h - 1;
					if(mario.pedY < 0) mario.pedY = 1;
					if(obiekt2.typ === "bloczekMonet") {
						obiekt2.obecnyStan = obiekt2.stan.drganie;
						obiekt2.obecnyStan.licznik = 0;
						obiekt2.y = obiekt2.sy;
						obiekt2.moneta.y = obiekt2.sy;
						if(obiekt2.monety > 0) mario.monety++;
						obiekt2.monety--;
					}
					if(obiekt2.typ === "bloczekCegiel") {
						if(mario.mozeNiszczyc) {
							dane.obiekty.tabelaFragmentowCegiel.push(
								new FragmentCegiel(dane.grafika, obiekt2.x, obiekt2.y, obiekt2.w/2, obiekt2.h/2, 0),
								new FragmentCegiel(dane.grafika, obiekt2.x + obiekt2.w/2, obiekt2.y, obiekt2.w/2, obiekt2.h/2, 1),
								new FragmentCegiel(dane.grafika, obiekt2.x, obiekt2.y + obiekt2.h/2, obiekt2.w/2, obiekt2.h/2, 2),
								new FragmentCegiel(dane.grafika, obiekt2.x + obiekt2.w/2, obiekt2.y + obiekt2.h/2, obiekt2.w/2, obiekt2.h/2, 3)
							);
							let nrBloczka = dane.obiekty.tabelaBloczkowCegiel.indexOf(obiekt2);
							dane.obiekty.tabelaBloczkowCegiel.splice(nrBloczka, 1);
						} else {
							obiekt2.obecnyStan = obiekt2.stan.drganie;
						}
					}
					if(obiekt2.typ === "bloczekGrzybow") {
						obiekt2.obecnyStan = obiekt2.stan.drganie;
						if(obiekt2.pelny) {
							dane.obiekty.tabelaGrzybow.push(
								new Grzyb(dane.grafika, obiekt2.x, obiekt2.y, obiekt2.w, obiekt2.h, obiekt2.rodzaj)
							);
						}
						obiekt2.pelny = false;
					}
				}
				if(stronaKolizji[3]) {
					mario.x = obiekt2.x - mario.w;
					mario.pedX = 0;
				}
				if(stronaKolizji[1]) {
					mario.x = obiekt2.x + obiekt2.w;
					mario.pedX = 0;
				}
			} else if(obiekt2.typ === "potwor") {
				if(stronaKolizji[0]) {
					let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
					dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
					mario.obecnyStan = mario.stan.skakanie;
					mario.pedY = -20.5;
				}
				if(stronaKolizji[1] || stronaKolizji[2] || stronaKolizji[3]) {
					if(mario.mozeStrzelac) {
						mario.obecnyStan = mario.stan.miganie;
						setTimeout(() => {
							mario.mozeStrzelac = false;
							mario.obecnyStan = mario.stan.stanie;
						}, 500);
					} else if(mario.mozeNiszczyc) {
						mario.obecnyStan = mario.stan.miganie;
						setTimeout(() => {
							mario.mozeNiszczyc = false;
							mario.obecnyStan = mario.stan.stanie;
						}, 500);
					} else {
						mario.momentSmierci = true;
						mario.obecnyStan = mario.stan.smierc;
						mario.pedY = -20.5;
						setTimeout(() => {
							dane.kontroler.smierc.strataZycia(dane);
						}, 750);
					}
				}
			} else if(obiekt2.typ === "moneta") {
				let nrMonety = dane.obiekty.tabelaMonet.indexOf(obiekt2);
				dane.obiekty.tabelaMonet.splice(nrMonety, 1);
				mario.monety++;
			} else if(obiekt2.typ === "grzyb") {
				let grzyb = obiekt2;
				if(grzyb.rodzaj === "zycie") {
					let nrGrzyba = dane.obiekty.tabelaGrzybow.indexOf(grzyb);
					dane.obiekty.tabelaGrzybow.splice(nrGrzyba, 1);
					mario.zycia++;
				} else if(grzyb.rodzaj === "powiekszenie") {
					let nrGrzyba = dane.obiekty.tabelaGrzybow.indexOf(grzyb);
					dane.obiekty.tabelaGrzybow.splice(nrGrzyba, 1);
					mario.mozeNiszczyc = true;
				} else if(grzyb.rodzaj === "strzelanie") {
					if(mario.mozeNiszczyc) {
						let nrGrzyba = dane.obiekty.tabelaGrzybow.indexOf(grzyb);
						dane.obiekty.tabelaGrzybow.splice(nrGrzyba, 1);
						mario.mozeStrzelac = true;
					}
				}
			} else if(obiekt2.typ === "maszt") {
				obiekt2.flaga.obecnyStan = obiekt2.flaga.stan.zdjeta;
				if(!mario.zablokowany) {
					if(mario.x <= obiekt2.x) {
						mario.x = obiekt2.x - mario.w/2;
						mario.kierunek = "prawo";
					} else {
						mario.x = obiekt2.x + mario.w/2;
						mario.kierunek = "lewo";
					}
					mario.obecnyStan = mario.stan.wspinaczka;
					mario.pedY = 3;
					mario.zablokowany = true;
					setTimeout(() => {
						mario.obecnyStan = mario.stan.poruszanie;
						mario.kierunek = "prawo";
						mario.pedX = 4;
						setTimeout(() => {
							dane.kontroler.zmianaPoziomu(obiekt2.nastepnyPoziom);
							//dane.kontroler.obiekty = new Obiekty_LVL_2(dane);
						}, 1000);
					}, 2000);
				}
			}
		} else if(obiekt1.typ === "potwor") {
			let potwor = obiekt1;
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel"  || obiekt2.typ === "bloczekGrzybow") {
				if(stronaKolizji[0]) {
					potwor.obecnyStan = potwor.stan.poruszanie;
					potwor.y = obiekt2.y - potwor.h;
					potwor.pedY = 0;
					if(obiekt2.typ === "platforma") {
						potwor.x += obiekt2.pedX;
					}
				}
				if(stronaKolizji[3]) {
					potwor.x = obiekt2.x - potwor.w;
					potwor.pedX = -2;
				}
				if(stronaKolizji[1]) {
					potwor.x = obiekt2.x + obiekt2.w;
					potwor.pedX = 2;
				}
			}
		} else if(obiekt1.typ === "grzyb") {
			let grzyb = obiekt1;
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel"  || obiekt2.typ === "bloczekGrzybow") {
				if(stronaKolizji[0]) {
					grzyb.obecnyStan = grzyb.stan.poruszanie;
					grzyb.y = obiekt2.y - grzyb.h;
					grzyb.pedY = 0;
					if(obiekt2.typ === "platforma") {
						grzyb.x += obiekt2.pedX;
					}
				}
				if(stronaKolizji[3]) {
					grzyb.x = obiekt2.x - grzyb.w;
					grzyb.pedX = -2;
				}
				if(stronaKolizji[1]) {
					grzyb.x = obiekt2.x + obiekt2.w;
					grzyb.pedX = 2;
				}
			}
		} else if(obiekt1.typ === "pocisk") {
			let pocisk = obiekt1;
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "platforma" || obiekt2.typ === "bloczekCegiel"  || obiekt2.typ === "bloczekGrzybow") {
				if(stronaKolizji[0]) {
					pocisk.y = obiekt2.y - pocisk.h;
					pocisk.pedY = -10;
				}
				if(stronaKolizji[1] || stronaKolizji[3]) {
					pocisk.obecnyStan = pocisk.stan.wybuch;
				}
			} else if(obiekt2.typ === "potwor") {
				pocisk.obecnyStan = pocisk.stan.wybuch;
				let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
				dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
			}
		}
	}

	stronaKolizji(obiekt1, obiekt2) {
		let maksymalnaOdlegloscX = (obiekt1.w + obiekt2.w)/2,
			maksymalnaOdlegloscY = (obiekt1.h + obiekt2.h)/2;

		let katLewyGorny = Math.atan2(maksymalnaOdlegloscY, maksymalnaOdlegloscX) * 180 / Math.PI,
			katPrawyGorny = 180 - katLewyGorny;

		let odlegloscX = (obiekt2.x + obiekt2.w/2) - (obiekt1.x + obiekt1.w/2 - obiekt1.pedX),
			odlegloscY = (obiekt2.y + obiekt2.h/2) - (obiekt1.y + obiekt1.h/2 - obiekt1.pedY);

		let katObiektow = Math.atan2(odlegloscY, odlegloscX) * 180 / Math.PI;

		let stronaKolizji = [false, false, false, false];
		if(katObiektow > katLewyGorny && katObiektow < katPrawyGorny) {
			stronaKolizji[0] = true;
		}
		if(katObiektow > katPrawyGorny || katObiektow < -katPrawyGorny) {
			stronaKolizji[1] = true;
		}
		if(katObiektow > -katPrawyGorny && katObiektow < -katLewyGorny) {
			stronaKolizji[2] = true;
		}
		if(katObiektow > -katLewyGorny && katObiektow < katLewyGorny) {
			stronaKolizji[3] = true;
		}

		return stronaKolizji;
	}
}
