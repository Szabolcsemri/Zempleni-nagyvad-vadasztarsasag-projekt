import { Component, OnInit } from '@angular/core';
import { vadaszatservice } from '../services/vadaszatok.service';


@Component({
  selector: 'app-vadaszatok',
  templateUrl: './vadaszatok.component.html',
  styleUrls: ['./vadaszatok.component.css']
})
export class VadaszatokComponent implements OnInit {
  vadaszatok: any = [];
  constructor(private vadaszatservice: vadaszatservice) {}
  ngOnInit(): void {
    this.vadaszatservice.getfoglalhatovadaszatok().subscribe(data => {
      this.vadaszatok = data;
    });
    this.vadaszatok = [
      {
        vadfaj: { nev: 'Őz', foto_url: '' },
        helyszin: { nev: 'Budai-hegység' },
        kezdete: new Date(2025, 1, 15, 10, 30),
        vege: new Date(2025, 1, 15, 14, 0)
      },
      {
        vadfaj: { nev: 'Vaddisznó', foto_url: '' },
        helyszin: { nev: 'Bakony' },
        kezdete: new Date(2025, 2, 10, 8, 0),
        vege: new Date(2025, 2, 10, 12, 30)
      },

    {
        vadfaj: { nev: 'Vaddisznó', foto_url: 'https://example.com/vaddiszno.jpg' },
        helyszin: { nev: 'Bakony' },
        kezdete: new Date(2025, 2, 10, 8, 0),
        vege: new Date(2025, 2, 10, 12, 30)
      },

       {
        vadfaj: { nev: 'Cigány', foto_url: 'https://example.com/vaddiszno.jpg' },
        helyszin: { nev: 'Opályi' },
        kezdete: new Date(2025, 2, 10, 8, 0),
        vege: new Date(2025, 2, 10, 12, 30)
      }
    ];
  }
}


