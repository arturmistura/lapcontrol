import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../models/categoria';

@Component({
	selector: 'app-categoria',
	templateUrl: './categoria.component.html',
	styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

	categorias: Categoria[];
	categoria: Categoria;
	count = 0;

	constructor() { }

	ngOnInit() {
		this.categorias = new Array<Categoria>();
		this.categoria = new Categoria();
	}

	salvarCategoria() {
		if (this.categoria.id == null || this.categoria.id == 0) {
			this.categoria.id = ++this.count;
			this.categorias.push(this.categoria);
		} else {
			var index = this.categorias.findIndex(a => a.id == this.categoria.id);
			this.categorias[index] = this.categoria;
		}
		
		this.categoria = new Categoria();
	}

	editarCategoria(categoria: Categoria) {
		Object.assign(this.categoria, categoria);
	}

	excluirCategoria(categoria: Categoria) {
		if(categoria.id > 0){
			let index = this.categorias.findIndex(a => a.id == categoria.id);
			this.categorias.splice(index, 1);
		}
	}
}