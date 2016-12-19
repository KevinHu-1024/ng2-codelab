import {TestBed} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import 'initTestBed';
import {app_html} from '../code';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [AppComponent]});

  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`AppComponent.ts: 添加'videos'属性，赋值为空的数组.`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    chai.expect(fixture.componentInstance.videos, `组件没有申明videos属性`).is.not.undefined;
    chai.expect(fixture.componentInstance.videos, `组件声明的Videos属性不是数组.`).is.an('array');
  });

  it(`AppComponent.ts: 为组件添加带字符串参数searchString的查找'search'方法`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    chai.expect(fixture.componentInstance.search, `查找Search方法必须是个函数`).is.a('function');
    chai.expect(fixture.componentInstance.search.length, `查找Search方法必须有一个参数`).equals(1);
  });

  it(`app.html: 为button按钮添加单击click事件, 调用'search'方法，把input中的值作为参数 
      (在下节练习中将改进这个查找函数)`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const button = fixture.nativeElement.querySelector('button');


    function testSearch(searchString) {
      let passedValue = undefined;
      let called = false;
      fixture.componentInstance.search = function (value) {
        called = true;
        passedValue = value;
      };

      input.value = searchString;
      button.click();
      chai.expect(called, `单点击查找search button按钮时调用Search函数`).equals(true);
      chai.expect(passedValue, `Input输入的值有错误，search函数无法调用`).equals(input.value)
    }

    testSearch('Awesome kittens');
    testSearch('Other value');
  });

  it(`app.html: 添加一个只有在 videos数组为空时显示的信息'No videos'，`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.videos = [];
    chai.expect(fixture.nativeElement.innerHTML.toLowerCase()).contains('no videos');

    fixture.componentInstance.videos = [{title: 'Hi', src: 'Test'}];

    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML.toLowerCase()).not.contains('no videos');
  });


});

