import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColliersEmeraudeComponent } from './colliers-emeraude.component';

describe('ColliersEmeraudeComponent', () => {
  let component: ColliersEmeraudeComponent;
  let fixture: ComponentFixture<ColliersEmeraudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColliersEmeraudeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColliersEmeraudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
