import { Component, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { Status } from '../../models/status';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss'],
})
export class SvgMapComponent implements OnInit, OnChanges {

  public stateNorth = 'vert';
  public stateSouth = 'vert';

  private isFirstChange = false;

  private displayedElements: HTMLElement[] = [];

  @Input() data: Status;
  @Input() events: Event[];
  @ViewChild('svg') svg: ElementRef;

  ngOnInit() {
    this.handleEvents();
  }

  ngOnChanges() {
    if (!this.isFirstChange) {
      this.handleEvents();
    }
  }

  handleEvents() {
    if (!this.svg) {
      return;
    }

    this.hidePreviousevents();

    if (this.events && this.events.length) {
      this.events.forEach((event: Event) => {
        if (event.type === 'vent') {
          const vent = this.svg.nativeElement.querySelector('#perturbation-vent');
          vent.style.display = 'block';
          this.displayedElements.push(vent);
        } else {
          const zone = this.svg.nativeElement.querySelector('#perturbation-' + event.zone);
          zone.style.display = 'block';
          this.displayedElements.push(zone);

          const icon = zone.querySelector('[data-name=' + event.type + ']');
          icon.style.display = 'block';
          this.displayedElements.push(icon);
        }
      });
    }

    this.isFirstChange = false;
  }

  hidePreviousevents() {
    this.displayedElements.forEach(element => {
      element.style.display = 'none';
    });

    this.displayedElements = [];
  }
}
