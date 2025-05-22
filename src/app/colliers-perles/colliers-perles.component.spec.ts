import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColliersPerlesComponent } from './colliers-perles.component';

describe('ColliersPerlesComponent', () => {
  let component: ColliersPerlesComponent;
  let fixture: ComponentFixture<ColliersPerlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColliersPerlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColliersPerlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
