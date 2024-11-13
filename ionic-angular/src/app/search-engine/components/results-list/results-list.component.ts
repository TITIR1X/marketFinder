import { Component } from '@angular/core';
import { SearchInputService } from '../../services/search-input.service';

@Component({
  selector: 'search-engine-results-list',
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.scss',
})
export class ResultsListComponent {

  constructor(
    public searchInputService: SearchInputService
  ) { }

}