import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaElementoComponent } from './reserva-elemento.component';

describe('ReservaElementoComponent', () => {
  let component: ReservaElementoComponent;
  let fixture: ComponentFixture<ReservaElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
