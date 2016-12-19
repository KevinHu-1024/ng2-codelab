import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../app.component';
import {VideoService} from '../video/video.service';
import {app_html, video_video_html} from '../code';
import {AppModule} from '../app.module';
import {VideoComponent} from '../video/video.component';
import {Api} from '../api.service';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, VideoComponent]
  });
  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html
    }
  });
  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: video_video_html
    }
  });
  TestBed.compileComponents();
});

describe('Component tree', () => {
  it(`AppModule: 添加VideoComponent到AppModule的'declarations'属性`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Video component not found`).contains(VideoComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(AppComponent);
  });

  it(`app.html: 抛弃老的代码，使用新的video组件<my-video></my-video>`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.videos = Api.fetch('');
    // TODO: if the element is added, but the video prop is not present, this test will fail with
    // A useless message. Passing video prop should actually be tested in the next test, and this
    // Ane should pass.
    fixture.detectChanges();

    const myVideos = fixture.nativeElement.querySelectorAll('my-video');
    chai.expect(myVideos.length, `can't find any <my-video> elements in the app component`).is.greaterThan(0);
    chai.expect(myVideos.length, `There should be one my-video element for each element`).equals(fixture.componentInstance.videos.length);
  });

  it(`app.html: 将 video 对象数据绑定到 VideoComponent (记住要使用方括号)`, () => {
    let fixture = TestBed.createComponent(AppComponent);

    fixture.componentInstance.videos = Api.fetch('');

    fixture.detectChanges();

    const video = fixture.nativeElement.querySelector('my-video');
    chai.expect(video.getAttribute('ng-reflect-video')).equals('[object Object]');
  });
});

