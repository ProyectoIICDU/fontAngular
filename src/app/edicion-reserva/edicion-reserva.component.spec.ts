import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionReservaComponent } from './edicion-reserva.component';

describe('EdicionReservaComponent', () => {
  let component: EdicionReservaComponent;
  let fixture: ComponentFixture<EdicionReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicionReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
