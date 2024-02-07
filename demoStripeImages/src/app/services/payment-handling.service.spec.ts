import { TestBed } from '@angular/core/testing';

import { PaymentHandlingService } from './payment-handling.service';

describe('PaymentHandlingService', () => {
  let service: PaymentHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
