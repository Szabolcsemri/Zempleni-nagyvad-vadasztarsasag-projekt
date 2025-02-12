import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { FormsModule } from '@angular/forms';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { FoldalComponent } from './foldal/foldal.component';
import { LabjegyzetComponent } from './labjegyzet/labjegyzet.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { VadaszatokComponent } from './vadaszatok/vadaszatok.component';
import { FoglalasComponent } from './foglalas/foglalas.component';
import { KonfiguracioComponent } from './konfiguracio/konfiguracio.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    RegisztracioComponent,
    BejelentkezesComponent,
    FoldalComponent,
    LabjegyzetComponent,
    RolunkComponent,
    VadaszatokComponent,
    FoglalasComponent,
    KonfiguracioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
