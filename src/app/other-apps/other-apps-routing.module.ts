import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherAppsPage } from './other-apps.page';

const routes: Routes = [
  {
    path: '',
    component: OtherAppsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherAppsPageRoutingModule {}
