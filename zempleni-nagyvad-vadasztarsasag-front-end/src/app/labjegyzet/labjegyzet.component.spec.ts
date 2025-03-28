import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabjegyzetComponent } from './labjegyzet.component';

describe('LabjegyzetComponent', () => {
  let component: LabjegyzetComponent;
  let fixture: ComponentFixture<LabjegyzetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabjegyzetComponent]
    });
    fixture = TestBed.createComponent(LabjegyzetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
