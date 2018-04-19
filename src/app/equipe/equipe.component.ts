import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from '../models/equipe';

@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

	equipes: Equipe[];
	equipe: Equipe;
	count = 0;

	constructor() { }

	ngOnInit() {
		this.equipes = new Array<Equipe>();
		this.equipe = new Equipe();
	}

	salvarEquipe() {
		if (this.equipe.id == null || this.equipe.id == 0) {
			this.equipe.id = ++this.count;
			this.equipes.push(this.equipe);
		} else {
			var index = this.equipes.findIndex(a => a.id == this.equipe.id);
			this.equipes[index] = this.equipe;
		}
		
		this.equipe = new Equipe();
	}

	editarEquipe(equipe: Equipe) {
		Object.assign(this.equipe, equipe);
	}

	excluirEquipe(equipe: Equipe) {
		if(equipe.id > 0){
			let index = this.equipes.findIndex(a => a.id == equipe.id);
			this.equipes.splice(index, 1);
		}
	}
}