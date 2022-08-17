import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  @ViewChild(NavigationComponent) nav!: NavigationComponent;

  constructor() {}

  ngOnInit(): void {}

  onToggle(toggle: void): void {
    this.nav.toggle();
  }
}
