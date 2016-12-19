import {TestBed} from '@angular/core/testing';
// Solution prefix will be stripped-out by the app
import {AppComponent, evalJs} from '../app.component';
import 'reflect-metadata';

let metadata;
beforeEach(() => {
  try {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({declarations: [AppComponent]});
    metadata = Reflect.getMetadata('annotations', AppComponent);
  } catch (e) {
    // Do nothing, we have assertions below for this case
  }
});

describe('Component', () => {
  it('创建命名为 AppComponent 的组件', () => {
    chai.expect(typeof evalJs('AppComponent')).equals('function');
  });

  it('为组件添加导出Export属性', () => {
    chai.expect(typeof AppComponent).equals('function');
  });

  it('添加组件@Component修饰符', () => {
    chai.expect(metadata).is.not.undefined
  });

  it('添加选择器selector到组件修饰符@Component中', () => {
    chai.expect(metadata[0].selector).equals('my-app');
  });

  it(`添加html模板到组件修饰符@Component中，如下内容: '<h1>Hello CatTube!</h1>'`, () => {
    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');
  });
});

