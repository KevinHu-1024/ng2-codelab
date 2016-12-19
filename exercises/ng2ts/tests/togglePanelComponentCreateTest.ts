import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import 'initTestBed';
import {toggle_panel_toggle_panel_html} from '../code';
import {TogglePanelComponent} from '../toggle-panel/toggle-panel.component';
import {WrapperComponent} from '../wrapper.component';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [TogglePanelComponent, WrapperComponent]
  });

  TestBed.overrideComponent(TogglePanelComponent, {
    set: {
      template: toggle_panel_toggle_panel_html
    }
  });
  TestBed.compileComponents();
});

describe('内容突出', () => {
  it(`TogglePanelComponent.ts: 我们已经为您添加好模板和选择器!`, () => {
  });

  it(`TogglePanelComponent.ts: 在组件添加一个有默认值的布尔型的属性，名字随意（例如showDescription）.`, () => {
    let fixture = TestBed.createComponent(TogglePanelComponent);
    // the intent is to let them come up with the property name, so we assume there will be one.
    const props = Object.keys(fixture.componentInstance);

    chai.expect(props.length, `A property with a default value was not declared on the component.`).is.not.equal(0);
    chai.expect(props.length, `Too many properties were declared.`).is.not.greaterThan(1);
    const prop = props[0];
    chai.expect(fixture.componentInstance[prop], `Property '${prop}' is not of type boolean`).is.a('boolean');
    chai.expect(fixture.componentInstance[prop], `Property '${prop}' must have a default value`).is.not.undefined;
  });

  it(`togglePanel.html: 当showDescription为真时.description就突出显示.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null;
  });

  it(`togglePanel.html: 添加一个按钮来显示额外的信息`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let buttons = fixture.nativeElement.querySelectorAll('button');
    chai.expect(buttons.length, `Should show exactly one button`).to.equals(1);
  });

  it(`togglePanel.html:点击额外信息按钮时, 只显示类为 '.extra'的选择器，同时变更showDescription值.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be hidden`).is.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be displayed`).not.null;
  });

  it(`togglePanel.html: 添加一个返回到描述description的按钮`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null;
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null;
  });
});

