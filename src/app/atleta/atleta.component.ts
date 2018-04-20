import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atleta } from '../models/atleta';

@Component({
	selector: 'app-atleta',
	templateUrl: './atleta.component.html',
	styleUrls: ['./atleta.component.css']
})
export class AtletaComponent implements OnInit {

	atletas: Atleta[];
	atleta: Atleta;
	count = 0;

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
		if(atleta.id > 0){
			let index = this.atletas.findIndex(a => a.id == atleta.id);
			this.atletas.splice(index, 1);
		}
	}
}