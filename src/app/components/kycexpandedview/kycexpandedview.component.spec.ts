import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycexpandedviewComponent } from './kycexpandedview.component';

describe('KycexpandedviewComponent', () => {
  let component: KycexpandedviewComponent;
  let fixture: ComponentFixture<KycexpandedviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycexpandedviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycexpandedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
