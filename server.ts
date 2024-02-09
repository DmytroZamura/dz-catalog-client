import 'zone.js/dist/zone-node';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';


import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';
import {Blob} from 'blob-polyfill';
import {readFileSync} from 'fs';
import {REQUEST, RESPONSE} from '@nguniversal/express-engine/tokens';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';


// -- solution
const template = readFileSync(join('dist', 'browser', 'index.html')).toString();
const domino = require('domino');

Object.assign(global, domino.impl);
(global as any)['KeyboardEvent'] = domino.impl.Event;

const win = domino.createWindow(template);
win.Object = Object;
win.Math = Math;


global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});

global['Blob'] = Blob;
global['File'] = null;
global['branch'] = null;
global['object'] = win.object;
global['MouseEvent'] = win.MouseEvent;
global['document'] = win.document;

global['HTMLElement'] = win.HTMLElement;
global['DOMTokenList'] = win.DOMTokenList;
global['getComputedStyle'] = win.getComputedStyle;
global['self'] = win;
global['CSS'] = null;
global['Prism'] = null;
global['branch'] = null;
global['object'] = win.object;

global['Node'] = win.Node;
global['Text'] = win.Text;
// const MockBrowser = require('mock-browser').mocks.MockBrowser;
// const mock = new MockBrowser();
// global['navigator'] = mock.getNavigator();
global['navigator'] = win.navigator;


// --- end solution


import {AppServerModule} from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.use(compression());
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));

  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        {provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}
      ]
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 8080;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
