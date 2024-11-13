import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './components/options/options.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    MenuComponent,
    OptionsComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
