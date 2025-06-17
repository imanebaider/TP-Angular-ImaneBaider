import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductParfumsComponent } from './product-parfums.component';

describe('ProductParfumsComponent', () => {
  let component: ProductParfumsComponent;
  let fixture: ComponentFixture<ProductParfumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductParfumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductParfumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
