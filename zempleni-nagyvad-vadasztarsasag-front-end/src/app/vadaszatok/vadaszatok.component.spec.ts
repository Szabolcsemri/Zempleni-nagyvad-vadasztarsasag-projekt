import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VadaszatokComponent } from './vadaszatok.component';

describe('VadaszatokComponent', () => {
  let component: VadaszatokComponent;
  let fixture: ComponentFixture<VadaszatokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VadaszatokComponent]
    });
    fixture = TestBed.createComponent(VadaszatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
