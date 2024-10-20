import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const mockRandom = jest.fn();
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: (...args: [number, number, boolean]) => mockRandom(...args),
}));

describe('BankAccount', () => {
  const initialBalance = 100;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
    mockRandom.mockReset();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withDrawAmount = 2 * initialBalance;
    const withDrawError = new InsufficientFundsError(account.getBalance());
    expect(() => account.withdraw(withDrawAmount)).toThrow(withDrawError);
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 2 * initialBalance;
    const withDrawError = new InsufficientFundsError(account.getBalance());
    expect(() =>
      account.transfer(transferAmount, getBankAccount(initialBalance)),
    ).toThrow(withDrawError);
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = initialBalance;
    const transferError = new TransferFailedError();
    expect(() => account.transfer(transferAmount, account)).toThrow(
      transferError,
    );
  });

  test('should deposit money', () => {
    const depositMoney = 150;
    account.deposit(depositMoney);
    expect(account.getBalance()).toBe(initialBalance + depositMoney);
  });

  test('should withdraw money', () => {
    const withdrawMoney = 50;
    account.withdraw(withdrawMoney);
    expect(account.getBalance()).toBe(initialBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const transferMoney = 30;
    const newAccount = getBankAccount(initialBalance);
    account.transfer(transferMoney, newAccount);
    expect(account.getBalance()).toBe(initialBalance - transferMoney);
    expect(newAccount.getBalance()).toBe(initialBalance + transferMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedValue = 50;
    const boolForSuccess = 1;
    mockRandom
      .mockReturnValueOnce(fetchedValue)
      .mockReturnValueOnce(boolForSuccess);

    const result = await account.fetchBalance();
    expect(result).toBe(fetchedValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedValue = 50;
    const boolForSuccess = 1;
    mockRandom
      .mockReturnValueOnce(fetchedValue)
      .mockReturnValueOnce(boolForSuccess);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(fetchedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedValue = 50;
    const boolForSuccess = 0;
    mockRandom
      .mockReturnValueOnce(fetchedValue)
      .mockReturnValueOnce(boolForSuccess);
    const syncError = new SynchronizationFailedError();

    expect(() => account.synchronizeBalance()).rejects.toThrow(syncError);
  });
});
