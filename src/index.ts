/* eslint no-console:0 */
import { Store, Listener } from 'final-state';
import format from 'date-fns/format';
import diffLogger from './diff';

// eslint-disable-next-line import/prefer-default-export
export function applyLogger(store: Store) {
  const listener: Listener = (type, prevState) => {
    const nextState = store.getState();
    const now = new Date();
    const output = [
      `%c${store.name}%c#%c${type}%c\n${format(
        now,
        'yyyy-MM-dd HH:mm:ss:SSS',
      )}(${now.getTime()})`,
      'color: blue;',
      'color: black;',
      'color: red;',
      'color: gray;',
    ];
    try {
      console.group(...output);
    } catch (e) {
      console.log(...output);
    }
    console.log(prevState, nextState);
    try {
      console.groupEnd();
    } catch (e) {
      console.log('—— action end ——');
    }
    diffLogger(prevState, store.getState(), console, false);
    console.log('————————————————');
  };
  store.subscribe(listener);
}
