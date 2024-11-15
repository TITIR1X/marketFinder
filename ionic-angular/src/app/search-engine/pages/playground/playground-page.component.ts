import { Component, OnInit } from '@angular/core';
import { DynamicHostService } from '../../../shared/services/dynamic-host.service';
import { DynamicSearchEngineService } from '../../services/dynamic-search-engine.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground-page.component.html',
  styleUrls: ['./playground-page.component.scss'],
})
export class PlaygroundPageComponent {
  constructor(
    public dynamicHostService: DynamicHostService,
    public dynamicSearchEngineService: DynamicSearchEngineService
  ) { }
}
