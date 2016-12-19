import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {video_video_html, thumbs_thumbs_html} from '../code';
import {AppModule} from '../app.module';
import {Api} from '../api.service';
import {ThumbsComponent} from '../thumbs/thumbs.component';
import {VideoComponent} from '../video/video.component';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [VideoComponent, ThumbsComponent]
  });

  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: video_video_html
    }
  });
  TestBed.overrideComponent(ThumbsComponent, {
    set: {
      template: thumbs_thumbs_html
    }
  });
  TestBed.compileComponents();
});

describe('组件集合', () => {
  it(`AppModule: 添加ThumbsComponent组件到AppModule的属性'declarations'中`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Thumbs component not found`).contains(ThumbsComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(VideoComponent);
  });

  it(`video.html: 在模板中使用thumbs component组件`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = Api.fetch('')[0];
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-up')).is.ok;
    chai.expect(fixture.nativeElement.querySelector('.thumbs-down')).is.ok;
  });

  it(`VideoComponent: 监听thumbs component的onThumbs事件,更新点赞量`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = Api.fetch('')[0];
    fixture.detectChanges();
    const likes = fixture.componentInstance.video.likes;
    // TODO: test it.
    fixture.nativeElement.querySelector('.thumbs-up').click();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-up'), 'Thumbs up component is not present').to.be.ok;
    chai.expect(fixture.componentInstance.video.likes).equals(likes + 1);
    fixture.nativeElement.querySelector('.thumbs-down').click();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-down'), 'Thumbs down component is not present').to.be.ok;
    chai.expect(fixture.componentInstance.video.likes).equals(likes);
  });
});

