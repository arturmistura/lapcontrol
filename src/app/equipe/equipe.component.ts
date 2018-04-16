import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from '../models/equipe';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  equipes: Equipe[];
  equipe: Equipe;
  count = 0;

  constructor() { }

  ngOnInit() {
    this.equipes = new Array<Equipe>();
    this.equipe = new Equipe();
  }

  salvarEquipe() {
    if (this.equipe.id == null || this.equipe.id == 0) {
      console.log(this.equipe);
      this.equipe.id = this.count++;
      this.equipes.push(this.equipe);
    }

    this.equipe = new Equipe();
  }

  editarEquipe(equipe: Equipe) {
    this.equipe = equipe;
  }
}