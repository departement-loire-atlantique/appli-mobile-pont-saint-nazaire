import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss'],
})
export class SvgMapComponent implements OnInit {

  @Input() data: any = {};

  public stateNorth = 'vert';
  public stateSouth = 'vert';

  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }

}
