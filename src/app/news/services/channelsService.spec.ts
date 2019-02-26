import {ChannelsService} from './channelsService';
import {getTestBed, TestBed} from '@angular/core/testing';

describe('ChannelsService', () => {
  let injector;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelsService]
    });
    injector = getTestBed();
    service = injector.get(ChannelsService);
  });

  describe('chanelSelected', () => {
    const chanel = {id: 'abc-news', name: 'ABC News'};
    it('should emit editNews event', (done) => {
      service.chanelSelected.subscribe(textRecived => {
        expect(textRecived).toEqual(chanel);
        done();
      });
      service.chanelSelectedChanged(chanel);
    });
  });
});
