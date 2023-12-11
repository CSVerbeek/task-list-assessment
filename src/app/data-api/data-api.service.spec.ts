import { TestBed } from '@angular/core/testing';

import { StubLocalDataApiService } from './data-api.service';

describe('DataApiService', () => {
    let service: StubLocalDataApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StubLocalDataApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
