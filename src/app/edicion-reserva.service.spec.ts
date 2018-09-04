import { TestBed, inject } from '@angular/core/testing';

import { EdicionReservaService } from './edicion-reserva.service';

describe('EdicionReservaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdicionReservaService]
    });
  });

  it('should be created', inject([EdicionReservaService], (service: EdicionReservaService) => {
    expect(service).toBeTruthy();
  }));
});
