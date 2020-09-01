import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-traffic-direction',
  templateUrl: './traffic-direction.component.html',
  styleUrls: ['./traffic-direction.component.scss'],
})
export class TrafficDirectionComponent implements OnInit {

  @Input() mode: any;

  constructor() { }

  ngOnInit() {
    console.log(this);
  }

}
