// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

let initialBalance: number;
let account: BankAccount;

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    initialBalance = 100;
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const error = new InsufficientFundsError(initialBalance);
    expect(() => account.withdraw(initialBalance + 1)).toThrow(error);
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(0);
    const error = new InsufficientFundsError(initialBalance);
    expect(() => account.transfer(initialBalance + 1, account2)).toThrow(error);
  });

  test('should throw error when transferring to the same account', () => {
    const error = new TransferFailedError();
    expect(() => account.transfer(initialBalance - 1, account)).toThrow(error);
  });

  test('should deposit money', () => {
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toEqual(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toEqual(initialBalance - amount);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(0);
    const amount = 50;
    account.transfer(amount, account2);
    expect(account.getBalance()).toEqual(initialBalance - amount);
    expect(account2.getBalance()).toEqual(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(1);
    const amount = await account.fetchBalance();
    expect(amount).toEqual(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const data = 10;
    (random as jest.Mock).mockReturnValueOnce(data).mockReturnValueOnce(1);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(data);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(10).mockReturnValueOnce(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
