import { TestBed, inject } from '@angular/core/testing';

import { EspaciosreservadosService } from './espaciosreservados.service';

describe('EspaciosreservadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaciosreservadosService]
    });
  });

  it('should be created', inject([EspaciosreservadosService], (service: EspaciosreservadosService) => {
    expect(service).toBeTruthy();
  }));
});
