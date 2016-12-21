import {FuzzyPipe, evalJs} from '../fuzzy-pipe/fuzzy.pipe';
import 'reflect-metadata';

let metadata;
beforeEach(() => {
  try {
    metadata = Reflect.getMetadata('annotations', FuzzyPipe);
  } catch (e) {

  }
});

const d = new Date();
d.setDate(d.getDate() - 2);
const formattedDate = d.toISOString().slice(0, 10);


describe('Pipe', () => {
  it('创建名称为 FuzzyPipe 的类', () => {
    chai.expect(typeof evalJs('FuzzyPipe')).equals('function');
  });

  it('使用 export 语句导出此类', () => {
    chai.expect(typeof FuzzyPipe).equals('function');
  });

  it('为此类添加管道装饰器 @Pipe()', () => {
    chai.expect(metadata).is.an('array')
  });

  it('设置管道的名称为 fuzzy', () => {
    chai.expect(metadata[0].name).equals('fuzzy');
  });

  it(`确保日期参数为 ${formattedDate} 时, 输出为 “2 days”`, () => {
    let fuzzyTime = new FuzzyPipe();
    chai.expect(fuzzyTime.transform(d.toISOString().slice(0, 10)).toLowerCase()).equals('2 days');
  });
});

