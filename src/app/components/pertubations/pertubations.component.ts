import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pertubations',
  templateUrl: './pertubations.component.html',
  styleUrls: ['./pertubations.component.scss'],
})
export class PertubationsComponent implements OnInit {
  @Input() pertubation: any
  constructor() { }

  ngOnInit() {} 

}
