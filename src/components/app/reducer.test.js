import { user, USER_LOAD } from './reducers';

describe('app reducers', () => {

  it('inits to null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });
});