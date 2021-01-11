import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Event } from '../../models/event';
import { Status } from '../../models/status';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-detailspertubation',
  templateUrl: './detailspertubation.component.html',
  styleUrls: ['./detailspertubation.component.scss'],
})
export class DetailspertubationComponent implements OnInit {
  public event: Event;
  public status: Status;
  public isDeviation: boolean;
  public deviationUrl: string;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this.isDeviation = this.utils.isDeviation(this.status) && (this.event.zone === 'sud-est' || this.event.zone === 'nord-ouest');

    if (this.isDeviation) {
      this.deviationUrl = environment.deviationUrl[this.status.code];
    } else {
      this.deviationUrl = '';
    }
  }
}
