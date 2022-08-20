import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableChipFilterComponent } from './table-chip-filter.component';



describe('FilterShipsTableComponent', () => {
  let component: TableChipFilterComponent;
  let fixture: ComponentFixture<TableChipFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableChipFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableChipFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
