import { Component,Input, OnInit } from '@angular/core';
import { vadaszatservice } from '../services/vadaszatok.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-foglalas',
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.css']
})
export class FoglalasComponent {
@Input() vadaszat:any;
csatlakozott: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private vadaszatservice: vadaszatservice, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.vadaszatservice.foglalasAllapot(this.vadaszat.foglalt_vadaszat_id).subscribe(response => {
        this.csatlakozott = response.csatlakozott;
      });
    }
    console.log("FoglalasComponent kapott vadaszat objektuma HEEEEEEEE:", this.vadaszat);
  }

  csatlakozas(vadaszatId: number) {
    if (!vadaszatId) {
      console.error("HIBA: vadaszatId undefined vagy null!");
      return;
    }
    this.vadaszatservice.csatlakozas(vadaszatId).subscribe(() => {
      this.csatlakozott = true;
    });
  }

  lecsatlakozas(vadaszatId: number) {
    if (!vadaszatId) {
      console.error("HIBA: vadaszatId undefined vagy null!");
      return;
    }
    this.vadaszatservice.lecsatlakozas(vadaszatId).subscribe(() => {
      this.csatlakozott = false;
    });
  }
}


