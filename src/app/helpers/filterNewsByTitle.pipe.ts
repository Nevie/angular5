import {Pipe, PipeTransform} from '@angular/core';
import {NewsItem} from '../news/models/NewsItem';

@Pipe({
  name: 'filterNewsByTitle'
})
export class FilterNewsByTitlePipe implements PipeTransform {

  transform(value: NewsItem[], query: string): any {
    return value.filter((value) => {
      return value.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }
}
