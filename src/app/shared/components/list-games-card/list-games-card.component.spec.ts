import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGamesCardComponent } from './list-games-card.component';

describe('ListGamesComponent', () => {
  let component: ListGamesCardComponent;
  let fixture: ComponentFixture<ListGamesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGamesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGamesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
