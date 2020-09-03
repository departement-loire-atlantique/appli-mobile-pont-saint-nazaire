import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from '../../services/remote-config.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.page.html',
  styleUrls: ['./departement.page.scss'],
})
export class DepartementPage implements OnInit {

  public pageContent: any = {
    title: '',
    content: ''
  };

  constructor(private remoteConfigService: RemoteConfigService, private navController: NavController) {}

  async ngOnInit() {
    if (this.remoteConfigService.isInitialized) {
      this.pageContent = await this.remoteConfigService.get('departement_page_content');
    }
  }
}
