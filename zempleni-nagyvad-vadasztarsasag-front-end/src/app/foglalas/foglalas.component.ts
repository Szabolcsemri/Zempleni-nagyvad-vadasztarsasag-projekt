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
  isAdmin: boolean = false;
  torolve: boolean = false;
  userId: number | null = null;
  
  constructor(private vadaszatservice: vadaszatservice, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getUserId();
    if (this.isLoggedIn) {
      this.vadaszatservice.foglalasAllapot(this.vadaszat.foglalt_vadaszat_id).subscribe(response => {
        this.csatlakozott = response.csatlakozott;
      });
    }
    console.log("FoglalasComponent kapott vadaszat objektuma:", this.vadaszat);
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
  vadaszatAdminTorles(vadaszatId: number) {
    if(confirm("Biztosan törölni szeretné a vadászatot?")) {
      if (!vadaszatId) {
        console.error("HIBA: vadaszatId undefined vagy null!");
        return;
      }
      this.vadaszatservice.vadaszatTorlesAdmin(vadaszatId).subscribe(() => {
        this.torolve = true;
        window.location.reload();
      });
    }
  }
  vadaszatTorles(vadaszatId: number) {
    if (confirm("Biztosan törölni szeretné a vadászatot?")) {
      this.vadaszatservice.vadaszatTorles(vadaszatId).subscribe(() => {
        this.torolve = true;
        window.location.reload();
      });
    }
  }
}


