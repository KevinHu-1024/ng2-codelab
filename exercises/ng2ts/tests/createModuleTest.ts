import {TestBed} from '@angular/core/testing';
import {AppModule} from '../app.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import 'reflect-metadata';
let metadata;

beforeEach(() => {

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: []});
  try {
    metadata = Reflect.getMetadata('annotations', AppModule);
  } catch (e) {
    // Do nothing, we have assertions below for this case
  }
});

describe('Component', () => {
  it(`创建命名为 'AppModule' 的类并导出export`, () => {
    chai.expect(typeof AppModule).equals('function');
  });

  // TODO: check if the module is exported
  // See 1-bootstrap/0-component/Test.ts

  it('在该类上添加@NgModule装饰器', () => {
    chai.expect(metadata).is.not.undefined
  });

  it(`在@NgModule装饰器的'imports'属性中导入'BrowserModule' 模块`, () => {
    // TODO: Figure out if this is actually needed
    chai.expect(metadata[0].imports[0]).equals(BrowserModule);
  });

  it(`添加 'AppComponent' 到@NgModule装饰器的'declarations'属性中`, () => {
    chai.expect(metadata[0].declarations[0]).equals(AppComponent);
  });

  it(`添加'AppComponent' 到@NgModule装饰器的 'bootstrap'属性 `, () => {
    chai.expect(metadata[0].bootstrap[0]).equals(AppComponent);
  });
});

