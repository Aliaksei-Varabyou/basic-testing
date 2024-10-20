// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testData = [
      123,
      'strings',
      true,
      [1, 2, 3],
      { a: 1, b: 'Name' },
      undefined,
      null,
    ];
    testData.forEach((value) => {
      expect(resolveValue(value)).resolves.toBe(value);
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedMessage = 'Error happens';
    expect(() => throwError(providedMessage)).toThrow(providedMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const awesomeError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(awesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const awesomeError = new MyAwesomeError();
    expect(() => rejectCustomError()).rejects.toThrow(awesomeError);
  });
});
