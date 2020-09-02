import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pertubations',
  templateUrl: './pertubations.component.html',
  styleUrls: ['./pertubations.component.scss'],
})
export class PertubationsComponent {
  @Input() pertubation: any;
}
