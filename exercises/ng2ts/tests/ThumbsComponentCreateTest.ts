import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {thumbs_thumbs_html} from '../code';
import {Api} from '../api.service';
import {ThumbsComponent, Thumbs} from '../thumbs/thumbs.component';
const thumbs = Api.fetch('')[0];


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [ThumbsComponent]
  });

  TestBed.overrideComponent(ThumbsComponent, {
    set: {
      template: thumbs_thumbs_html
    }
  });
  TestBed.compileComponents();
});

describe('组件集合', () => {
  describe('保证前面的显示正常', () => {
    let fixture;
    beforeEach(() => {
      fixture = TestBed.createComponent(ThumbsComponent);
      fixture.detectChanges();
    });

    it(`thumbs.html: 添加一个包含'thumbs-up' CSS 样式的按钮.`, () => {
      chai.expect(fixture.nativeElement.querySelector('.thumbs-up'), `没有找到带 thumbs up类的按钮`).to.be.ok;
    });

    it(`thumbs.html: 添加一个包含'thumbs-down' CSS样式的按钮.`, () => {
      chai.expect(fixture.nativeElement.querySelector('.thumbs-down'), `没有找到带 thumbs down 类的按钮`).to.be.ok;
    });
  });

  describe('确保所有正常', () => {
    it(`ThumbsComponent.ts: 设置@Component装饰器的selector属性为'my-thumbs'.`, () => {
      const metadata = Reflect.getMetadata('annotations', ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `ThumbsComponent's selector has to be 'my-thumbs'.`).equals('my-thumbs')
    });

    it(`ThumbsComponent.ts: 设置@Component装饰器的templateUrl属性为html页面.`, () => {
      const metadata = Reflect.getMetadata('annotations', ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].templateUrl, `ThumbsComponent's的 templateUrl 应设置为 './thumbs.html'`).equals('./thumbs.html')
    });

    // TODO: split
    it(`ThumbsComponent.ts: 添加带@Output()装饰器的'onThumbs'属性，设置值为EventEmitter `, () => {
      const metadata = Reflect.getMetadata('propMetadata', ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have any @Outputs()'s`).is.not.undefined;
      chai.expect(Object.keys(metadata).length, `ThumbsComponent doesn't have any @Outputs()'s`).equals(1);
      chai.expect(metadata.onThumbs, `ThumbsComponent's @Outputs()' should be called onThumbs.`).is.not.undefined;
    });
  });

  describe('确保所有的显示都正确', () => {
    let fixture;
    beforeEach(() => {
      fixture = TestBed.createComponent(ThumbsComponent);
      fixture.detectChanges();
    });

    it(`thumbs.html: 'thumbs-up'按钮执行onThumbs事件.`, () => {
      let thumbs = null;
      fixture.componentInstance.onThumbs.subscribe((event) => {
        thumbs = event;
      });
      chai.expect(thumbs, `OnThumbs was called without pressing the button`).to.be.not.ok;
      fixture.nativeElement.querySelector('.thumbs-up').click();
      chai.expect(thumbs, `OnThumbs was not called when pressing the button with the 'thumbs-up' class.`).to.equal(Thumbs.UP);
    });

    it(`thumbs.html: Make the 'thumbs-down' button emit the onThumbs event with the correct thumbs ENUM value.`, () => {
      let thumbs = null;
      fixture.componentInstance.onThumbs.subscribe((event) => {
        thumbs = event;
      });
      chai.expect(thumbs, `OnThumbs was called without pressing the button`).to.be.not.ok;
      fixture.nativeElement.querySelector('.thumbs-down').click();
      chai.expect(thumbs, `OnThumbs was not called when pressing the button with the 'thumbs-down' class.`).to.equal(Thumbs.DOWN);
    });
  });
});

