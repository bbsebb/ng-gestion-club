import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSingleGameComponent } from './bar-single-game.component';

describe('BarSingleGameComponent', () => {
  let component: BarSingleGameComponent;
  let fixture: ComponentFixture<BarSingleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarSingleGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
