import { Component, OnInit } from '@angular/core';
import { Tempo } from '../models/Tempo';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Equipe } from '../models/equipe';
import { Categoria } from '../models/categoria';
import { Prova } from '../models/prova';

@Component({
	selector: 'app-resultado',
	templateUrl: './resultado.component.html',
	styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

	tempos: Tempo[];
	temposFiltrado: Tempo[];
	categorias: Categoria[];
	equipes: Equipe[];
	provas: Prova[];

	equipeSelecionada = 0;
	categoriaSelecionada = 0;
	provaSelecionada = 0;
	sexoSelecionado = 0;

	sexos = [
		{ id: 1, descricao: 'Masculino' },
		{ id: 2, descricao: 'Feminino' }
	];

	constructor(protected localStorage: LocalStorage) { }

	ngOnInit() {
		this.listarCategorias();
		this.listarEquipes();
		this.listarProvas();

		this.localStorage.getItem('atleta').subscribe(atletas => {
			this.localStorage.getItem('tempos').subscribe(tempos => {
				if (tempos) {	
					tempos.forEach(tempo => {
						tempo.atleta = atletas.find(a => a.id == tempo.atleta.id);
					})
	
					tempos = tempos.sort((a, b)=> {
						if (a.marcacao > b.marcacao) {
							return 1;
						}
					
						if (a.marcacao < b.marcacao) {
							return -1;
						}

						return 0;
					});

					this.tempos = tempos;
					this.temposFiltrado = tempos;
				}
			});
		});
		
	}

	defineSexo(sexo) {
		if (sexo == 1) {
			return 'Masculino';
		} else {
			return 'Feminino';
		}
	}

	defineCategoria(id) {
		return this.categorias.find(a => a.id == id).nome;
	}

	defineEquipe(id) {
		return this.equipes.find(a => a.id == id).nome;
	}

	defineProva(id) {
		return this.provas.find(a => a.id == id).nome;
	}

	formataValor(valor) {
		if (valor >= 10) {
			return valor;
		} else {
			return '0' + valor;
		}
	}

	listarCategorias() {
		this.localStorage.getItem('categoria').subscribe(categorias => {
			if (categorias) {
				this.categorias = categorias;
			}
		})
	}

	listarProvas() {
		this.localStorage.getItem('prova').subscribe(provas => {
			if (provas) {
				this.provas = provas;
			}
		})
	}

	listarEquipes() {
		this.localStorage.getItem('equipe').subscribe(equipes => {
			if (equipes) {
				this.equipes = equipes;
			}
		})
	}

	filtrar() {
		this.temposFiltrado = this.tempos.filter(a => {
			return (this.equipeSelecionada == 0 || a.atleta.equipe.id == this.equipeSelecionada) &&
					(this.categoriaSelecionada == 0 || a.atleta.categoria.id == this.categoriaSelecionada) &&
					(this.provaSelecionada == 0 || a.atleta.prova.id == this.provaSelecionada) &&
					(this.sexoSelecionado == 0 || a.atleta.sexo == this.sexoSelecionado)
		});
	}
}
