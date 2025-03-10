import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {
  felhasznalo = {
    email: '',
    jelszo: ''
  };
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router,private authService:AuthService) {}
  uzenet = '';
  allapot = '';
  onSubmit(){
    this.http.post('http://localhost:5000/login', this.felhasznalo).subscribe({
      next: (respone: any) => {
        if (respone.token){
          this.authService.setToken( respone.token);
          this.uzenet = "Sikeres bejelentkezés!";
          this.allapot = "success";
          setTimeout(() => this.router.navigate(['/foldal']), 3000);
        }
      },
      error:(err) =>{
        console.error('Bejlentkezési hiba:', err);
        this.uzenet = err.error?.message || 'Hibás email vagy jelszó!';
        this.allapot = "error";
      }
    });
  }
}
