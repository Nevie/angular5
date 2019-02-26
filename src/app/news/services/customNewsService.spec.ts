import {ChannelsService} from './channelsService';
import {getTestBed, TestBed} from '@angular/core/testing';
import {CustomNewsService} from './customNewsService';

describe('CustomNewsService', () => {
  let injector;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomNewsService]
    });
    injector = getTestBed();
    service = injector.get(CustomNewsService);
  });

  describe('customNews', () => {
    it('should emit editNews event', (done) => {
      service.customNews.subscribe(textRecived => {
        expect(textRecived).toEqual(true);
        done();
      });
      service.customNewsStateChanged(true);
    });
  });
});
