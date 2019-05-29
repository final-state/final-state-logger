/* eslint no-console:0 */
import Store, { Listener } from 'final-state';
import format from 'date-fns/format';
import diffLogger from './diff';

export default function finalStateLogger(store: Store) {
  const listener: Listener = (type, prevState) => {
    const nextState = store.getState();
    const now = new Date();
    const output = [
      `Action[%c${type}%c]\n${format(
        now,
        'yyyy-MM-dd HH:mm:ss:SSS',
      )}(${now.getTime()})`,
      'color: red;',
      'color: black;',
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
