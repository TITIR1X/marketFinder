import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './components/options/options.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DynamicHostComponent } from './components/dynamic-host/dynamic-host.component';



@NgModule({
  declarations: [
    MenuComponent,
    OptionsComponent,
    SidebarComponent,
    DynamicHostComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent,
    DynamicHostComponent
  ]
})
export class SharedModule { }
