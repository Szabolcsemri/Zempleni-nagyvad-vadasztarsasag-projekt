import { Component, OnInit } from '@angular/core';
import { vadaszatservice } from '../services/vadaszatok.service';


@Component({
  selector: 'app-vadaszatok',
  templateUrl: './vadaszatok.component.html',
  styleUrls: ['./vadaszatok.component.css']
})
export class VadaszatokComponent implements OnInit {
  vadaszatok: any = [];
  constructor(private vadaszatservice: vadaszatservice) { }
    ngOnInit(): void {
      this.vadaszatservice.getfoglalhatovadaszatok().subscribe (data => {
        this.vadaszatok = data.vadaszatok;
      });
    }
  }



