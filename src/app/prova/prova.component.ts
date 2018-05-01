import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prova } from '../models/prova';

@Component({
	selector: 'app-prova',
	templateUrl: './prova.component.html',
	styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

	provas: Prova[];
	prova: Prova;
	count = 0;

	constructor() { }

	ngOnInit() {
		this.provas = new Array<Prova>();
		this.prova = new Prova();
	}

	salvarProva() {
		if (this.prova.id == null || this.prova.id == 0) {
			this.prova.id = ++this.count;
			this.provas.push(this.prova);
		} else {
			var index = this.provas.findIndex(a => a.id == this.prova.id);
			this.provas[index] = this.prova;
		}
		
		this.prova = new Prova();
	}

	editarProva(prova: Prova) {
		Object.assign(this.prova, prova);
	}

	excluirProva(prova: Prova) {
		if(prova.id > 0){
			let index = this.provas.findIndex(a => a.id == prova.id);
			this.provas.splice(index, 1);
		}
	}
}