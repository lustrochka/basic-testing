import { doStuffByTimeout, doStuffByInterval } from '06-mocking-node-api';
import * as path from 'path';

jest.useFakeTimers();

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const mockedInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(mockedInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    //
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
