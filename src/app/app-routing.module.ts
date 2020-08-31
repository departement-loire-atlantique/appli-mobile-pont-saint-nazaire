import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'webcam',
    loadChildren: () => import('./pages/webcam/webcam.module').then( m => m.WebcamPageModule)
  },
  {
    path: 'informations',
    loadChildren: () => import('./pages/informations/informations.module').then( m => m.InformationsPageModule)
  },
  {
    path: 'other-apps',
    loadChildren: () => import('./pages/other-apps/other-apps.module').then( m => m.OtherAppsPageModule)
  },
  {
    path: 'departement',
    loadChildren: () => import('./pages/departement/departement.module').then( m => m.DepartementPageModule)
  },
  {
    path: 'content-page',
    loadChildren: () => import('./pages/content-page/content-page.module').then( m => m.ContentPagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
