import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { vadaszatservice } from '../services/vadaszatok.service';

@Component({
  selector: 'app-szervezes',
  templateUrl: './szervezes.component.html',
  styleUrls: ['./szervezes.component.css']
})
export class SzervezesComponent {
  vadaszatTipus: string = '';
  helyszin: string = '';
  uzenet: string = '';
  allapot: string = '';
  currentDate: string;
  maxZaroDatum: string | null = null;
  kezdoDatum: string | null = null;
  zaroDatum: string | null = null;

  constructor(private vadaszatService: vadaszatservice, private router: Router) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  onKezdoDatumChange() {
    if (this.kezdoDatum) {
      const kezdo = new Date(this.kezdoDatum);
      kezdo.setDate(kezdo.getDate() + 10);
      this.maxZaroDatum = kezdo.toISOString().split('T')[0];
      if (this.zaroDatum && this.zaroDatum < this.kezdoDatum) {
        this.zaroDatum = null;
      }
    }
  }

  foglalas() {
    if (!localStorage.getItem('token')) {
      this.uzenet = "A foglaláshoz bejelentkezés szükséges!";
      this.allapot = "danger";
      return;
    }
    if (!this.kezdoDatum || !this.zaroDatum) {
      this.uzenet = "Minden mező kitöltése kötelező!";
      this.allapot = "danger";
      return;
    }

    this.vadaszatService.foglalVadaszat(
      parseInt(this.helyszin),
      parseInt(this.vadaszatTipus),
      new Date(this.kezdoDatum).toISOString(),
      new Date(this.zaroDatum).toISOString()
    ).subscribe({
      next: () => {
        this.uzenet = "Foglalás sikeres!";
        this.allapot = "success";
        setTimeout(() => this.router.navigate(['/vadaszatok']), 3000);
      },
      error: (err) => {
        console.error("Hiba történt:", err);
        this.uzenet = "Hiba történt a foglalás során!";
        this.allapot = "danger";
      }
    });
  }
}
