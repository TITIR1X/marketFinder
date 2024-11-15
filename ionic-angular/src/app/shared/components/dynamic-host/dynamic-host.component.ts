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
  countdown: number | undefined = undefined;

  constructor(
    public dynamicHostService: DynamicHostService,
  ) { }

  ngOnInit() {
    this.currentStatus = 'waiting';
    if (this.hostInLocalStorage) {
      this.check(this.hostInLocalStorage, true);
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const element = document.getElementById('input');
    element?.classList.remove('green');
    this.check(inputElement.value, false);
  }

  check(inputValue: string, firstCall: boolean) {
    // Pass the input value to checkDynamicHost
    this.dynamicHostService.checkDynamicHost(inputValue).subscribe((result) => {
      this.currentStatus = result as 'connecting' | 'operational' | 'error';

      // Update the class after status is changed
      const element = document.getElementById('input');
      if (this.currentStatus === 'operational') {
        this.dynamicHostService.setNewHost(inputValue);
        element?.classList.add('green');

        if (!firstCall){
          // Start the countdown if the status is 'operational'
          this.startCountdown();
        }
      }
    });
  }

  startCountdown() {
    if (this.currentStatus === 'operational') {
      this.countdown = 3;  // Initialize the countdown to 3
      let interval = setInterval(() => {
        if (this.countdown && this.countdown > 1) {
          this.countdown--;
        } else {
          clearInterval(interval); // Stop the interval when countdown reaches 0
          this.dynamicHostService.hideContainerComponent(); // Call the function after countdown finishes
        }
      }, 1000);
    } else {
      this.countdown = undefined;  // Set countdown to undefined if status is not 'operational'
    }
  }

}
