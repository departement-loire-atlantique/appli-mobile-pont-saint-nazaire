import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Event } from '../../models/event';

@Component({
  selector: 'app-detailspertubation',
  templateUrl: './detailspertubation.component.html',
  styleUrls: ['./detailspertubation.component.scss'],
})
export class DetailspertubationComponent {
  public event: Event;

  constructor(private modal: ModalController) {}

  dismiss() {
    this.modal.dismiss();
  }
}
