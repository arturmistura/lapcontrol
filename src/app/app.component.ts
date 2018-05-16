import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Lap Control';
	cronometroAtivo = true;
	categoriaAtivo = false;
	atletaAtivo = false;
	equipeAtivo = false;
	provaAtivo = false;
	resultadoAtivo = false;

	constructor() { }

	ngOnInit() {

	}

	ativarMenu(menuItem) {
		switch (menuItem) {
			case 'cronometro':
				this.limparSelecao();
				this.cronometroAtivo = true;
				break;
			case 'atleta':
				this.limparSelecao();
				this.atletaAtivo = true;
				break;
			case 'categoria':
				this.limparSelecao();
				this.categoriaAtivo = true;
				break;
			case 'prova':
				this.limparSelecao();
				this.provaAtivo = true;
				break;
			case 'equipe':
				this.limparSelecao();
				this.equipeAtivo = true;
				break;
			case 'resultado':
				this.limparSelecao();
				this.resultadoAtivo = true;
				break;
			default:
				this.limparSelecao();
				this.cronometroAtivo = true;
				break;
		}
	}

	limparSelecao() {
		this.cronometroAtivo = false;
		this.categoriaAtivo = false;
		this.atletaAtivo = false;
		this.equipeAtivo = false;
		this.provaAtivo = false;
		this.resultadoAtivo = false;
	}
}
