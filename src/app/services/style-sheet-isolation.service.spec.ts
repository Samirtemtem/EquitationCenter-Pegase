import { TestBed } from '@angular/core/testing';

import { StyleSheetIsolationService } from './style-sheet-isolation.service';

describe('StyleSheetIsolationService', () => {
  let service: StyleSheetIsolationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleSheetIsolationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
