import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TemplateComponent } from './components/template/template.component';
import { AuthInfoComponent } from './components/auth-info/auth-info.component';

@NgModule({
  declarations: [NavigationComponent, HeaderComponent, TemplateComponent, AuthInfoComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [TemplateComponent]
})
export class CoreModule {}
