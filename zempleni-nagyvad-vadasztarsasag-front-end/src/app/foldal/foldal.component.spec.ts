import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldalComponent } from './foldal.component';

describe('FoldalComponent', () => {
  let component: FoldalComponent;
  let fixture: ComponentFixture<FoldalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoldalComponent]
    });
    fixture = TestBed.createComponent(FoldalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
