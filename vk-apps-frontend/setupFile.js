import { JSDOM } from 'jsdom';

const dom = new JSDOM(``);
global.window = dom.window;
global.document = global.window.document;
global.navigator = global.window.navigator;

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;
  global.window.dispatchEvent(new Event('resize'));
};