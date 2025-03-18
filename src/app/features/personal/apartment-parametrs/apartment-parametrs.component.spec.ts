import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentParametrsComponent } from './apartment-parametrs.component';

describe('ApartmentParametrsComponent', () => {
  let component: ApartmentParametrsComponent;
  let fixture: ComponentFixture<ApartmentParametrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentParametrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentParametrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
