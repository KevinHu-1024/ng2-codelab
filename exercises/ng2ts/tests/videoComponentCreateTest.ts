import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {VideoService} from '../video/video.service';
import {video_video_html} from '../code';
import {VideoComponent} from '../video/video.component';
import {Api} from '../api.service';
const video = Api.fetch('')[0];

beforeEach(() => {
  try {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [VideoService],
      declarations: [VideoComponent]
    });
    TestBed.overrideComponent(VideoComponent, {
      set: {
        template: video_video_html
      }
    });
    TestBed.compileComponents();
  } catch (e) {
    // whatever
  }
});

describe('组件集合', () => {
  describe('确保一些元素在相应位置', () => {
    it(`VideoComponent.ts: 添加组件@Component修饰符并设置selector属性为'my-video'`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `VideoComponent's selector has to be 'my-video'.`).equals('my-video')
    });

    it(`VideoComponent.ts: 在组件@Component修饰符中设置templateUrl属性为存在的html页面`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].templateUrl, `VideoComponent's的 templateUrl应该设置为 './video.html'`).matches(/\.\/video\.html/)
    });

    it(`VideoComponent.ts: 新增一个 video 属性 并用 @Input() 符号修饰`, () => {
      const metadata = Reflect.getMetadata('propMetadata', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
      chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
      chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
    });
  });


  describe('确保所有都显示正确', () => {
    let fixture;
    beforeEach(() => {
      fixture = TestBed.createComponent(VideoComponent);
      fixture.componentInstance.video = video;
      fixture.detectChanges();
    });

    it(`Video.html: 显示 video 对象的 title 属性`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
    });

    it(`Video.html: 显示 video 对象的 img 属性`, () => {
      const image = fixture.nativeElement.querySelector('img');
      chai.expect(image, `没有找到缩略图 `).is.not.null;
      chai.expect(image.getAttribute('ng-reflect-src')).equals(video.src);
    });

    it(`Video.html: 显示 video 对象的 description 属性`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.description);
    });



    it(`Video.html:显示 video 对象的 date 属性`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video date`).contains(video.date);
    });

    it(`Video.html:显示 video 对象的点赞量 likes`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video like`).contains(video.likes);
    });

    it(`Video.html: 显示 video 对象的浏览量 views`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.views);
    });
  });
});

