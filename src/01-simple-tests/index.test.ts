// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 1, action: Action.Add });
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 4, action: Action.Multiply });
    expect(result).toBe(20);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 50, b: 5, action: Action.Divide });
    expect(result).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 1, action: 'Wrong' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: true, action: Action.Add });
    expect(result).toBe(null);
  });
});
