import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SearchService {
  searchTerm: Subject<string> = new Subject<string>();

  searchTermChanged(newTerm: string) {
    this.searchTerm.next(newTerm);
  }
}
