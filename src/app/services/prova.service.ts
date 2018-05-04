import { Injectable } from '@angular/core';
import { Prova } from '../models/prova';

@Injectable()
export class ProvaService {

	provas: Prova[];

	constructor() {
		this.provas = new Array<Prova>();
	 }

	getProvas(){
		return this.provas;
	}

	addProva(prova: Prova){
		if(prova){
			this.provas.push(prova);
		}	
	}

	editProva(prova: Prova) {
		if(prova){
			var index = this.provas.findIndex(a => a.id == prova.id);
			this.provas[index] = prova;
		}
	}

	deleteProva(prova: Prova){
		if (prova.id > 0) {
			let index = this.provas.findIndex(a => a.id == prova.id);
			this.provas.splice(index, 1);
		}
	}
}