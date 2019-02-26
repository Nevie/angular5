import {ConverterToCustomModel} from './convertToCustomModel';
import {MessageService} from './message-service';

describe('MessageService', () => {
  let service = new MessageService();
  it('add message', () => {
    service.add('test');
    expect(service.messages).toEqual(['test']);
  });
});

