import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockuserComponent } from './unlockuser.component';

describe('UnlockuserComponent', () => {
  let component: UnlockuserComponent;
  let fixture: ComponentFixture<UnlockuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
