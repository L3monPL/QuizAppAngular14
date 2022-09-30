import { TestBed } from '@angular/core/testing';

import { CategoryRestService } from './category-rest.service';

describe('CategoryRestService', () => {
  let service: CategoryRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
