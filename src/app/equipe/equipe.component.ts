import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from '../models/equipe';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

	equipes: Equipe[];
	equipe: Equipe;
	count = 0;

	constructor(protected localStorage: LocalStorage) {
	}

	ngOnInit() {
		this.listarEquipes();
		this.equipe = new Equipe();
	}

	salvarEquipe() {
		if (this.equipe.id == null || this.equipe.id == 0) {
			var lastElement = this.equipes[this.equipes.length -1];
			this.equipe.id = lastElement ? (lastElement.id + 1) : 1;
			this.addEquipe(this.equipe);
		} else {
			this.editEquipe(this.equipe);
		}

		this.equipe = new Equipe();
	}

	editarEquipe(equipe: Equipe) {
		Object.assign(this.equipe, equipe);
	}

	excluirEquipe(equipe: Equipe) {
		if (equipe && equipe.id > 0) {
			this.deleteEquipe(equipe);
		}
	}

	listarEquipes() {
		this.getEquipes().subscribe((equipes) => {
			if (equipes) {
				this.equipes = equipes;
			} else {
				this.equipes = new Array<Equipe>();
				this.setItem(this.equipes);
			}
		});
	}

	getEquipes() {
		return this.localStorage.getItem('equipe');
	}

	addEquipe(equipe: Equipe) {
		if (equipe) {
			this.getEquipes().subscribe(equipes => {
				equipes.push(equipe);
				this.setItem(equipes);
			});
		}
	}

	editEquipe(equipe: Equipe) {
		if (equipe) {
			this.getEquipes().subscribe(equipes => {
				let index = equipes.findIndex(a => a.id == equipe.id);
				if (index >= 0) {
					equipes[index] = equipe;
					this.setItem(equipes);
				} else {
					this.addEquipe(equipe);
				}
			});
		}
	}

	deleteEquipe(equipe: Equipe) {
		if (equipe.id > 0) {
			this.getEquipes().subscribe(equipes => {
				let index = equipes.findIndex(a => a.id == equipe.id);
				equipes.splice(index, 1);
				this.setItem(equipes);
			});
		}
	}

	setItem(equipes) {
		return this.localStorage.setItem('equipe', equipes).subscribe(() => {
			this.listarEquipes();
		});
	}
}