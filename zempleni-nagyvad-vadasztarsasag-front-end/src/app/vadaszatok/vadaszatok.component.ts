import { Component, OnInit } from '@angular/core';
import { vadaszatservice } from '../services/vadaszatok.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-vadaszatok',
  templateUrl: './vadaszatok.component.html',
  styleUrls: ['./vadaszatok.component.css']
})
export class VadaszatokComponent implements OnInit {
  vadaszatok: any[] = [];
  isLoggedIn: boolean = false;
  constructor(private vadaszatservice: vadaszatservice, private authService: AuthService) { }
    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.vadaszatservice.getfoglalhatovadaszatok().subscribe(data => {
        this.vadaszatok = data.vadaszatok;
        console.log("Kapott vadászatok vadaszatok komponensben :", data);
      });
    }
  }



