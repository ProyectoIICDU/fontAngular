import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioDeportivosComponent } from './espacio-deportivos.component';

describe('EspacioDeportivosComponent', () => {
  let component: EspacioDeportivosComponent;
  let fixture: ComponentFixture<EspacioDeportivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacioDeportivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacioDeportivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
