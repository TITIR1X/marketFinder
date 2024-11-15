import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { DynamicHostService } from '../../services/dynamic-host.service';

@Component({
  selector: 'shared-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {

  constructor(
    public menuService: MenuService,
    public dynamicHostService: DynamicHostService,
  ) { }

}
