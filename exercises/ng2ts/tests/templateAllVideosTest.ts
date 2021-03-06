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
  it(`AppComponent.ts: 当查找 'search'方法被调用时，过滤FAKE_VIDEOS中的视频，筛选出标题（title）与搜索字符串相匹配的video， 
  并将结果集赋值给 组件的'videos'属性。`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    chai.expect(fixture.componentInstance.videos.length, '应该有2只小猫').equals(2);
    fixture.componentInstance.search('cat');
    chai.expect(fixture.componentInstance.videos.length, '至少有1只猫').equals(1);
    fixture.componentInstance.search('dog');
    chai.expect(fixture.componentInstance.videos.length, '没有狗').equals(0);
  });

  it(`app.html: 使用 “*NgFor” 渲染结果列表，并且显示所有的对象的 title 属性`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[1].title);

    fixture.componentInstance.search('cat');
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).contains(fixture.componentInstance.videos[0].title);
  });

  it(`app.html: 同时，它需要显示一个缩略图（用img标签显示video对象的 src ）`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.search('itten');
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(2);
    chai.expect(images[1].getAttribute('ng-reflect-src')).equals(fixture.componentInstance.videos[1].src);
    chai.expect(images[0].getAttribute('ng-reflect-src')).equals(fixture.componentInstance.videos[0].src);
  });

  // it(`#Bonus app.html: Make hitting enter work in the input trigger the search`, () => {
  //   //TODO
  // });

  it(`更进一步：AppComponent.ts: 组件创建时触发一个空字符串参数的查找 search. `, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    chai.expect(images.length).equals(3);
  });
});

