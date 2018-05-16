import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prova } from '../models/prova';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
	selector: 'app-prova',
	templateUrl: './prova.component.html',
	styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

	provas: Prova[];
	prova: Prova;
	count = 0;

	constructor(protected localStorage: LocalStorage) {
	}

	ngOnInit() {
		this.listarProvas();
		this.prova = new Prova();
	}

	salvarProva() {
		if (this.prova.id == null || this.prova.id == 0) {
			var lastElement = this.provas[this.provas.length -1];
			this.prova.id = lastElement ? (lastElement.id + 1) : 1;
			this.addProva(this.prova);
		} else {
			this.editProva(this.prova);
		}

		this.prova = new Prova();
	}

	editarProva(prova: Prova) {
		Object.assign(this.prova, prova);
	}

	excluirProva(prova: Prova) {
		if (prova && prova.id > 0) {
			this.deleteProva(prova);
		}
	}

	listarProvas() {
		this.getProvas().subscribe((provas) => {
			if (provas) {
				this.provas = provas;
			} else {
				this.provas = new Array<Prova>();
				this.setItem(this.provas);
			}
		});
	}

	getProvas() {
		return this.localStorage.getItem('prova');
	}

	addProva(prova: Prova) {
		if (prova) {
			this.getProvas().subscribe(provas => {
				provas.push(prova);
				this.setItem(provas);
			});
		}
	}

	editProva(prova: Prova) {
		if (prova) {
			this.getProvas().subscribe(provas => {
				let index = provas.findIndex(a => a.id == prova.id);
				if (index >= 0) {
					provas[index] = prova;
					this.setItem(provas);
				} else {
					this.addProva(prova);
				}
			});
		}
	}

	deleteProva(prova: Prova) {
		if (prova.id > 0) {
			this.getProvas().subscribe(provas => {
				let index = provas.findIndex(a => a.id == prova.id);
				provas.splice(index, 1);
				this.setItem(provas);
			});
		}
	}

	setItem(provas) {
		return this.localStorage.setItem('prova', provas).subscribe(() => {
			this.listarProvas();
		});
	}
}