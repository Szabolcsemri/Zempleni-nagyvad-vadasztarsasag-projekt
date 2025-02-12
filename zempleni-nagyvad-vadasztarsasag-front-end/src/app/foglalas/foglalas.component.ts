import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-foglalas',
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.css']
})
export class FoglalasComponent {
@Input() vadaszat:any;
}
