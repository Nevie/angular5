import {NewsItem} from '../news/models/NewsItem';

export class ConverterToCustomModel {
  static Convert(array: NewsItem[], custom: boolean): NewsItem[] {
    array.map(item => {
      item.custom = custom;
    });
    return array;
  }

}
