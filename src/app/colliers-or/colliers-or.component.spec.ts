import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColliersOrComponent } from './colliers-or.component';

describe('ColliersOrComponent', () => {
  let component: ColliersOrComponent;
  let fixture: ComponentFixture<ColliersOrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColliersOrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColliersOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
