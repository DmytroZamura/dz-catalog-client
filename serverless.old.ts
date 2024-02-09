import 'zone.js/dist/zone-node';

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
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
global['navigator'] = mock.getNavigator();


// --- end solution


import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';


import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { Blob } from 'blob-polyfill';
import {readFileSync} from 'fs';

import { AppServerModule } from './src/main.server';

export const app = express();
const distFolder = join(process.cwd(), 'dist/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
app.set('view engine', 'html');
app.set('views', distFolder);
// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));
// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});
export * from './src/main.server';
