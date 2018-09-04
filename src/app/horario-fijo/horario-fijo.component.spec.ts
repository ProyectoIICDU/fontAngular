import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioFijoComponent } from './horario-fijo.component';

describe('HorarioFijoComponent', () => {
  let component: HorarioFijoComponent;
  let fixture: ComponentFixture<HorarioFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
