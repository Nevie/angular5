import {FilterNewsByTitlePipe} from './filterNewsByTitle.pipe';

describe('FilterNewsByTitlePipe', () => {
  const pipe = new FilterNewsByTitlePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('find one', () => {
    let news = [{
      id: 1,
      author: 'Author',
      title: 'TITLe',
      description: 'description',
      url: 'url',
      urlToImage: 'urlToImage',
      content: 'content',
      publishedAt: null
    },
      {
        id: 2,
        author: 'Author2',
        title: 'Text',
        description: 'description2',
        url: 'url2',
        urlToImage: 'urlToImage2',
        content: 'content2',
        publishedAt: null
      }];

    expect(pipe.transform(news, 'title')).toEqual([news[0]]);
  });

  it('find two', () => {
    let news = [{
      id: 1,
      author: 'Author',
      title: 'TITLe',
      description: 'description',
      url: 'url',
      urlToImage: 'urlToImage',
      content: 'content',
      publishedAt: null
    },
      {
        id: 2,
        author: 'Author2',
        title: 'title23',
        description: 'description2',
        url: 'url2',
        urlToImage: 'urlToImage2',
        content: 'content2',
        publishedAt: null
      }];

    expect(pipe.transform(news, 'title')).toEqual(news);
  });
});

