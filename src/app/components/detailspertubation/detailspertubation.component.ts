import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-detailspertubation",
  templateUrl: "./detailspertubation.component.html",
  styleUrls: ["./detailspertubation.component.scss"],
})
export class DetailspertubationComponent implements OnInit {
  evenement;
  constructor(private modal: ModalController) {}

  ngOnInit() {
    console.log('this.evenement',this.evenement)
  }

  dismiss() {
    this.modal.dismiss();
  }
}
