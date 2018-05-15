import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atleta } from '../models/atleta';
import { Equipe } from '../models/equipe';
import { Categoria } from '../models/categoria';
import { Prova } from '../models/prova';
import { AtletaService } from '../services/atleta.service';
import { CategoriaService } from '../services/categoria.service';
import { EquipeService } from '../services/equipe.service';
import { ProvaService } from '../services/prova.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
	selector: 'app-atleta',
	templateUrl: './atleta.component.html',
	styleUrls: ['./atleta.component.css'],
	providers: [AtletaService]
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

	categorias: Categoria[];
	provas: Prova[];
	equipes: Equipe[];

	constructor(protected localStorage: LocalStorage) {
	 }	 

	 ngOnInit(): void { 
		this.listarAtletas();
		this.getCategorias();
		this.getEquipes();
		this.getProvas();
		this.atleta = new Atleta();		 
	 } 

	salvarAtleta() {
		this.atleta.prova.id = this.provaSelecionada;
		this.atleta.categoria.id = this.categoriaSelecionada;
		this.atleta.equipe.id = this.equipeSelecionada;

		if (this.atleta.id == null || this.atleta.id == 0) {
			var lastElement = this.atletas[this.atletas.length -1];
			this.atleta.id = lastElement ? (lastElement.id + 1) : 1;
			this.addAtleta(this.atleta);
		} else {
			this.editAtleta(this.atleta);
		}

		this.equipeSelecionada = 0;	
		this.categoriaSelecionada = 0;	
		this.provaSelecionada = 0;	

		this.atleta = new Atleta();
	}

	editarAtleta(atleta: Atleta) {
		this.categoriaSelecionada = atleta.categoria.id;
		this.equipeSelecionada = atleta.equipe.id;
		this.provaSelecionada = atleta.prova.id;

		Object.assign(this.atleta, atleta);
	}

	excluirAtleta(atleta: Atleta) {
		if(atleta && atleta.id > 0){
			this.deleteAtleta(atleta);
		}
	}

	listarAtletas() {
		this.getAtletas().subscribe(atletas => {
			if (atletas) {
				this.atletas = atletas;
			} else {
				this.atletas = new Array<Atleta>();
				this.setItem(this.atletas);
			}
		})
	}

	getAtletas() {
		return this.localStorage.getItem('atleta');
	}

	getEquipes() {
		this.localStorage.getItem('equipe').subscribe((equipes) => {
			if (equipes) {
				this.equipes = equipes;
			} else {
				this.equipes = new Array<Equipe>();
			}
		});
	}

	getCategorias() {
		this.localStorage.getItem('categoria').subscribe((categorias) => {
			if (categorias) {
				this.categorias = categorias;
			} else {
				this.categorias = new Array<Categoria>();
			}
		});
	}

	getProvas() {
		this.localStorage.getItem('prova').subscribe((provas) => {
			if (provas) {
				this.provas = provas;
			} else {
				this.provas = new Array<Prova>();
			}
		});
	}

	addAtleta(atleta: Atleta) {
		if (atleta) {
			this.getAtletas().subscribe(atletas => {
				atletas.push(atleta);
				this.setItem(atletas);
			});
		}
	}

	editAtleta(atleta: Atleta) {
		if (atleta) {
			this.getAtletas().subscribe(atletas => {
				let index = atletas.findIndex(a => a.id == atleta.id);
				if (index >= 0) {
					atletas[index] = atleta;
					this.setItem(atletas);
				} else {
					this.addAtleta(atleta);
				}
			});
		}
	}

	deleteAtleta(atleta: Atleta) {
		if (atleta.id > 0) {
			this.getAtletas().subscribe(atletas => {
				let index = atletas.findIndex(a => a.id == atleta.id);
				atletas.splice(index, 1);
				this.setItem(atletas);
			});
		}
	}

	setItem(atletas) {
		return this.localStorage.setItem('atleta', atletas).subscribe(() => {
			this.listarAtletas();
		});
	}
}