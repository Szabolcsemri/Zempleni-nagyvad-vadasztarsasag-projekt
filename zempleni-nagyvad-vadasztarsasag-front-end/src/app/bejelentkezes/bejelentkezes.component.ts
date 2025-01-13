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

  onSubmit(){
    this.http.post('http://localhost:5000/login', this.felhasznalo).subscribe({
      next: (respone: any) => {
        if (respone.token){
          this.authService.setToken( respone.token);
          alert("Sikeres bejelentkezés!");
          this.router.navigate(['/foldal']);
        }
      },
      error:(err) =>{
        console.error('Bejlentkezési hiba:', err);
        this.errorMessage = err.error?.message || 'Hiba történt.';
        alert("Hiba történt");
      }
    });
  }
}
