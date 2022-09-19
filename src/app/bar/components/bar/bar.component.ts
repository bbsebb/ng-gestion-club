import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  private _filters$:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get filters$():Observable<string[]> {
    return this._filters$.asObservable();
  }
  ;
  tab: string[] = ['Control Panel', 'Rencontres', 'Barmen'];
  index: number = 0;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe((path) => {
      switch (path['tab']) {
        case 'games':
          this.index = 1;
          break;
        case 'barmen':
          this.index = 2;
          break;
        default:
          this.index = 0;
          break;
      }
    });
  }

  changeTabIndex(pathValue: { tab: string; filters?: string[] }): void {
    this._filters$.next(pathValue.filters ? pathValue.filters : []);

    switch (pathValue.tab) {
      case 'games':
        this.tabGroup.selectedIndex = 1;
        break;
      case 'barmen':
        this.tabGroup.selectedIndex = 2;
        break;
      default:
        this.tabGroup.selectedIndex = 0;
        break;
    }
  }
}
