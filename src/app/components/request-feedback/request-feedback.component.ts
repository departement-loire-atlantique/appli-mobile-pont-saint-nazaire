import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NetworkStatus } from '@capacitor/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.scss'],
})
export class RequestFeedbackComponent implements OnInit, OnDestroy {

  @Input() fetching = true;
  @Input() error = false;
  @Output() clickRetry: EventEmitter<any> = new EventEmitter();

  private sub: Subscription;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this.sub = this.utils.networkChangeDetector().subscribe((status: NetworkStatus) => {
      if (status.connected) {
        this.retry();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  retry() {
    this.clickRetry.emit();
  }

}
