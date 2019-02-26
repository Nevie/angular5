import {getTestBed, TestBed} from '@angular/core/testing';
import {SearchService} from './searchService';

describe('SearchService', () => {
  let injector;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
    injector = getTestBed();
    service = injector.get(SearchService);
  });

  describe('searchTerm', () => {
    it('should emit searchTerm event', (done) => {
      service.searchTerm.subscribe(textRecived => {
        expect(textRecived).toEqual('term');
        done();
      });
      service.searchTermChanged('term');
    });
  });
});
