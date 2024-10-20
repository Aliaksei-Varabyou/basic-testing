// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const data = {
  a: 10,
  b: 5,
  action: Action.Add,
};

const dataInvalidAction = {
  a: 10,
  b: 5,
  action: '++',
};

const dataInvalidArguments = {
  a: '10',
  b: 5,
  action: Action.Add,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator(data);
    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    data.action = Action.Subtract;
    const result = simpleCalculator(data);
    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    data.action = Action.Multiply;
    const result = simpleCalculator(data);
    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    data.action = Action.Divide;
    const result = simpleCalculator(data);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    data.action = Action.Exponentiate;
    const result = simpleCalculator(data);
    expect(result).toBe(100000);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator(dataInvalidAction);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator(dataInvalidArguments);
    expect(result).toBeNull();
  });
});
