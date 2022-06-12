import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

const resourcesPath = path.join('src', 'resources');
const config = JSON.parse(fs.readFileSync(`${resourcesPath}/config.json`, 'utf-8'));

const IGNORED_PROPERTIES: string[] = [];
const mockConfig = config;

interface IConfigObj{
  [prop: string]: unknown;
}

const blankifyObject = (obj: object) => {
  const blanked: IConfigObj = {};
  
  Object.entries(obj).forEach(([key, value]) => {
    if (IGNORED_PROPERTIES.includes(key))
      return blanked[key] = value;
    if (value === null)
      return blanked[key] = value;
    if (typeof value === 'string')
      return blanked[key] = '';
    if (typeof value === 'number')
      return blanked[key] = 0;
    if (typeof value === 'object')
      return blanked[key] = blankifyObject(value);

  });
  return blanked;


};

jest.mock('../../src/shared/config', () => blankifyObject(mockConfig));