import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarControlPanelComponent } from './bar-control-panel.component';



describe('BarComponent', () => {
  let component: BarControlPanelComponent;
  let fixture: ComponentFixture<BarControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarControlPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
