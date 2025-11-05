// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const calcInput = {
  a: 10,
  b: 5,
  action: '',
};

const calcInvalid = {
  a: '10',
  b: 5,
  action: Action.Add,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    calcInput.action = Action.Add;
    const result = simpleCalculator(calcInput);
    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    calcInput.action = Action.Subtract;
    const result = simpleCalculator(calcInput);
    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    calcInput.action = Action.Multiply;
    const result = simpleCalculator(calcInput);
    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    calcInput.action = Action.Divide;
    const result = simpleCalculator(calcInput);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    calcInput.action = Action.Exponentiate;
    const result = simpleCalculator(calcInput);
    expect(result).toBe(100000);
  });

  test('should return null for invalid action', () => {
    calcInput.action = 'action';
    const result = simpleCalculator(calcInput);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator(calcInvalid);
    expect(result).toBeNull();
  });
});
