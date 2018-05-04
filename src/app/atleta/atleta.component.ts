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

@Component({
	selector: 'app-atleta',
	templateUrl: './atleta.component.html',
	styleUrls: ['./atleta.component.css']
})
export class AtletaComponent implements OnInit {

	_service: AtletaService;
	_categoriaService: CategoriaService;
	_equipeService: EquipeService;
	_provaService: ProvaService;
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

	constructor(private atletaService: AtletaService, 
				private categoriaService: CategoriaService,
				private equipeService: EquipeService,
				private provaService: ProvaService) {
		this._service = atletaService;
		this._categoriaService = categoriaService;
		this._equipeService = equipeService;
		this._provaService = provaService;
	 }	 

	 ngOnInit(): void { 
		this.atletas = this._service.getAtletas();
		this.atleta = new Atleta();		 
	 } 

	salvarAtleta() {
		this.atleta.prova.id = this.provaSelecionada;
		this.atleta.categoria.id = this.categoriaSelecionada;
		this.atleta.equipe.id = this.equipeSelecionada;

		if (this.atleta.id == null || this.atleta.id == 0) {
			this.atleta.id = ++this.count;
			this._service.addAtleta(this.atleta);
		} else {
			this._service.editAtleta(this.atleta);
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
			this._service.deleteAtleta(atleta);
		}
	}

	getEquipes() {
		return this._equipeService.getEquipes();
	}

	getCategorias() {
		return this._categoriaService.getCategorias();
	}

	getProvas() {
		return this._provaService.getProvas();
	}
}