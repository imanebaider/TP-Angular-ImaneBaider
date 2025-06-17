import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSacsComponent } from './detail-sacs.component';

describe('DetailSacsComponent', () => {
  let component: DetailSacsComponent;
  let fixture: ComponentFixture<DetailSacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSacsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
