import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { FoldalComponent } from './foldal/foldal.component';
import { LabjegyzetComponent} from './labjegyzet/labjegyzet.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { VadaszatokComponent } from './vadaszatok/vadaszatok.component';
import { FoglalasComponent } from './foglalas/foglalas.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { EnciklopediaComponent } from './enciklopedia/enciklopedia.component';
import { FormsModule } from '@angular/forms';
import { FelhasznaloAdatokComponent } from './felhasznalo-adatok/felhasznalo-adatok.component';





const routes: Routes = [
  { path: '', component: FoldalComponent }, 
  { path: 'regisztracio', component: RegisztracioComponent },
  { path: 'bejelentkezes', component: BejelentkezesComponent },
  { path: 'foldal', component: FoldalComponent },
  { path: 'labjegyzet', component: LabjegyzetComponent },
  { path: 'rolunk', component: RolunkComponent },
  { path: 'vadaszatok', component: VadaszatokComponent },
  { path: 'foglalas', component: FoglalasComponent },
  { path: 'szervezes', component: SzervezesComponent },
  { path: 'enciklopedia', component: EnciklopediaComponent },
  { path: 'felhasznalo-adatok', component: FelhasznaloAdatokComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
