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

  onSubmit() {
    this.http.post('http://localhost:5000/register', this.felhasznalo).subscribe({
      next: (response) => {
        console.log('Sikeres regisztráció',  response);
        alert('Sikeres regisztráció!');
        this.router.navigate(['/foldal']);
      },
      error: (error) => {
        console.error('Hiba regisztráció során:', error);
        this.errorMessage = error.error?.message || 'Hiba történt';
        alert('Hiba történt regisztráció során!')
      }
    });
  }
}
