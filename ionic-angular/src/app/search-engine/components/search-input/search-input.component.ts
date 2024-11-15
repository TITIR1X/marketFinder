import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { SearchInputService } from '../../services/search-input.service';
import { DynamicSearchEngineService } from '../../services/dynamic-search-engine.service';
import { SearchEngineModel } from '../../interfaces/dynamic-search-engine.interface';

@Component({
  selector: 'search-engine-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {

  searchControl: FormControl = new FormControl();

  constructor(
    private searchInputService: SearchInputService,
    public dynamicSearchEngineService: DynamicSearchEngineService
  ) {  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(340), // Espera 340ms después de dejar de escribir
      switchMap(query => this.searchInputService.searchCategory(query))
    ).subscribe(response => {
      console.log('Resultado de búsqueda:', response);
    });
  }

  sendSearchRequest() {
    const query = this.searchControl.value;
    if (query) {
      this.searchInputService.searchCategory(query).subscribe(response => {
        console.log('Resultado de búsqueda desde el botón:', response);
      });
    }
  }
}
