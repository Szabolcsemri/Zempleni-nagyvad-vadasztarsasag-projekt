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
  onLogout(){
    localStorage.removeItem('token');
    this.isLoggedIn=false;
    alert("Sikeres kijelentkezés!");
    this.router.navigate(['/foldal']);
  }
  
}

