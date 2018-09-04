import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarescenarioComponent } from './agregarescenario.component';

describe('AgregarescenarioComponent', () => {
  let component: AgregarescenarioComponent;
  let fixture: ComponentFixture<AgregarescenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarescenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarescenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
