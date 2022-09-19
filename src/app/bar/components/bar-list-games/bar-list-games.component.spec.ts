import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarListGamesComponent } from './bar-list-games.component';

describe('ListGamesComponent', () => {
  let component: BarListGamesComponent;
  let fixture: ComponentFixture<BarListGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarListGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarListGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
