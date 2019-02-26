import {ConverterToCustomModel} from './convertToCustomModel';

describe('ConverterToCustomModel', () => {
  it('convert', () => {
    let news = [{
      id: 1,
      author: 'Author',
      title: 'TITLe',
      description: 'description',
      url: 'url',
      urlToImage: 'urlToImage',
      content: 'content',
      publishedAt: null
    }];
    let expectResult = [{
      id: 1,
      author: 'Author',
      title: 'TITLe',
      description: 'description',
      url: 'url',
      urlToImage: 'urlToImage',
      content: 'content',
      publishedAt: null,
      custom: true
    }];

    expect(ConverterToCustomModel.Convert(news, true)).toEqual(expectResult);
  });
});

