import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ChannelsModel} from '../models/ChannelsModel';

@Injectable()
export class ChannelsService {
  chanelSelected: Subject<ChannelsModel> = new Subject<ChannelsModel>();

  chanelSelectedChanged(newChanel: ChannelsModel) {
    this.chanelSelected.next(newChanel);
  }
}
