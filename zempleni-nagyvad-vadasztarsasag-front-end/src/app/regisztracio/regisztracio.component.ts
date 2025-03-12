import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {
  felhasznalo = {
    vezeteknev: '',
    keresztnev: '',
    email: '',
    jelszo: '',
    jelszoujra: ''
  };
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}
  emailHibas = false;
  uzenet = '';
  allapot = '';
  onSubmit() {
    this.emailHibas = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.felhasznalo.email);

    const nevRegex = /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű]+$/;

  if (!nevRegex.test(this.felhasznalo.vezeteknev)) {
    this.uzenet = 'A vezetéknév érvénytelen! Csak betűk lehetnek benne.';
    this.allapot = 'error';
    this.errorMessage = 'A vezetéknév érvénytelen! Csak betűk lehetnek benne.';
    return;
  }

  if (!nevRegex.test(this.felhasznalo.keresztnev)) {
    this.uzenet = 'A keresztnév érvénytelen! Csak betűk lehetnek benne.';
    this.allapot = 'error';
    this.errorMessage = 'A keresztnév érvénytelen! Csak betűk lehetnek benne.';
    return;
  }

    if (this.emailHibas) {
      this.uzenet = 'Érvénytelen email cím!';
      this.allapot = 'error';
      this.errorMessage = 'Érvénytelen email cím!';
      return;
    }

    if (!this.felhasznalo.vezeteknev || !this.felhasznalo.keresztnev || !this.felhasznalo.email ||
      !this.felhasznalo.jelszo || !this.felhasznalo.jelszoujra) {
        this.uzenet = 'Minden mezőt ki kell tölteni!';
        this.allapot = 'error';
    this.errorMessage = 'Minden mezőt ki kell tölteni!';
    return;
    }
    const jelszoRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!jelszoRegex.test(this.felhasznalo.jelszo)) {
      this.uzenet = 'A jelszónak minimum 8 karakterből kell állnia, és tartalmaznia legalább egy számot.';
      this.allapot = 'error';
      this.errorMessage = 'A jelszónak minimum 8 karakterből kell állnia, és tartalmaznia legalább egy számot.';
      return;
    }
    if (this.felhasznalo.jelszo !== this.felhasznalo.jelszoujra) {
      this.uzenet = 'A két jelszó nem egyezik!';
      this.allapot = 'error';
      this.errorMessage = 'A két jelszó nem egyezik!';
      return;
    }
    this.http.post('http://localhost:5000/register', this.felhasznalo).subscribe({
      next: (response) => {
        console.log('Sikeres regisztráció',  response);
        this.uzenet = 'Sikeres regisztráció!';
        this.allapot = 'success';
        setTimeout(() => this.router.navigate(['/bejelentkezes']), 3000);
      },
      error: (error) => {
        console.error('Hiba regisztráció során:', error);
        this.errorMessage = error.error?.message || 'Hiba történt';
        this.uzenet = "Hiba történt!";
        this.allapot = "error";
      }
    });
  }
}
