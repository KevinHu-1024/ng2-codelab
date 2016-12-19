/**
 * This is a good sample sample of a codelab exercise.
 *
 * An exercise is just a folder with a bunch of files.
 *
 * the configuration is in app/codelab/codelab-config.ts.
 *
 *
 * There are
 *
 */
/**
 * solution/ prefix is used to let the test typechecked.
 * It will be stripped during runtime, and the Codelab module
 * will be loaded.
 */
import {Codelab, evalJs} from '../typescript-intro/Codelab';
/**
 * In the test we get the access to the actual sourcecode
 * I'd try not to overuse it
 */
import * as code from '../code';

const guests = [
  {name: 'me', coming: true},
  {name: 'notme', coming: false},
];

describe('Component', () => {
  it(`创建'Codelab'类`, () => {
    /**
     * We can use evalJs to get into the scope of the user's file.
     * Currently evalJs has to be manually added to the `before`
     * section in the file config.
     *
     * I expert the primary use case for eval js would be to remind
     * the user to export something.
     *
     * e.g. if the user created teh class, but haven't exported it this
     * test will still pass.
     */
    chai.expect(typeof evalJs('Codelab')).equals('function');
  });

  it(`为类增加导出头Export`, () => {
    /**
     * Require the class, assert it's a function (compile target is es5).
     */
    chai.expect(typeof Codelab).equals('function');
  });

  it('为类添加构造方法constructor', () => {
    /**
     * Fancy: Require the actual source code, and search in it.
     */
    chai.expect(code.typescript_intro_Codelab_ts.indexOf('constructor') > -1, `类codelab没有构造方法constuctor`).is.true;
  });

  it(`确保构造方法constructor中带'guests'参数，该参数是Guest数组`, () => {
    chai.expect(Codelab.length, `Codelab类的构造方法constructor必须有一个'guests'参数！`).equals(1);
  });

  it('guests参数应该是public范围', () => {
    const codelab = new Codelab(guests);
    chai.expect(codelab.guests).equals(guests);
  });

  it(`创建一个新的'getGuestsComing'方法`, () => {
    chai.expect(typeof (new Codelab(guests).getGuestsComing)).equals('function');
  });

  it(`在getGuestsComing 方法中实现只返回coming属性为true的Guest对象. 
  (提示: 请使用Array.filter方法,不要用循环.假如您不知道如何做就请求我们帮助
   (否则有可能形成死循环)`, () => {
    chai.expect(new Codelab(guests).getGuestsComing().length).equals(1);
  });

  /*
   xit(`Let's debug the app! You'll need this if something goes wrong.
   * Open the dev tools in your browser
   * Put in the new method add 'debugger;'
   * The app will stop, and you'll be able to inspect local variables.
   * Get out using F8
   * We can't really test this, so this test is marked as passed
   `, () => {

   });
   */
});

