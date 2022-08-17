import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onToggle(): void {
    this.toggleEvent.emit();
  }
}
