/* eslint no-param-reassign:0 */
import Store, { ActionMap } from 'final-state';
import finalStateLogger from '../src';

interface IState {
  count: number;
}

const initialState: IState = {
  count: 0,
};

const actions: ActionMap = {
  increaseCount(draft: IState, n = 1) {
    draft.count += n;
  }
}

test('Test log output', () => {
  const store = new Store(initialState, actions, 'final-state-rx-test-1');

  const mockSubscribe = jest.fn(store.subscribe);
  store.subscribe = mockSubscribe

  const mockLog = jest.fn(console.log)
  const prevLog = console.log
  console.log = mockLog

  finalStateLogger(store)
  store.dispatch('increaseCount', 2);
  
  expect(mockSubscribe).toHaveBeenCalled()
  expect(mockLog).toHaveBeenCalled()

  console.log = prevLog
});

test('Test log handle exception', () => {
  const store = new Store(initialState, actions, 'final-state-rx-test-1');

  const mockLog = jest.fn(console.log)
  const prevLog = console.log
  console.log = mockLog

  const prevGroup = console.group
  console.group = null

  const prevGroupEnd = console.groupEnd
  console.groupEnd = null

  finalStateLogger(store)
  store.dispatch('increaseCount', 2);
  
  expect(mockLog).toHaveBeenCalledWith('—— action end ——')
  expect(mockLog).toHaveBeenCalledWith('————————————————')
  
  console.log = prevLog
  console.group = prevGroup
  console.groupEnd = prevGroupEnd
});
