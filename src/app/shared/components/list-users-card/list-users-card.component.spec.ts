import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersCardComponent } from './list-users-card.component';

describe('ListUsersCardComponent', () => {
  let component: ListUsersCardComponent;
  let fixture: ComponentFixture<ListUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
