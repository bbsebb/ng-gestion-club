import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarListUsersComponent } from './bar-list-users.component';

describe('ListUsersComponent', () => {
  let component: BarListUsersComponent;
  let fixture: ComponentFixture<BarListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarListUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
