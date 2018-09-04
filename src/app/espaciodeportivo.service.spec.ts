import { TestBed, inject } from '@angular/core/testing';

import { EspaciodeportivoService } from './espaciodeportivo.service';

describe('EspaciodeportivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaciodeportivoService]
    });
  });

  it('should be created', inject([EspaciodeportivoService], (service: EspaciodeportivoService) => {
    expect(service).toBeTruthy();
  }));
});
