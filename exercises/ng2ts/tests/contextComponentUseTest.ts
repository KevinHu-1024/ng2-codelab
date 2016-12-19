import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../app.component';
import {app_html, video_video_html, toggle_panel_toggle_panel_html, context_context_html, thumbs_thumbs_html} from '../code';
import {AppModule} from '../app.module';
import {VideoComponent} from '../video/video.component';
import {VideoService} from '../video/video.service';
import {TogglePanelComponent} from '../toggle-panel/toggle-panel.component';
import {ContextComponent} from '../context/context.component';
import {ContextService} from '../context/context.service';
import {Api} from '../api.service';
import {ThumbsComponent} from '../thumbs/thumbs.component';

function objectValues(object) {
  return Object.keys(object).reduce((result, key) => {
    result.push(object[key]);
    return result;
  }, []);
}

function objectFindPropOfType(object, Type) {
  return Object.keys(object).reduce((prop, key) => {
    if (prop) return prop;
    if (object[key] instanceof Type) return key;
  }, undefined);
}

function objectHasAn(object, Type) {
  return objectValues(object).some(val => val instanceof Type)
}

const sampleVideo = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService, ContextService, /* that's a hack, to provide parent component */ VideoComponent],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent, ThumbsComponent]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: app_html}});
  TestBed.overrideComponent(VideoComponent, {set: {template: video_video_html}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: toggle_panel_toggle_panel_html}});
  TestBed.overrideComponent(ContextComponent, {set: {template: context_context_html}});
  TestBed.overrideComponent(ThumbsComponent, {set: {template: thumbs_thumbs_html}});

  TestBed.compileComponents();
});

describe('Children', () => {
  it(`ContextComponent: 注入ContextService服务到构造方法 constructor 中，并将它作为属性保存.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, ContextService)).to.be.true;
  });

  it(`ContextComponent: 注入父类组件 (VideoComponent)到构造方法constructor中，并将它作为属性保存.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, VideoComponent)).to.be.true;
  });

  it(`ContextComponent: 为组件添加一个 ngOnInit 方法. (当组件创建的时候激活ngOnInit方法).`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(fixture.componentInstance.ngOnInit).is.a('function');
  });

  it(`ContextComponent: 在onOnInit方法中调用服务的 'getAdText' 方法, 并且通过注入的 videocomponent 组件的到 video的 'description'，将结果声明为文本属性.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    let componentInstance = fixture.componentInstance;

    let vcProp = objectFindPropOfType(componentInstance, VideoComponent);
    chai.expect(vcProp, `'VideoComponent' was not injected.`).to.not.be.undefined;

    componentInstance[vcProp].video = sampleVideo;
    chai.expect(componentInstance.ngOnInit).is.a('function');
    componentInstance[vcProp].video.description = 'music';
    componentInstance.ngOnInit();
    fixture.detectChanges();

    chai.expect(fixture.nativeElement.innerHTML).to.contain('speakers');

    componentInstance[vcProp].video.description = 'banana';
    componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('Check out our web site');
  });

  it(`AppModule: 添加ContextComponent到AppModule的declarations属性中 (此步略过).`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Video component not found`).contains(ContextComponent);
  });

  it(`video.html: 显示真实的广告 (此步略过).`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // TODO: Actually write a test
    //chai.expect(fixture.nativeElement.querySelector('my-ad')).to.be.ok
  });
});

