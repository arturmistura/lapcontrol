import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletaComponent } from './atleta/atleta.component';
import { EquipeComponent } from './equipe/equipe.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { ProvaComponent } from './prova/prova.component';
import { ResultadoComponent } from './resultado/resultado.component';

const routes: Routes = [
  { path: '', component: CronometroComponent },
  { path: 'atleta', component: AtletaComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'resultado', component: ResultadoComponent },
  { path: 'prova', component: ProvaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
