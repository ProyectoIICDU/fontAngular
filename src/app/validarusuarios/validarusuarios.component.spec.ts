import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarusuariosComponent } from './validarusuarios.component';

describe('ValidarusuariosComponent', () => {
  let component: ValidarusuariosComponent;
  let fixture: ComponentFixture<ValidarusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
