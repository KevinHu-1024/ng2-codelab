import {CodelabState} from '../src/app/codelab-config';
import {FileConfig} from '../src/app/file-config';
import {differ} from '../src/app/differ/differ';
import {Injectable} from '@angular/core';

@Injectable()
export class CodelabConfigService {
  public config: CodelabState;

  constructor() {
    function testFile(path = 'Test.ts', code?) {
      return {
        path,
        moduleName: path.replace('ts', ''),
        type: 'typescript',
        excludeFromTesting: false,
        test: true,
        bootstrap: true,
        before: 'mochaBefore();',
        after: 'mochaAfter();',
        hidden: true,
        code
      };
    }

    function hidden(...files: FileConfig[]): FileConfig[] {
      return files.map(file => Object.assign({}, file, {hidden: true}))
    }

    function readOnly(...files: FileConfig[]): FileConfig[] {
      return files.map(file => Object.assign({}, file, {readonly: true}))
    }

    function justForReference(...files: FileConfig[]): FileConfig[] {
      return collapsed(...readOnly(...files));
    }

    function collapsed(...files: FileConfig[]): FileConfig[] {
      return files.map(file => Object.assign({}, file, {collapsed: true}))
    }


    function evaled(file) {
      return Object.assign(file, {
        after: `
    export function evalJs( js ){
      return eval(js);
    }
`
      });
    }


    function mapObject(object, callback) {
      return Object.keys(object).reduce((result, key) => {
        result[key] = callback(object[key]);
        return result;
      }, {});
    }

    function newHtmlFile(name, code) {
      return {
        path: name + '.html',
        moduleName: name,
        code,
        type: 'html'
      }
    }

    function newTsFile(name, code) {
      const bootstrap = name.toLowerCase().indexOf('main') >= 0;
      return {
        bootstrap: bootstrap,
        excludeFromTesting: bootstrap,
        path: name + '.ts',
        moduleName: name,
        code,
        type: 'typescript'
      }
    }


    const commits = [
      'codelab',
      'codelabSolved',
      'createComponent',
      'createComponentSolved',
      'createModule',
      'createModuleSolved',
      'bootstrap',
      'bootstrapSolved',
      'templatePageSetup',
      'templatePageSetupSolved',
      'templateAddAction',
      'templateAddActionSolved',
      'templateAllVideos',
      'templateAllVideosSolved',
      'diInjectService',
      'diInjectServiceSolved',
      'dataBinding',
      'dataBindingSolved',
      'videoComponentCreate',
      'videoComponentCreateSolved',
      'videoComponentUse',
      'videoComponentUseSolved',
      'thumbsComponentCreate',
      'thumbsComponentCreateSolved',
      'thumbsComponentUse',
      'thumbsComponentUseSolved',
      'togglePanelComponentCreate',
      'togglePanelComponentCreateSolved',
      'togglePanelComponentUse',
      'togglePanelComponentUseSolved',
      'contextComponentUse',
      'contextComponentUseSolved',
      'fuzzyPipeCreate',
      'fuzzyPipeCreateSolved',
      'fuzzyPipeUse',
      'fuzzyPipeUseSolved',
      'neverShow'
    ];
    interface Versions {
      codelab: FileConfig,
      codelabSolved: FileConfig,
      createComponent: FileConfig,
      createComponentSolved: FileConfig,
      createModule: FileConfig,
      createModuleSolved: FileConfig,
      bootstrap: FileConfig,
      bootstrapSolved: FileConfig,
      templatePageSetup: FileConfig,
      templatePageSetupSolved: FileConfig,
      templateAddAction: FileConfig,
      templateAddActionSolved: FileConfig,
      templateAllVideos: FileConfig,
      templateAllVideosSolved: FileConfig,
      diInjectService: FileConfig,
      diInjectServiceSolved: FileConfig,
      dataBinding: FileConfig,
      dataBindingSolved: FileConfig,
      videoComponentCreate: FileConfig,
      videoComponentCreateSolved: FileConfig,
      videoComponentUse: FileConfig,
      videoComponentUseSolved: FileConfig,
      thumbsComponentCreate: FileConfig,
      thumbsComponentCreateSolved: FileConfig,
      thumbsComponentUse: FileConfig,
      thumbsComponentUseSolved: FileConfig,
      togglePanelComponentCreate: FileConfig,
      togglePanelComponentCreateSolved: FileConfig,
      togglePanelComponentUse: FileConfig,
      togglePanelComponentUseSolved: FileConfig,
      contextComponentUse: FileConfig,
      contextComponentUseSolved: FileConfig,
      fuzzyPipeCreate: FileConfig,
      fuzzyPipeCreateSolved: FileConfig
      fuzzyPipeUse: FileConfig,
      fuzzyPipeUseSolved: FileConfig,
    }

    function loadFile(name, code) {
      const result = differ(code, commits);
      if (name.includes('.ts')) {
        name = name.replace('.ts', '');
        return mapObject(result, (code) => newTsFile(name, code)) as Versions;
      }
      if (name.includes('.html')) {
        name = name.replace('.html', '');
        return mapObject(result, (code) => newHtmlFile(name, code)) as Versions;
      }
    }

    const files = {
      test: loadFile('app.component.ts', require('!raw!./ng2ts/app.component.ts')),
      appComponent: loadFile('app.component.ts', require('!raw!./ng2ts/app.component.ts')),
      appModule: loadFile('app.module.ts', require('!raw!./ng2ts/app.module.ts')),
      appHtml: loadFile('app.html', require('!raw!./ng2ts/app.html')),
      bootstrap: loadFile('main.ts', require('!raw!./ng2ts/main.ts')),
      //daloadFile(taBinding: 'data-binding/DataBinding', require('!raw!./ng2ts/aBinding: 'data-binding/DataBinding')),
      videoItem: loadFile('video/video-item.ts', require('!raw!./ng2ts/video/video-item.ts')),
      api: loadFile('api.service.ts', require('!raw!./ng2ts/api.service.ts')),
      videoService: loadFile('video/video.service.ts', require('!raw!./ng2ts/video/video.service.ts')),
      videoHtml: loadFile('video/video.html', require('!raw!./ng2ts/video/video.html')),
      videoComponent: loadFile('video/video.component.ts', require('!raw!./ng2ts/video/video.component.ts')),
      thumbsComponent: loadFile('thumbs/thumbs.component.ts', require('!raw!./ng2ts/thumbs/thumbs.component.ts')),
      thumbsHtml: loadFile('thumbs/thumbs.html', require('!raw!./ng2ts/thumbs/thumbs.html')),
      togglePanelHtml: loadFile('toggle-panel/toggle-panel.html', require('!raw!./ng2ts/toggle-panel/toggle-panel.html')),
      togglePanelComponent: loadFile('toggle-panel/toggle-panel.component.ts', require('!raw!./ng2ts/toggle-panel/toggle-panel.component.ts')),
      wrapperComponent: loadFile('wrapper.component.ts', require('!raw!./ng2ts/wrapper.component.ts')),
      contextComponent: loadFile('context/context.component.ts', require('!raw!./ng2ts/context/context.component.ts')),
      contextService: loadFile('context/context.service.ts', require('!raw!./ng2ts/context/context.service.ts')),
      codelab: loadFile('typescript-intro/Codelab.ts', require('!raw!./ng2ts/typescript-intro/Codelab.ts')),
      mainCodelab: loadFile('typescript-intro/Main.ts', require('!raw!./ng2ts/typescript-intro/Main.ts')),
      guest: loadFile('typescript-intro/Guest.ts', require('!raw!./ng2ts/typescript-intro/Guest.ts')),
      fuzzyPipe: loadFile('fuzzy-pipe/fuzzy.pipe.ts', require('!raw!./ng2ts/fuzzy-pipe/fuzzy.pipe.ts')),
    };


    // Too hard to use diff comments for this, so I'm replacing the whole file
    files.appModule.thumbsComponentCreate = newTsFile('app.module', require(`!raw!./ng2ts/thumbs.app.module.ts`));
    files.appModule.togglePanelComponentCreate = newTsFile('app.module', require(`!raw!./ng2ts/toggle-panel.app.module.ts`));
    files.test.codelab = testFile('typescript-intro/Test', require(`!raw!./ng2ts/tests/codelabTest.ts`));
    files.test.createComponent = testFile('createComponent/Test', require(`!raw!./ng2ts/tests/createComponentTest.ts`));
    files.test.createModule = testFile('createModule/Test', require(`!raw!./ng2ts/tests/createModuleTest.ts`));
    files.test.bootstrap = testFile('bootstrap/Test', require(`!raw!./ng2ts/tests/bootstrapTest.ts`));
    files.test.templatePageSetup = testFile('templatePageSetup/Test', require(`!raw!./ng2ts/tests/templatePageSetupTest.ts`));
    files.test.templateAddAction = testFile('templateAddAction/Test', require(`!raw!./ng2ts/tests/templateAddActionTest.ts`));
    files.test.templateAllVideos = testFile('templateAllVideos/Test', require(`!raw!./ng2ts/tests/templateAllVideosTest.ts`));
    files.test.diInjectService = testFile('diInjectService/Test', require(`!raw!./ng2ts/tests/diInjectServiceTest.ts`));
    files.test.videoComponentCreate = testFile('videoComponentCreate/Test', require(`!raw!./ng2ts/tests/videoComponentCreateTest.ts`));
    files.test.videoComponentUse = testFile('videoComponentUse/Test', require(`!raw!./ng2ts/tests/videoComponentUseTest.ts`));
    files.test.thumbsComponentCreate = testFile('thumbs/ThumbsComponentCreateTest', require(`!raw!./ng2ts/tests/ThumbsComponentCreateTest.ts`));
    files.test.thumbsComponentUse = testFile('thumbs/ThumbsComponentUseTest', require(`!raw!./ng2ts/tests/ThumbsComponentUseTest.ts`));
    files.test.togglePanelComponentCreate = testFile('togglePanelComponentCreate/Test', require(`!raw!./ng2ts/tests/togglePanelComponentCreateTest.ts`));
    files.test.togglePanelComponentUse = testFile('togglePanelComponentUse/Test', require(`!raw!./ng2ts/tests/togglePanelComponentUseTest.ts`));
    files.test.contextComponentUse = testFile('contextComponentUse/Test', require(`!raw!./ng2ts/tests/contextComponentUseTest.ts`));
    files.test.fuzzyPipeCreate = testFile('fuzzyPipeCreate/Test', require(`!raw!./ng2ts/tests/fuzzyPipeCreateTest.ts`));
    files.test.fuzzyPipeUse = testFile('fuzzyPipeUse/Test', require(`!raw!./ng2ts/tests/fuzzyPipeUseTest.ts`));

    this.config = {
      name: 'Angular2实验教程',
      selectedMilestoneIndex: 0,
      milestones: [
        {
          name: 'TypeScript概述',
          selectedExerciseIndex: 0,
          exercises: [
            {
              name: '概述',
              description: `
          <h1>欢迎使用Angular2和TypeScript教程!</h1>
          <p>在本教程中我们将学习TypeScript和Angular2的基础知识.</p>
          <p>本教程使用的Angular是2.1.0版本</p>
          <p>您可以从下面的链接找到相应的英文原版PPt(暂未翻译)
          <a href = "https://docs.google.com/presentation/d/1Wh4ZwTKG1h66f3mTD4GQO8rKwGDEJeBSvUDJ3udU1LA/edit?usp=sharing">PPT链接</a>.</p>                 
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `开始吧`
            },
            {
              name: 'Typescript语法介绍',
              description: `
          <p>首先在我们创建的TypeScript文件中(注意：TypeScript文件后缀为.ts)添加一个Codelab类
           </p>
          
          <p>在当前TypeScript文件中有一个guests常量数组, 包含一个返回“谁将会来了”的 'getGuestsComing' 方法</p> 
          <p>在 'Main.ts' 有4个人准备来, 但是Charles Darwin在最后却决定不来了, 
          所以只有3个人能够来.</p>            
        `,
              solutions: [
                files.codelab.codelabSolved
              ],
              fileTemplates: [
                evaled(files.codelab.codelab),
                files.guest.codelab,
                files.mainCodelab.codelab,
                files.test.codelab
              ]
            }
          ]
        },
        {
          name: '开始您的程序',
          selectedExerciseIndex: 0,
          exercises: [
            {
              name: '概述',
              description: `
          <h1>编写您的第一个Angular2程序!</h1>
          <p>如下图：</p>

          <div class = "inBrowser">
            <div class="smaller">
              <h1>Hello CatTube!</h1>
            </div>
          </div>
          <p>三步曲: </p>
          <ol>
            <li>创建组件</li>
            <li>创建NgModule</li>
            <li>启动程序</li>
          </ol>
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `准备就绪,开始吧!`
            },
            {
              name: '创建组件',
              description: `
            <p>创建第一个组件!</p>`,
              solutions: [
                files.appComponent.createComponentSolved
              ],
              fileTemplates: [
                evaled(files.appComponent.createComponent),
                ...hidden(
                  files.appModule.createModuleSolved,
                  files.bootstrap.bootstrapSolved
                ),
                files.test.createComponent
              ]
            }, {
              name: '创建NgModule',
              description: `当组件创建完成后，我们需要创建 NgModule.`,
              solutions: [
                files.appModule.createModuleSolved
              ],
              fileTemplates: [
                files.appModule.createModule,
                ...justForReference(
                  files.appComponent.createModule
                ),
                ...hidden(
                  files.bootstrap.bootstrapSolved
                ),
                files.test.createModule
              ]
            },
            {
              name: '启动程序',
              skipTests: true,
              description: `
          <p>创建好组件和NgModule后，我们就可以通过bootstrap启动程序!</p>
          <p>此处没有太好的测试方法，所以我们只能让程序显示 'Hello CatTube!'</p>`,
              solutions: [
                files.bootstrap.bootstrapSolved
              ],
              fileTemplates: [
                files.bootstrap.bootstrap,
                ...justForReference(
                  files.appComponent.bootstrap,
                  files.appModule.bootstrap
                ),
                files.test.bootstrap
              ]
            }
          ]
        },
        {
          name: '模板',
          selectedExerciseIndex: 0,
          exercises: [
            {
              name: '概述',
              description: `
          <h1>了解Angular的模板!</h1>
          <p>如下图.</p>
          
          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>CatTube</h1>              
                <button>Search!</button>
                <div>
                  <h2>Cute kitten</h2>
                  <img src="/assets/images/cat-0.png">
                </div><div>
                  <h2>Kitten on the tree</h2>
                  <img src="/assets/images/cat-1.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img src="/assets/images/cat-2.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `I'm a ready, let's start!`
            },
            {
              name: '创建页面',
              description: `在组件中加入一个header标签, 一个input文本框和一个查找按钮button !`,
              solutions: [
                files.appHtml.templatePageSetupSolved
              ],
              fileTemplates: [
                files.appHtml.templatePageSetup,
                ...justForReference(
                  files.appComponent.templatePageSetup,
                  files.appModule.templatePageSetup,
                  files.bootstrap.templatePageSetup,
                ),
                files.test.templatePageSetup
              ],
              tests: []
            }, {
              name: '添加事件',
              description: `主要做以下2件事情: 
              <ul>
              <li>在AppComponent中添加一个查找方法</li>
              <li>当video对象为空时，进行适当提示</li>`,
              solutions: [
                files.appHtml.templateAddActionSolved,
                files.appComponent.templateAddActionSolved,
              ],
              fileTemplates: [
                files.appComponent.templateAddAction,
                files.appHtml.templateAddAction,
                ...justForReference(
                  files.videoItem.templateAddAction,
                  files.appModule.templateAddAction,
                  files.bootstrap.templateAddAction,
                ),
                files.test.templateAddAction
              ],
              tests: []
            }, {
              name: '展示所有videos',
              description: `循环显示所有videos.`,
              solutions: [
                files.appComponent.templateAllVideosSolved,
                files.appHtml.templateAllVideosSolved,
              ],
              fileTemplates: [
                files.appComponent.templateAllVideos,
                files.appHtml.templateAllVideos,
                ...justForReference(
                  files.videoItem.templateAddAction,
                  files.appModule.templateAllVideos,
                  files.bootstrap.templateAllVideos,
                ),
                files.test.templateAllVideos
              ],
              tests: []
            }
          ]
        },
        {
          name: '依赖注入',
          selectedExerciseIndex: 0,
          exercises: [{
            name: '概述',
            description: `
          <h1>开始注入服务.</h1>
          <p>使用服务好处是减少硬编码的耦合性，无需在对象中new引用的对象，并且我们能及时获得更多数据.</p>
          
          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>CatTube</h1>
                <input placeholder="video" type="text">
                <button>Search!</button>
                <div>
                  <h2>Cute kitten</h2>
                  <img  src="/assets/images/cat-0.png">
                </div><div>
                  <h2>Kitten on the tree</h2>
                  <img  src="/assets/images/cat-1.jpg">
                </div><div>
                  <h2>More kitten</h2>
                  <img  src="/assets/images/cat-2.jpg">
                </div><div>
                  <h2>Another kitten</h2>
                  <img  src="/assets/images/cat-3.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img  src="/assets/images/cat-4.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img  src="/assets/images/cat-5.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img  src="/assets/images/cat-6.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`
          }, {
            name: '服务注入',
            description: `
          用服务来替代硬编码循（如：videos=new videos()）环数据集videos.
        `,
            solutions: [
              files.videoService.diInjectServiceSolved,
              files.appModule.diInjectServiceSolved,
              files.appComponent.diInjectServiceSolved,
            ],
            fileTemplates: [
              files.videoService.diInjectService,
              files.appModule.diInjectService,
              files.appComponent.diInjectService,
              ...justForReference(
                files.appHtml.diInjectService,
                files.videoItem.diInjectService,
                files.api.diInjectService,
                files.bootstrap.diInjectService,
              ),
              files.test.diInjectService
            ],
            tests: []
          }]
        },
        {
          name: '组件集合',
          selectedExerciseIndex: 0,
          exercises: [
            {
              name: '概述',
              description: `
          <h1>创建一个Video组件!</h1>
          <p>用Video的对象创建一个独立的组件.</p>
          <p>为组件添加描述description, 浏览量Views和点赞量likes. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img  src="/assets/images/cat-0.png">
                  <div>Date 2016-11-25</div>
                  <div>Views 100</div>
                  <div>Likes 20</div>
                  <div>Description todo</div>
                </div>
              </div>
            </div>          
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `I'm a ready, let's start!`
            },
            /*{

             name: 'Data binding',
             description: `<p>This is a bonus exercise, meant to illustrate passing the data from
             parent component to the child component </p>
             `,
             solutions: [
             files.dataBinding.dataBindingSolved,
             ],
             fileTemplates: [
             files.dataBinding.dataBinding,
             files.appModule.dataBinding,
             files.bootstrap.dataBinding,
             ...hidden({
             path: 'index.html',
             moduleName: 'index',
             code: '<my-flag></my-flag>',
             type: 'html'
             })
             // testFile()
             ],
             tests: []
             }, */{

              name: '创建Video组件',
              description: `创建一个 video component.`,
              solutions: [
                files.videoHtml.videoComponentCreateSolved,
                files.videoComponent.videoComponentCreateSolved,
              ],
              fileTemplates: [
                files.videoComponent.videoComponentCreate,
                files.videoHtml.videoComponentCreate,
                ...justForReference(
                  files.appModule.videoComponentCreate,
                  files.videoService.videoComponentCreate,
                  files.appHtml.videoComponentCreate,
                  files.appComponent.videoComponentCreate,
                  files.videoItem.videoComponentCreate,
                  files.api.videoComponentCreate,
                  files.bootstrap.videoComponentCreate,
                ),
                files.test.videoComponentCreate
              ],
              tests: []
            },
            {
              name: '使用Video组件',
              description: `在程序中使用Video组件.`,
              solutions: [
                files.appModule.videoComponentUseSolved,
                files.appHtml.videoComponentUseSolved,
              ],
              fileTemplates: [
                files.appModule.videoComponentUse,
                files.appHtml.videoComponentUse,
                ...justForReference(
                  files.videoHtml.videoComponentUse,
                  files.videoComponent.videoComponentUse,
                  files.appComponent.videoComponentUse,
                  files.videoService.videoComponentUse,
                  files.videoItem.videoComponentUse,
                  files.api.videoComponentUse,
                  files.bootstrap.videoComponentUse
                ),
                files.test.videoComponentUse
              ],
              tests: []
            }]
        }, {
          name: '自定义事件',
          selectedExerciseIndex: 0,
          exercises: [
            {
              name: '概述',
              description: `
          <h1>使用自定义事件!</h1>
          <p>添加一个可以触发'onThumbs'事件的ThumbsComponent组件 </p>
          <p>video组件将监听ThumbsComponent组件的onThumbs事件来改变点赞量.</p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img  src="/assets/images/cat-0.png">
                  <div>Date 2016-11-25</div>
                  <div>Views 100</div>
                  <div>Likes 20</div>
                  <div>Description todo</div>
                  <button>Thumbs Up</button> <button>Thumbs Down</button>
                </div>
              </div>
            </div>          
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `I'm a ready, let's start!`
            },
            {
              name: '创建ThumbsComponent组件',
              description: `创建一个小组件ThumbsComponent.`,
              solutions: [
                files.thumbsHtml.thumbsComponentCreateSolved,
                files.thumbsComponent.thumbsComponentCreateSolved,
              ],
              fileTemplates: [
                files.thumbsHtml.thumbsComponentCreate,
                files.thumbsComponent.thumbsComponentCreate,
                ...justForReference(
                  files.api.thumbsComponentCreate,
                  files.appModule.thumbsComponentCreate,
                  files.bootstrap.thumbsComponentCreate,
                ),
                files.test.thumbsComponentCreate,
                ...hidden({
                    path: 'index.html',
                    moduleName: 'index',
                    code: '<my-thumbs></my-thumbs>',
                    type: 'html'
                  },
                )
              ],
              tests: []
            },
            {
              name: '使用ThumbsComponent组件',
              description: `在程序中使用'ThumbsComponent'组件`,
              solutions: [
                files.appModule.thumbsComponentUseSolved,
                files.videoHtml.thumbsComponentUseSolved,
                files.videoComponent.thumbsComponentUseSolved
              ],
              fileTemplates: [
                files.videoHtml.thumbsComponentUse,
                files.videoComponent.thumbsComponentUse,
                files.appModule.thumbsComponentUse,
                ...justForReference(
                  files.thumbsHtml.thumbsComponentUse,
                  files.thumbsComponent.thumbsComponentUse,
                  files.appHtml.thumbsComponentUse,
                  files.appComponent.thumbsComponentUse,
                  files.videoService.thumbsComponentUse,
                  files.videoItem.thumbsComponentUse,
                  files.api.thumbsComponentUse,
                  files.bootstrap.thumbsComponentUse,
                ),
                files.test.thumbsComponentUse,
              ],
              tests: []
            }]
        }, {
          name: '突出展示',
          selectedExerciseIndex: 0,
          exercises: [

            {
              name: '概述',
              description: `
          <h1>突出展示内容!</h1>
          <p>在本节我们创建一个命名为'TogglePanel'的组件</p>
          <p>这个组件实际上有2个div，但是我们每次始终只显示一个div. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img src="/assets/images/cat-0.png">            
                  <div>This is the description. Once you click 'show meta' button it will be gone.  (please don't try clicking it here, I'm just a screenshot)</div>
                  <div>[Show meta]</div>
                  <button>Thumbs Up</button> <button>Thumbs Down</button>
                </div>
              </div>
            </div>               
              
            <p>当我们点击'Show meta'按钮，描述div被隐藏，点赞和浏览div显示.</p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img  src="/assets/images/cat-0.png">            
                  <div>Likes: 1000</div>
                  <div>Views: 1000000</div>
                  <div>[Show description]</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                </div>
              </div>
            </div>          
        `,
              fileTemplates: [],
              tests: [],
              messageNext: `I'm a ready, let's start!`
            },
            {
              name: '添加可折叠面板组件TogglePanelComponent',
              description: `使用内容突出展示创建一个可以在描述div和点赞/浏览div之间切换的组件. `,
              solutions: [
                files.togglePanelHtml.togglePanelComponentCreateSolved,
                files.togglePanelComponent.togglePanelComponentCreateSolved,
              ],
              fileTemplates: [
                files.togglePanelComponent.togglePanelComponentCreate,
                files.togglePanelHtml.togglePanelComponentCreate,
                ...justForReference(
                  files.wrapperComponent.togglePanelComponentCreate,
                  files.appModule.togglePanelComponentCreate,
                  {
                    path: 'index.html',
                    code: '<my-wrapper></my-wrapper>',
                    type: 'html',
                    moduleName: 'index'
                  },
                  files.bootstrap.togglePanelComponentCreate,
                ),
                files.test.togglePanelComponentCreate
              ],
              tests: []
            },
            {
              name: '使用折叠面板组件TogglePanelComponent',
              description: `现在我们开始使用该组件.`,
              solutions: [
                files.appModule.togglePanelComponentUseSolved,
                files.videoHtml.togglePanelComponentUseSolved
              ],
              fileTemplates: [
                files.appModule.togglePanelComponentUse,
                files.videoHtml.togglePanelComponentUse,
                ...justForReference(
                  files.videoComponent.togglePanelComponentUse,
                  files.togglePanelHtml.togglePanelComponentUse,
                  files.togglePanelComponent.togglePanelComponentUse,
                  files.appHtml.togglePanelComponentUse,
                  files.appComponent.togglePanelComponentUse,
                  files.videoService.togglePanelComponentUse,
                  files.videoItem.togglePanelComponentUse,
                  files.api.togglePanelComponentUse,
                  files.thumbsHtml.togglePanelComponentUse,
                  files.thumbsComponent.togglePanelComponentUse,
                  files.bootstrap.togglePanelComponentUse,
                ),
                files.test.togglePanelComponentUse
              ],
              tests: []
            }]
        },
        {
          name: '父类容器',
          selectedExerciseIndex: 0,
          exercises: [{
            name: '概述',
            description: `
          <h1>现在注入父类组件!</h1>
          <p>在这节我们将创建一个上下文的广告组件ContextAdComponent. </p>
          <p>这个组件直接用VideoComponent组件做为父类组件代替input属性. </p>
          <p>假如描述description中包括music串的话，它会显示不同的内容. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten dancing</h2>
                  <img  src="/assets/images/cat-0.png">            
                  <div>Decription: music</div>
                  <button>Show meta</button>
                  <button>Thumbs Up</button> <button>Thumbs Down</button>
                  <div>Context ad: Turn up your speakers</div>                  
                </div>
                <div>
                  <h2>Cute kitten sleeping</h2>
                  <img  src="/assets/images/cat-0.png">            
                  <div>Decription: sleeping</div>
                  <button>Show meta</button>
                  <button>Thumbs Up</button> <button>Thumbs Down</button>
                  <div>Context ad: Check out our web site.</div>                  
                </div>
              </div>
            </div>          
                 
             <p>注意： 我们实际是调用的ContextComponent组件，因为adblock会阻止对ContextAdComponent的调用，kirill化2个小时调试. </p>
              
                   
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`
          },
            {
              name: '注入父类组件',
              description: `<p>创建一个Context(Ad)Component组件</p>
            <p>它将注入父类组件，这样就能立刻看到描述和显示相应值</p>
            <p>注意: 我们需要忽略组件的Ad部分，否则google的广告插件AdBlock会阻止页面`,
              solutions: [
                files.contextComponent.contextComponentUseSolved
              ],
              fileTemplates: [
                files.contextComponent.contextComponentUse,
                {
                  path: 'context/context.html',
                  moduleName: 'context',
                  code: '{{text}}',
                  type: 'html'
                },
                ...justForReference(
                  files.contextService.contextComponentUse,
                  files.appModule.contextComponentUse,
                  files.videoHtml.contextComponentUse,
                  files.videoComponent.contextComponentUse,
                  files.togglePanelHtml.contextComponentUse,
                  files.togglePanelComponent.contextComponentUse,
                  files.appHtml.contextComponentUse,
                  files.appComponent.contextComponentUse,
                  files.videoService.contextComponentUse,
                  files.videoItem.contextComponentUse,
                  files.api.contextComponentUse,
                  files.thumbsHtml.contextComponentUse,
                  files.thumbsComponent.contextComponentUse,
                  files.bootstrap.contextComponentUse
                ),
                files.test.contextComponentUse
              ],
              tests: []
            }]
        },

        {
          name: '管道',
          selectedExerciseIndex: 0,
          exercises: [{
            name: '创建管道',
            description: '创建一个通过格式化(YYYY-MM-DD)的日期返回几天前的fuzzy管道.',
            solutions: [
              files.fuzzyPipe.fuzzyPipeCreateSolved,
            ],
            fileTemplates: [
              evaled(files.fuzzyPipe.fuzzyPipeCreate),
              files.test.fuzzyPipeCreate
            ],
            tests: []
          }, {
            name: '使用管道',
            description: '在程序中使用管道，需要将管道包括在module中.',
            solutions: [
              files.appModule.fuzzyPipeUseSolved,
              files.videoHtml.fuzzyPipeUseSolved,
            ],
            fileTemplates: [
              files.appModule.fuzzyPipeUse,
              files.videoHtml.fuzzyPipeUse,
              ...justForReference(
                files.fuzzyPipe.fuzzyPipeUse,
                files.contextService.fuzzyPipeUse,
                files.videoComponent.fuzzyPipeUse,
                files.togglePanelHtml.fuzzyPipeUse,
                files.togglePanelComponent.fuzzyPipeUse,
                files.appHtml.fuzzyPipeUse,
                files.appComponent.fuzzyPipeUse,
                files.videoService.fuzzyPipeUse,
                files.videoItem.fuzzyPipeUse,
                files.api.fuzzyPipeUse,
                files.thumbsHtml.fuzzyPipeUse,
                files.thumbsComponent.fuzzyPipeUse,
                files.contextComponent.fuzzyPipeUse,
                {
                  path: 'context/context.html',
                  moduleName: 'context',
                  code: '{{text}}',
                  type: 'html'
                },
                files.bootstrap.fuzzyPipeUse
              ),
              files.test.fuzzyPipeUse
            ],
            tests: []
          }]
        },
        /*
         {
         name: 'Tests',
         selectedExerciseIndex: 0,
         exercises: [{
         name: 'Sample tests',
         description: `
         <p>In this milestone instead of changing the code to pass the test
         you'll have to change the test to pass the code. </p>

         <p>This milestone is experimental and temporarily uses 'mocha' and 'chai' instead of jasmine.</p>
         `,
         fileTemplates: [
         Object.assign(testFile(), {hidden: false}),
         tsFile('FuzzyPipe', {readonly: true, path: '7-pipes/0-create-pipe/solution'}),
         testFile(),
         ...hidden(
         htmlFile('context', {path: '6-children'}),
         tsFile('VideoComponent', {path: '6-children'}),
         htmlFile('togglepanel', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
         tsFile('AppComponent', {path: '4-component-tree/1-use-video-component/solution'}),
         sharedAppBootstrap({hidden: true}),
         sharedVideoInterface({hidden: true}),
         sharedTsFile('VideoService', {hidden: true}),
         sharedApiFile({hidden: true})
         )
         ],
         tests: []
         }]
         },*/
        {
          name: '问卷调查',
          selectedExerciseIndex: 0,
          exercises: [{
            name: '结束!',
            description: `
        请帮助填写问卷(请到墙外) <a href = "https://docs.google.com/forms/d/1lGPvmCftArLXVuJkO6L7sXZiqIDj-DtiPM0MQJXLJTA/edit">在线调查</a>
        (注意：这不同于反馈！)
`,
            fileTemplates: [],
            tests: []
          }]
        }
      ]
    }
  }
}
