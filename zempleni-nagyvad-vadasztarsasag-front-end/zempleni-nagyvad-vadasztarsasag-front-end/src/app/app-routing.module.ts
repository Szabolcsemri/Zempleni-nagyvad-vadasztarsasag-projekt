import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FejlecComponent } from './fejlec/fejlec.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { FoldalComponent } from './foldal/foldal.component';
import { LabjegyzetComponent} from './labjegyzet/labjegyzet.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { VadaszatokComponent } from './vadaszatok/vadaszatok.component';


const routes: Routes = [
  { path: '', component: FoldalComponent }, 
  { path: 'fejlec', component: FejlecComponent },
  { path: 'regisztracio', component: RegisztracioComponent },
  { path: 'bejelentkezes', component: BejelentkezesComponent },
  { path: 'foldal', component: FoldalComponent },
  { path: 'labjegyzet', component: LabjegyzetComponent },
  { path: 'rolunk', component: RolunkComponent },
  { path: 'vadaszatok', component: VadaszatokComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
