import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { SearchEngineRoutingComponent } from './search-engine-routing.component';
import { PlaygroundPageComponent } from './pages/playground/playground-page.component';
import { IonicModule } from '@ionic/angular';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsListComponent } from './components/results-list/results-list.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    ResultsListComponent,
    PlaygroundPageComponent,
    SearchEngineRoutingComponent,
  ],
  imports: [
    IonicModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    SearchEngineRoutingModule,
  ]
})
export class SearchEngineModule { }
