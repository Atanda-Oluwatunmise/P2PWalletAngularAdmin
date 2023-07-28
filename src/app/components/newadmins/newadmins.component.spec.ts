import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewadminsComponent } from './newadmins.component';

describe('NewadminsComponent', () => {
  let component: NewadminsComponent;
  let fixture: ComponentFixture<NewadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewadminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
