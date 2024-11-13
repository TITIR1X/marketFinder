import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchEngineRoutingComponent } from './search-engine-routing.component';
import { PlaygroundPageComponent } from './pages/playground/playground-page.component';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule

const routes: Routes = [
  {
    path: '',
    component: SearchEngineRoutingComponent,
    children: [
      {
        path: '',
        component: PlaygroundPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule
  ],
  exports: [RouterModule]
})
export class SearchEngineRoutingModule { }
