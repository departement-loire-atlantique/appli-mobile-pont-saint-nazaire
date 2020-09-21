import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fermeture',
  templateUrl: './fermeture.component.html',
  styleUrls: ['./fermeture.component.scss'],
})
export class FermetureComponent {
  @Input() status: any;
}
