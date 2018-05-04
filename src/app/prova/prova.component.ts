import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prova } from '../models/prova';
import { ProvaService } from '../services/prova.service';

@Component({
	selector: 'app-prova',
	templateUrl: './prova.component.html',
	styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

	_service: ProvaService;
	provas: Prova[];
	prova: Prova;
	count = 0;

	constructor(private provaService: ProvaService) {
		this._service = this.provaService;
	 }

	ngOnInit() {
		this.provas = this._service.getProvas();
		this.prova = new Prova();
	}

	salvarProva() {
		if (this.prova.id == null || this.prova.id == 0) {
			this.prova.id = ++this.count;
			this._service.addProva(this.prova);
		} else {
			this._service.editProva(this.prova);
		}
		
		this.prova = new Prova();
	}

	editarProva(prova: Prova) {
		Object.assign(this.prova, prova);
	}

	excluirProva(prova: Prova) {
		if(prova && prova.id > 0){
			this._service.deleteProva(prova);
		}
	}
}