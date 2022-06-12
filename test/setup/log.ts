import { jest } from '@jest/globals';
import log from '../../src/shared/loggers/log';

jest.spyOn(log, 'debug').mockImplementation(() => {});
jest.spyOn(log, 'info').mockImplementation(() => {});
jest.spyOn(log, 'warn').mockImplementation(() => {});
jest.spyOn(log, 'error').mockImplementation(() => {});


