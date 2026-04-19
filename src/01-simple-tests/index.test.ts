// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const calcInvalid = {
  a: '10',
  b: 5,
  action: Action.Add,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Add });
    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Subtract });
    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Multiply });
    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(result).toBe(100000);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: 'action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator(calcInvalid);
    expect(result).toBeNull();
  });
});
