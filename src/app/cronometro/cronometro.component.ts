import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-cronometro',
	templateUrl: './cronometro.component.html',
	styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {

	tempoInicial: Date;
	horas: string;
	minutos: string;
	segundos: string;
	isRunning: boolean;

	constructor() { }

	ngOnInit() {
		this.horas = '00';
		this.minutos = '00';
		this.segundos = '00';
		this.isRunning = false;
	}

	comecar() {
		if (!this.isRunning) {
			this.tempoInicial = new Date();
			this.isRunning = true;

			setInterval(() => {
				let tempoAtual = new Date();
				let diferencaMilisegundos = tempoAtual.getTime() - this.tempoInicial.getTime();
				let diferenca = new Date(diferencaMilisegundos - 79200000);

				this.horas = this.formataValor(diferenca.getHours());
				this.minutos = this.formataValor(diferenca.getMinutes());
				this.segundos = this.formataValor(diferenca.getSeconds());
			}, 1000);
		} else {
			if(confirm('O cronômetro está rodando, tem certeza que quer recomeçar?')) {
				this.isRunning = false;
				this.comecar();
			}
		}
	}

	formataValor(valor) {
		if (valor >= 10) {
			return valor;
		} else {
			return '0' + valor;
		}
	}
}
