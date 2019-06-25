/* eslint no-param-reassign:0,no-console:0 */
import { createStore, ActionMap } from '@liyuanqiu/final-state';
import { applyLogger } from '../src';

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

const actions: ActionMap = {
  increaseCount(draft: State, n = 1) {
    draft.count += n;
  },
};

test('Test log output', () => {
  const store = createStore(initialState, actions, 'test-store');

  const mockSubscribe = jest.fn(store.subscribe);
  store.subscribe = mockSubscribe;

  const mockLog = jest.fn(console.log);
  const prevLog = console.log;
  console.log = mockLog;

  applyLogger(store);
  store.dispatch('increaseCount', 2);

  expect(mockSubscribe).toHaveBeenCalled();
  expect(mockLog).toHaveBeenCalled();

  console.log = prevLog;
});

test('Test log handle exception', () => {
  const store = createStore(initialState, actions, 'test-store');

  const mockLog = jest.fn(console.log);
  const prevLog = console.log;
  console.log = mockLog;

  const prevGroup = console.group;
  console.group = () => {
    throw Error();
  };

  const prevGroupEnd = console.groupEnd;
  console.groupEnd = () => {
    throw Error();
  };

  applyLogger(store);
  store.dispatch('increaseCount', 2);

  expect(mockLog).toHaveBeenCalledWith('—— action end ——');
  expect(mockLog).toHaveBeenCalledWith('————————————————');

  console.log = prevLog;
  console.group = prevGroup;
  console.groupEnd = prevGroupEnd;
});
