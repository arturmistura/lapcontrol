import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../models/categoria';
import * as _ from 'lodash';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  categoria: Categoria;

  constructor() { }

  ngOnInit() {
    this.categorias = new Array<Categoria>();
    this.categoria = new Categoria();
  }

  salvarCategoria() {
    if (this.categoria.id == 0) {
      this.categoria.id = this.categorias.length;
      this.categorias.push(this.categoria);
    }else {
      let categoriaEditada = this.findCategoria(this.categoria.id);
      categoriaEditada = this.categoria;
    }

    this.categoria = new Categoria();
  }

  editarCategoria(categoria: Categoria) {
    this.categoria = this.findCategoria(categoria.id);
  }

  findCategoria(id: number){
    return _.find(this.categorias, function(item: Categoria) {
      return item.id == id
    })
  }
}
