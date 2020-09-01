import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-traffic-direction',
  templateUrl: './traffic-direction.component.html',
  styleUrls: ['./traffic-direction.component.scss'],
})
export class TrafficDirectionComponent {
  @Input() mode: any;
}
