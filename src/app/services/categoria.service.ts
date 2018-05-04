import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriaService {

	categorias: Categoria[];

	constructor() {
		this.categorias = new Array<Categoria>();
	 }

	getCategorias(){
		return this.categorias;
	}

	addCategoria(categoria: Categoria){
		if(categoria){
			this.categorias.push(categoria);
		}	
	}

	editCategoria(categoria: Categoria) {
		if(categoria){
			var index = this.categorias.findIndex(a => a.id == categoria.id);
			this.categorias[index] = categoria;
		}
	}

	deleteCategoria(categoria: Categoria){
		if (categoria.id > 0) {
			let index = this.categorias.findIndex(a => a.id == categoria.id);
			this.categorias.splice(index, 1);
		}
	}
}