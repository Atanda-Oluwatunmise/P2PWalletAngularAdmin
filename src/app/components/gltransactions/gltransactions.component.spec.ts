import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GltransactionsComponent } from './gltransactions.component';

describe('GltransactionsComponent', () => {
  let component: GltransactionsComponent;
  let fixture: ComponentFixture<GltransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GltransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GltransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
