import { TestBed } from '@angular/core/testing';

import { StubLocalDataApiService } from './stub-local-data-api.service';

describe('StubLocalDataApiService', () => {
    let service: StubLocalDataApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StubLocalDataApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
