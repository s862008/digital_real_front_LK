import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialComplexCardComponent } from './residential-complex-card.component';

describe('ResidentialComplexCardComponent', () => {
  let component: ResidentialComplexCardComponent;
  let fixture: ComponentFixture<ResidentialComplexCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialComplexCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialComplexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
