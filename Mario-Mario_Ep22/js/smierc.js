class Smierc {
	strataZycia(dane) {
		let mario = dane.obiekty.mario;

		if(mario.zycia>0) {
			mario.zycia--;
		}
		if(mario.zycia<1) {
			setTimeout(function(){
				location.reload();
			}, 1000);
		} else {
			for(let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
				dane.obiekty.tabelaScian[i].x -= dane.obiekty.mapa.x;
			}

			for(let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
				dane.obiekty.tabelaPotworow[i].x -= dane.obiekty.mapa.x;
			}

			for(let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
				dane.obiekty.tabelaMonet[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
				dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= dane.obiekty.mapa.x;
				dane.obiekty.tabelaBloczkowMonet[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaPlatform.length; i++) {
				dane.obiekty.tabelaPlatform[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaBloczkowCegiel.length; i++) {
				dane.obiekty.tabelaBloczkowCegiel[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaFragmentowCegiel.length; i++) {
				dane.obiekty.tabelaFragmentowCegiel[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaBloczkowGrzybow.length; i++) {
				dane.obiekty.tabelaBloczkowGrzybow[i].x -= dane.obiekty.mapa.x;
			}
			for(let i = 0; i<dane.obiekty.tabelaGrzybow.length; i++) {
				dane.obiekty.tabelaGrzybow[i].x -= dane.obiekty.mapa.x;
			}
      for(let i = 0; i<dane.obiekty.tabelaPociskow.length; i++) {
				dane.obiekty.tabelaPociskow[i].x -= dane.obiekty.mapa.x;
			}
      dane.obiekty.maszt.x -= dane.obiekty.mapa.x;
      dane.obiekty.maszt.flaga.x -= dane.obiekty.mapa.x;

			dane.obiekty.mapa.x = mario.x = mario.y = 0;
			mario.pedY = 1;
			mario.obecnyStan = mario.stan.stanie;
			mario.pedX = 8;
			mario.momentSmierci = false;
		}
	}
}
