import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class CustomNewsService {
  customNews: Subject<boolean> = new Subject<boolean>();

  customNewsStateChanged(newTerm: boolean) {
    this.customNews.next(newTerm);
  }
}
