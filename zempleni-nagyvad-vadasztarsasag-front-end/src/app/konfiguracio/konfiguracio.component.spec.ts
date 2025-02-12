import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfiguracioComponent } from './konfiguracio.component';

describe('KonfiguracioComponent', () => {
  let component: KonfiguracioComponent;
  let fixture: ComponentFixture<KonfiguracioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KonfiguracioComponent]
    });
    fixture = TestBed.createComponent(KonfiguracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
