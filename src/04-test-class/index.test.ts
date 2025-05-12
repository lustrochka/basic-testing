import { random } from 'lodash';
import { getBankAccount, SynchronizationFailedError } from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const targetAccount = getBankAccount(1000);
    expect(() => account.transfer(200, targetAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(200, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(300);
    account.withdraw(200);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account = getBankAccount(200);
    const targetAccount = getBankAccount(500);
    account.transfer(100, targetAccount);
    expect(account.getBalance()).toBe(100);
    expect(targetAccount.getBalance()).toBe(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 16)
      .mockImplementationOnce(() => 1);
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();

    expect(balance).toBe(16);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 16)
      .mockImplementationOnce(() => 1);
    const account = getBankAccount(0);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(16);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 16)
      .mockImplementationOnce(() => 0);
    const account = getBankAccount(0);

    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
