// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import promices from 'node:fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, interval);
    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), interval);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const callback = jest.fn();
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const joinSpy = jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';
    const joinSpy = jest.spyOn(path, 'join');
    fs.existsSync = jest.fn().mockReturnValue(false);
    joinSpy.mockImplementation((...args) => args.join('/'));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileName = 'test.txt';
    const content = 'This is file content';
    const joinSpy = jest.spyOn(path, 'join');
    const readFileSpy = jest.spyOn(promices, 'readFile');

    fs.existsSync = jest.fn().mockReturnValue(true);
    readFileSpy.mockResolvedValue(Buffer.from(content));
    joinSpy.mockImplementation((...args) => args.join('/'));

    await expect(readFileAsynchronously(fileName)).resolves.toBe(content);
  });
});
