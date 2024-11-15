import { Component, OnInit } from '@angular/core';
import { DynamicSearchEngineService } from '../../services/dynamic-search-engine.service';
import { SearchEngineModel } from '../../interfaces/dynamic-search-engine.interface';

@Component({
  selector: 'search-engine-dynamic-search-engine',
  templateUrl: './dynamic-search-engine.component.html',
  styleUrls: ['./dynamic-search-engine.component.scss'],
})
export class DynamicSearchEngineComponent implements OnInit {

  response: SearchEngineModel[] | null = null;

  constructor(
    public dynamicSearchEngineService: DynamicSearchEngineService,
  ) { }

  ngOnInit() {
    this.dynamicSearchEngineService.getModels().subscribe(
      (response) => {
        this.response = response;
        console.log('Modelos obtenidos:', response);
      },
      (error) => {
        console.error('Error al obtener los modelos:', error);
      }
    );
  }

}
