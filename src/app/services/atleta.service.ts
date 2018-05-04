import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';

@Injectable()
export class AtletaService {

	atletas: Atleta[];

	constructor() {
		this.atletas = new Array<Atleta>();
	 }

	getAtletas(){
		return this.atletas;
	}

	addAtleta(atleta: Atleta){
		if(atleta){
			this.atletas.push(atleta);
		}	
	}

	editAtleta(atleta: Atleta) {
		if(atleta){
			var index = this.atletas.findIndex(a => a.id == atleta.id);
			this.atletas[index] = atleta;
		}
	}

	deleteAtleta(atleta: Atleta){
		if (atleta.id > 0) {
			let index = this.atletas.findIndex(a => a.id == atleta.id);
			this.atletas.splice(index, 1);
		}
	}

	getAtletaByNumero(numero: number){
		let atleta = this.atletas.find(a => a.numero == numero);

		return atleta;
	}
}