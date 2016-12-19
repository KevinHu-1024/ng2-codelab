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
  it(`app.html: 在<div>内部添加<h1>标签显示AppComponent组件的title属性`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h1');
    chai.expect(header, `没有发现h1标签`).is.not.null;
    chai.expect(header.innerHTML).contains('CatTube');
    fixture.componentInstance.title = 'SomethingElse';
    fixture.detectChanges();

    const header2 = fixture.nativeElement.querySelector('h1');
    chai.expect(header2.innerHTML, `Use the curly braces to put component title property in the header`).contains('SomethingElse');
  });

  it(`app.html: 添加<input>标签，设置'placeholder'属性为'video' (提示: 'placeholder' 只是input的属性标识) `, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    chai.expect(input, `没有发现inputs标签`).is.not.null;
    chai.expect(input.placeholder, `Input标签的placeholder属性应该包含'video'`).contains('video');
  });

  it(`app.html: 添加标签为'search'的按钮<button>`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    chai.expect(button, `没有发现按钮`).is.not.null;
    chai.expect(button.innerHTML.toLowerCase()).contains('search')
  });


});

