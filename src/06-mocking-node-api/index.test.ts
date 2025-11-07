// Uncomment the code below and write your tests
import fs from 'node:fs';
import path from 'node:path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

const callback = jest.fn();
const interval = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, interval);
    expect(spyTimeout).toHaveBeenCalledTimes(1);
    expect(spyTimeout).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spyInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(spyInterval).toHaveBeenCalledTimes(1);
    expect(spyInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const spyJoin = jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(spyJoin).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const content = 'This is test content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(Buffer.from(content));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toEqual(content);
  });
});
