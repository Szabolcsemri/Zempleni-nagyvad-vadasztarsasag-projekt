import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enciklopedia',
  templateUrl: './enciklopedia.component.html',
  styleUrls: ['./enciklopedia.component.css', ]
})
export class EnciklopediaComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
 
 
}
