import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColliersDiamantComponent } from './colliers-diamant.component';

describe('ColliersDiamantComponent', () => {
  let component: ColliersDiamantComponent;
  let fixture: ComponentFixture<ColliersDiamantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColliersDiamantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColliersDiamantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
