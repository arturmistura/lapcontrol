import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from '../models/equipe';
import { EquipeService } from '../services/equipe.service';

@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

	_service: EquipeService;
	equipes: Equipe[];
	equipe: Equipe;
	count = 0;

	constructor(private equipeService: EquipeService) {
		this._service = equipeService;
	 }

	ngOnInit() {
		this.equipes = this._service.getEquipes();
		this.equipe = new Equipe();
	}

	salvarEquipe() {
		if (this.equipe.id == null || this.equipe.id == 0) {
			this.equipe.id = ++this.count;
			this._service.addEquipe(this.equipe);
		} else {
			this._service.editEquipe(this.equipe);
		}
		
		this.equipe = new Equipe();
	}

	editarEquipe(equipe: Equipe) {
		Object.assign(this.equipe, equipe);
	}

	excluirEquipe(equipe: Equipe) {
		if(equipe && equipe.id > 0){
			this._service.deleteEquipe(equipe);
		}
	}
}