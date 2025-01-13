import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FejlecComponent } from './fejlec/fejlec.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { FoldalComponent } from './foldal/foldal.component';


const routes: Routes = [
  { path: '', component: FoldalComponent }, 
  { path: 'fejlec', component: FejlecComponent },
  { path: 'regisztracio', component: RegisztracioComponent },
  { path: 'bejelentkezes', component: BejelentkezesComponent },
  { path: 'foldal', component: FoldalComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
