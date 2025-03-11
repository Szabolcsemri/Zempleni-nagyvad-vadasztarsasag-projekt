import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-felhasznalo-adatok',
  templateUrl: './felhasznalo-adatok.component.html',
  styleUrls: ['./felhasznalo-adatok.component.css']
})
export class FelhasznaloAdatokComponent implements OnInit {
  felhasznalo: any = {};
  felhasznalok: any[] = [];
  profileForm: FormGroup;  
  uzenet: string = '';
  allapot: string = '';
  isAdmin: boolean = false;
  constructor( 
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) { 
      this.profileForm = this.fb.group({
      jelszo: ['', [Validators.required]],
      ujjelszo: ['', [Validators.required, Validators.minLength(8)]],
      jelszoujra: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.http.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(
      (data: any) => {
        this.felhasznalo = data.data;  
      },
      (err) => {
        console.error('Hiba történt a profil adatainak lekérése során!', err);
      }
    );

    if(this.isAdmin){
      this.http.get('http://localhost:5000/profile/felhasznalok', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(
        (data: any) => {
          this.felhasznalok = data.data;  
        },
        (err) => {
          console.error('Hiba történt a felhasználók lekérése során!', err);
        }
      );
    }
  }
  
  onSubmit() {
    if (this.profileForm.valid) {
      const { jelszo, ujjelszo, jelszoujra } = this.profileForm.value;

      if (ujjelszo !== jelszoujra) {
        this.uzenet = 'A két jelszó nem egyezik!';
        this.allapot = 'error';
        return;
      }

      const payload = { jelszo, ujjelszo,jelszoujra };
      this.http.patch('http://localhost:5000/profile', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(
        (data) => {
          this.uzenet = 'Sikeres jelszó módosítás!';
          this.allapot = 'success';
          this.profileForm.reset();  
        },
        (err) => {
          console.error('Hiba történt a jelszó módosítása során', err);
          this.uzenet = 'Hiba történt a jelszó módosítása során!';
          this.allapot = 'error';
        }
      );
    }
  }
  onDeleteProfile() {
    if (confirm('Biztosan törölni szeretnéd a fiókodat?')) {
      this.http.delete('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(
        (data: any) => {
          this.uzenet = 'Sikeres fiók törlés!';
          this.allapot = 'success';
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          this.authService.clearToken();
          setTimeout(() => this.router.navigate(['/foldal']), 3000);
        },
        (err) => {
          console.error('Hiba történt a fiók törlése során!', err);
          this.uzenet = 'Hiba történt a fiók törlése során!';
          this.allapot = 'error';
        }
      );
    }
  }
  onDeleteUser(id: number) {
    if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
      this.http.delete(`http://localhost:5000/profile/felhasznalok/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe(
        (response: any) => {
          this.uzenet = response.message;
          this.allapot = 'success';
  
          this.felhasznalok = this.felhasznalok.filter(user => user.felhasznalo_id !== id);
        },
        (err) => {
          console.error('Hiba történt a felhasználó törlése során!', err);
          this.uzenet = 'Hiba történt a felhasználó törlése során!';
          this.allapot = 'error';
        }
      );
    }
  }

}
