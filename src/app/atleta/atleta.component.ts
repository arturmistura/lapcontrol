import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atleta } from '../models/atleta';
import { Equipe } from '../models/equipe';
import { Categoria } from '../models/categoria';
import { Prova } from '../models/prova';

@Component({
	selector: 'app-atleta',
	templateUrl: './atleta.component.html',
	styleUrls: ['./atleta.component.css']
})
export class AtletaComponent implements OnInit {

	atletas: Atleta[];
	atleta: Atleta;
	count = 0;
	sexos = [
		{ id: 1, descricao: 'Masculino' },
		{ id: 2, descricao: 'Feminino' }
	];
	equipeSelecionada = 0;	
	categoriaSelecionada = 0;	
	provaSelecionada = 0;	

	constructor() { }

	ngOnInit() {
		this.atletas = new Array<Atleta>();
		this.atleta = new Atleta();
	}

	salvarAtleta() {
		if (this.atleta.id == null || this.atleta.id == 0) {
			this.atleta.id = ++this.count;
			this.atletas.push(this.atleta);
		} else {
			var index = this.atletas.findIndex(a => a.id == this.atleta.id);
			this.atletas[index] = this.atleta;
		}

		this.atleta = new Atleta();
	}

	editarAtleta(atleta: Atleta) {
		Object.assign(this.atleta, atleta);
	}

	excluirAtleta(atleta: Atleta) {
		if (atleta.id > 0) {
			let index = this.atletas.findIndex(a => a.id == atleta.id);
			this.atletas.splice(index, 1);
		}
	}

	getEquipes() {
		let equipes = new Array<Equipe>();

		let equipe = new Equipe();
		equipe.id = 1;
		equipe.nome = 'Equipe 1';

		equipes.push(equipe);

		equipe = new Equipe();
		equipe.id = 2;
		equipe.nome = 'Equipe 2';

		equipes.push(equipe);

		return equipes;
	}

	getCategorias() {
		let categorias = new Array<Categoria>();

		let categoria = new Categoria();
		categoria.id = 1;
		categoria.nome = 'Categoria 1';

		categorias.push(categoria);

		categoria = new Equipe();
		categoria.id = 2;
		categoria.nome = 'Categoria 2';

		categorias.push(categoria);

		return categorias;
	}

	getProvas() {
		let provas = new Array<Prova>();

		let prova = new Prova();
		prova.id = 1;
		prova.nome = 'Prova 1';

		provas.push(prova);

		prova = new Prova();
		prova.id = 2;
		prova.nome = 'Prova 2';

		provas.push(prova);

		return provas;
	}
}