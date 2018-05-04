import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
	selector: 'app-categoria',
	templateUrl: './categoria.component.html',
	styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

	_service: CategoriaService;
	categorias: Categoria[];
	categoria: Categoria;
	count = 0;

	constructor(private categoriaService: CategoriaService) {
		this._service = categoriaService;
	}

	ngOnInit() {
		this.categorias = this._service.getCategorias();
		this.categoria = new Categoria();
	}

	salvarCategoria() {
		if (this.categoria.id == null || this.categoria.id == 0) {
			this.categoria.id = ++this.count;
			this._service.addCategoria(this.categoria);
		} else {
			this._service.editCategoria(this.categoria);
		}

		this.categoria = new Categoria();
	}

	editarCategoria(categoria: Categoria) {
		Object.assign(this.categoria, categoria);
	}

	excluirCategoria(categoria: Categoria) {
		if (categoria && categoria.id > 0) {
			this._service.deleteCategoria(categoria);
		}
	}
}