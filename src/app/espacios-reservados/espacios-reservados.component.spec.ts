import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosReservadosComponent } from './espacios-reservados.component';

describe('EspaciosReservadosComponent', () => {
  let component: EspaciosReservadosComponent;
  let fixture: ComponentFixture<EspaciosReservadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaciosReservadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaciosReservadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
