import { TestBed, inject } from '@angular/core/testing';

import { HorarioOcupadoService } from './horario-ocupado.service';

describe('HorarioOcupadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorarioOcupadoService]
    });
  });

  it('should be created', inject([HorarioOcupadoService], (service: HorarioOcupadoService) => {
    expect(service).toBeTruthy();
  }));
});
