import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showCarousel = false;
  title = 'zempleni-nagyvad-vadasztarsasag-front-end';
  isLoggedIn=false;
  constructor(private router:Router,private authService:AuthService){}
  ngOnInit() {
    this.checkLoginStatus();
    this.authService.getLoginallapot().subscribe((allapot)=>{
      this.isLoggedIn=allapot;
    });
  }
  checkLoginStatus(){
    this.isLoggedIn= !!localStorage.getItem('token');
  }
  uzenet = '';
  allapot = '';
  onLogout(){
    
    localStorage.removeItem('token');
    this.isLoggedIn=false;
    this.uzenet = 'Sikeres kijelentkezés!';
    this.allapot = 'success';
    setTimeout(() => {
      this.uzenet = '';
      this.allapot = '';
    }, 3000);
    setTimeout(() => this.router.navigate(['/foldal']), 3000);
  }
  
}

