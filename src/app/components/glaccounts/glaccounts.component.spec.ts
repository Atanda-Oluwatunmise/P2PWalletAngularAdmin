import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlaccountsComponent } from './glaccounts.component';

describe('GlaccountsComponent', () => {
  let component: GlaccountsComponent;
  let fixture: ComponentFixture<GlaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlaccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
