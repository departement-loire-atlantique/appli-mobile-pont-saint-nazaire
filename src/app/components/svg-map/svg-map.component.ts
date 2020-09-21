import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { Event } from '../../models/event';
import { Status } from '../../models/status';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss'],
})
export class SvgMapComponent implements OnInit, OnChanges {

  private isFirstChange = false;

  private displayedElements: HTMLElement[] = [];

  @Input() data: Status;
  @Input() events: Event[];

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter();

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
        const zone = this.svg.nativeElement.querySelector('#perturbation-' + (event.type === 'vent' ? 'vent' : event.zone));

        const clickHandler = () => {
          this.handleEventClick(event);
        };

        // Avoid multiple bindings by checking if the zone isn't already visible
        if (zone.style.display !== 'block') {
          zone.style.display = 'block';

          if (event.type === 'vent') {
            zone.onclick = clickHandler;
          } else {
            const icon = zone.querySelector('[data-name=' + event.type + ']');

            if (icon) {
              icon.style.display = 'block';
              icon.onclick = clickHandler;

              this.displayedElements.push(icon);
            }
          }

          this.displayedElements.push(zone);
        }
      });
    }

    this.isFirstChange = false;
  }

  handleEventClick(event: Event) {
    this.clickEvent.emit(event);
  }

  hidePreviousevents() {
    this.displayedElements.forEach((element: any) => {
      element.style.display = 'none';
      element.onclick = undefined;
    });

    this.displayedElements = [];
  }
}
