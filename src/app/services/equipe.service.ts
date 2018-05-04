import { Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';

@Injectable()
export class EquipeService {

	equipes: Equipe[];

	constructor() {
		this.equipes = new Array<Equipe>();
	 }

	getEquipes(){
		return this.equipes;
	}

	addEquipe(equipe: Equipe){
		if(equipe){
			this.equipes.push(equipe);
		}	
	}

	editEquipe(equipe: Equipe) {
		if(equipe){
			var index = this.equipes.findIndex(a => a.id == equipe.id);
			this.equipes[index] = equipe;
		}
	}

	deleteEquipe(equipe: Equipe){
		if (equipe.id > 0) {
			let index = this.equipes.findIndex(a => a.id == equipe.id);
			this.equipes.splice(index, 1);
		}
	}
}