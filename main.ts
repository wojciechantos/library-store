import { App } from './src/App.ts';
import { v4 as uuidv4 } from 'uuid';

const newId1 = uuidv4();
const newId2 = uuidv4();
const newId3 = uuidv4();
const newId4 = uuidv4();
const newId5 = uuidv4();
const newId6 = uuidv4();
const newId7 = uuidv4();

const app = new App([]);

app.init();
