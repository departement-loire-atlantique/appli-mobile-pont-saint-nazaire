import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RemoteConfigService } from '../../services/remote-config.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.page.html',
  styleUrls: ['./content-page.page.scss'],
})
export class ContentPagePage implements OnInit {

  public page = {
    title: '',
    content: ''
  };

  constructor(private remoteConfigService: RemoteConfigService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.route.queryParams.subscribe(async (params) => {
      if (params.id) {
        if (this.remoteConfigService.isInitialized) {
          const pages = await this.remoteConfigService.get('pages');

          this.page = pages.find(page => page.id === params.id);
        }
      }
    });
  }

}
