const { delayedGreeting } = require('../src/asyncUtils');

describe('delayedGreeting', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should resolve with the correct greeting message', async () => {
    const name = 'Alice';
    const delay = 1000;

    const promise = delayedGreeting(name, delay);

    jest.advanceTimersByTime(delay);

    await expect(promise).resolves.toBe(`Hello, ${name}!`);
  });

  test('should respect the specified delay', async () => {
    const name = 'Bob';
    const delay = 2000;

    const promise = delayedGreeting(name, delay);

    const spyResolve = jest.fn();
    promise.then(spyResolve);

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(spyResolve).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(spyResolve).toHaveBeenCalledTimes(1);
  });
});
