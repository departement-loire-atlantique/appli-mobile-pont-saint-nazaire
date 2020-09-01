import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss'],
})
export class SvgMapComponent {

  @Input() data: any = {};

  public stateNorth = 'vert';
  public stateSouth = 'vert';
}
