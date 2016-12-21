import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../app.component';
import {VideoService} from '../video/video.service';
import {AppModule} from '../app.module';
import {app_html, app_component_ts} from '../code';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent]
  });
  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`VideoService.ts: 为VideoService对象添加注入 @Injectable()装饰器 `, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('parameters', VideoService);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata).not.undefined;
  });
  it(`Appmodule.ts: 将VideoService添加到NgModule装饰器的 providers 属性`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].providers[0]).equals(VideoService);
  });

  it(`AppComponent.ts:将videoService服务注入到组件的构造方法constructor中 `, () => {
    chai.expect(AppComponent.length, `组件的构造方法没有任何参数`).to.equal(1);
    chai.expect(app_component_ts).matches(/VideoService/)
  });

  it(`AppComponent.ts:在查找方法中search 调用 videoService.search 将结果返回给组件的 videos 属性`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    chai.expect(fixture.componentInstance.videos.length).to.equal(4);
  });


});

