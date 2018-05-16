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
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { ResultadoComponent } from './resultado/resultado.component';

@NgModule({
  declarations: [
    AppComponent,
    AtletaComponent,
    CronometroComponent,
    CategoriaComponent,
    EquipeComponent,
    ProvaComponent,
    ResultadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
