import { TestBed } from '@angular/core/testing';

import { CheckersClientService } from './checkers-client.service';

describe('CheckersClientService', () => {
  let service: CheckersClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckersClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
