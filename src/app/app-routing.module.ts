import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletaComponent } from './atleta/atleta.component';
import { EquipeComponent } from './equipe/equipe.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CronometroComponent } from './cronometro/cronometro.component';

const routes: Routes = [
  { path: '', component: CronometroComponent },
  { path: 'atleta', component: AtletaComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'categoria', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
