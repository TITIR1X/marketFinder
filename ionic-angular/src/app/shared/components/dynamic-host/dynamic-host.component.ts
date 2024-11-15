import { Component, OnInit } from '@angular/core';
import { DynamicHostService } from '../../services/dynamic-host.service';

@Component({
  selector: 'shared-dynamic-host',
  templateUrl: './dynamic-host.component.html',
  styleUrls: ['./dynamic-host.component.scss'],
})
export class DynamicHostComponent implements OnInit {

  hostInLocalStorage = localStorage.getItem('apiHost') || '';
  currentStatus: 'waiting' | 'connecting' | 'operational' | 'error' | undefined = 'waiting';

  constructor(
    public dynamicHostService: DynamicHostService,
  ) { }

  ngOnInit() {
    this.currentStatus = 'waiting';
    if (this.hostInLocalStorage) {
      this.check(this.hostInLocalStorage);
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const element = document.getElementById('input');
    element?.classList.remove('green');
    this.check(inputElement.value);
  }


  check(inputValue: string) {
    // Pass the input value to checkDynamicHost
    this.dynamicHostService.checkDynamicHost(inputValue).subscribe((result) => {
      this.currentStatus = result as 'connecting' | 'operational' | 'error';

      // Update the class after status is changed
      const element = document.getElementById('input');
      if (this.currentStatus === 'operational') {
        this.dynamicHostService.setNewHost(inputValue);
        element?.classList.add('green');
      }
    });
  }

}
