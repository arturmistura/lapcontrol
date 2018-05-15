import { Component, OnInit } from '@angular/core';
import { Tempo } from '../models/Tempo';
import { AtletaService } from '../services/atleta.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
	selector: 'app-cronometro',
	templateUrl: './cronometro.component.html',
	styleUrls: ['./cronometro.component.css'],
	providers: [AtletaService]
})
export class CronometroComponent implements OnInit {

	tempoInicial: Date;
	horas: string;
	minutos: string;
	segundos: string;
	isRunning: boolean;
	tempo: Tempo;
	tempos: Array<Tempo>;

	constructor(protected localStorage: LocalStorage) {
	}

	ngOnInit() {
		this.horas = '00';
		this.minutos = '00';
		this.segundos = '00';
		this.isRunning = false;
		this.tempo = new Tempo();
		this.tempos = new Array<Tempo>();
		
		this.localStorage.getItem('tempoInicial').subscribe(tempoInicial => {
			if(tempoInicial) {
				this.comecar();
			}
		});
	}

	comecar() {
		if (!this.isRunning) {
			this.localStorage.getItem('tempoInicial').subscribe(tempoInicial => {
				if (tempoInicial) {
					this.tempoInicial = tempoInicial;
				} else {
					this.tempoInicial = new Date();
					this.localStorage.setItem('tempoInicial', this.tempoInicial).subscribe(() => {});
				}

				this.isRunning = true;

				setInterval(() => {
					let tempoAtual = new Date();
					let diferencaMilisegundos = tempoAtual.getTime() - this.tempoInicial.getTime();
					let diferenca = new Date(diferencaMilisegundos - 79200000);

					this.horas = this.formataValor(diferenca.getHours());
					this.minutos = this.formataValor(diferenca.getMinutes());
					this.segundos = this.formataValor(diferenca.getSeconds());

					this.tempo.marcacao = diferenca;
				}, 1000);
			});
		} else {
			if (confirm('O cronômetro está rodando, tem certeza que quer recomeçar?')) {
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

	salvarTempo() {
		if (this.tempo.atleta.numero && this.tempo.atleta.numero > 0) {
			this.getAtletas().subscribe(atletas => {
				let atletaEncontrado = atletas.find(a => a.numero == this.tempo.atleta.numero);

				if (atletaEncontrado) {
					this.tempo.atleta = atletaEncontrado;
					if (this.tempo.marcacao) {
						let novaMarcacao = new Tempo();
						this.tempos.push(Object.assign(novaMarcacao, this.tempo));
					} else {
						alert("Você ainda não iniciou o cronômetro!!");
					}
				} else {
					alert('Número de atleta não existe!!');
				}
			});
		} else {
			alert("Você precisa inserir um número!!");
		}
	}

	getAtletas() {
		return this.localStorage.getItem('atleta');
	}
}
