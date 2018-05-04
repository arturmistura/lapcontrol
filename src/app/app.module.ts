import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron'; 

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AtletaComponent } from './atleta/atleta.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ProvaComponent } from './prova/prova.component';
import { AtletaService } from './services/atleta.service';
import { CategoriaService } from './services/categoria.service';
import { EquipeService } from './services/equipe.service';
import { ProvaService } from './services/prova.service';

@NgModule({
  declarations: [
    AppComponent,
    AtletaComponent,
    CronometroComponent,
    CategoriaComponent,
    EquipeComponent,
    ProvaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AtletaService, CategoriaService, EquipeService, ProvaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
