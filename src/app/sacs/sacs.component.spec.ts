import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacsComponent } from './sacs.component';

describe('SacsComponent', () => {
  let component: SacsComponent;
  let fixture: ComponentFixture<SacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SacsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
