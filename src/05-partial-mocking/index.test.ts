// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  beforeAll(() => {
    global.console.log = jest.fn();
  });

  afterAll(() => {
    jest.unmock('./index');
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    expect(console.log).not.toHaveBeenCalled();
    mockTwo();
    expect(console.log).not.toHaveBeenCalled();
    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
  });
});
