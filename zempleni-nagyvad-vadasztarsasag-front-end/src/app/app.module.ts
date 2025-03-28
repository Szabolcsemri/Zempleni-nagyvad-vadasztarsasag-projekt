import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { FoldalComponent } from './foldal/foldal.component';
import { LabjegyzetComponent } from './labjegyzet/labjegyzet.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { VadaszatokComponent } from './vadaszatok/vadaszatok.component';
import { FoglalasComponent } from './foglalas/foglalas.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { EnciklopediaComponent } from './enciklopedia/enciklopedia.component';
import { FelhasznaloAdatokComponent } from './felhasznalo-adatok/felhasznalo-adatok.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisztracioComponent,
    BejelentkezesComponent,
    FoldalComponent,
    LabjegyzetComponent,
    RolunkComponent,
    VadaszatokComponent,
    FoglalasComponent,
    SzervezesComponent,
    EnciklopediaComponent,
    FelhasznaloAdatokComponent,
 
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
