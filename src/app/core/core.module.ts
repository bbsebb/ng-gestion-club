import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
  declarations: [NavigationComponent, HeaderComponent, TemplateComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [TemplateComponent]
})
export class CoreModule {}
