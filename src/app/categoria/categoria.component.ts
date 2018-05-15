import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
	selector: 'app-categoria',
	templateUrl: './categoria.component.html',
	styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

	categorias: Categoria[];
	categoria: Categoria;
	count = 0;

	constructor(protected localStorage: LocalStorage) {
	}

	ngOnInit() {
		this.listarCategorias();
		this.categoria = new Categoria();
	}

	salvarCategoria() {
		if (this.categoria.id == null || this.categoria.id == 0) {
			this.categoria.id = ++this.count;
			this.addCategoria(this.categoria);
		} else {
			this.editCategoria(this.categoria);
		}

		this.categoria = new Categoria();
	}

	editarCategoria(categoria: Categoria) {
		Object.assign(this.categoria, categoria);
	}

	excluirCategoria(categoria: Categoria) {
		if (categoria && categoria.id > 0) {
			this.deleteCategoria(categoria);
		}
	}

	listarCategorias() {
		this.getCategorias().subscribe((categorias) => {
			this.categorias = categorias;
		});
	}

	getCategorias() {
		return this.localStorage.getItem('categoria');
	}

	addCategoria(categoria: Categoria) {
		if (categoria) {
			this.getCategorias().subscribe(categorias => {
				categorias.push(categoria);
				this.setItem(categorias);
			});
		}
	}

	editCategoria(categoria: Categoria) {
		if (categoria) {
			this.getCategorias().subscribe(categorias => {
				let index = categorias.findIndex(a => a.id == categoria.id);
				categorias[index] = categoria;
				this.setItem(categorias);
			});
		}
	}

	deleteCategoria(categoria: Categoria) {
		if (categoria.id > 0) {
			this.getCategorias().subscribe(categorias => {
				let index = categorias.findIndex(a => a.id == categoria.id);
				categorias.splice(index, 1);
				this.setItem(categorias);
			});
		}
	}

	setItem(categorias) {
		return this.localStorage.setItem('categoria', categorias).subscribe(() => {
			this.listarCategorias();
		 });
	}
}