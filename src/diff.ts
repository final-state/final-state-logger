/**
 * Copy from:
 * https://github.com/LogRocket/redux-logger/blob/5816a9fc8da9b417589380e381ed66f1114ebd9a/src/diff.js
 * And modified to ts(as few changes as possible)
 */

import { diff as differ } from 'deep-diff';

// https://github.com/flitbit/diff#differences
const dictionary: {
  [color: string]: {
    color: string;
    text: string;
  };
} = {
  E: {
    color: '#2196F3',
    text: 'CHANGED:',
  },
  N: {
    color: '#4CAF50',
    text: 'ADDED:',
  },
  D: {
    color: '#F44336',
    text: 'DELETED:',
  },
  A: {
    color: '#2196F3',
    text: 'ARRAY:',
  },
};

export function style(kind: string) {
  return `color: ${dictionary[kind].color}; font-weight: bold`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(diff: any) {
  const { kind, path, lhs, rhs, index, item } = diff;

  switch (kind) {
    case 'E':
      return [path.join('.'), lhs, '→', rhs];
    case 'N':
      return [path.join('.'), rhs];
    case 'D':
      return [path.join('.')];
    case 'A':
      return [`${path.join('.')}[${index}]`, item];
    default:
      return [];
  }
}

export default function diffLogger(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newState: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger: any,
  isCollapsed: boolean,
) {
  const diff = differ(prevState, newState);

  try {
    if (isCollapsed) {
      logger.groupCollapsed('diff');
    } else {
      logger.group('diff');
    }
  } catch (e) {
    logger.log('diff');
  }

  if (diff) {
    diff.forEach(elem => {
      const { kind } = elem;
      const output = render(elem);

      logger.log(`%c ${dictionary[kind].text}`, style(kind), ...output);
    });
  } else {
    logger.log('—— no diff ——');
  }

  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— diff end —— ');
  }
}
