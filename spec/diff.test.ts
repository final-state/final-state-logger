import diffLogger, { style, render } from '../src/diff';

test('Test style', () => {
  expect(style('E')).toBe('color: #2196F3; font-weight: bold');
});

test('Test render E', () => {
  const path = ['A', 'B'];
  const lhs = 'lhs';
  const rhs = 'rhs';
  expect(
    render({
      kind: 'E',
      path,
      lhs,
      rhs,
    }),
  ).toEqual([path.join('.'), lhs, '→', rhs]);
});

test('Test render N', () => {
  const path = ['A', 'B'];
  const rhs = 'rhs';
  expect(
    render({
      kind: 'N',
      path,
      rhs,
    }),
  ).toEqual([path.join('.'), rhs]);
});

test('Test render D', () => {
  const path = ['A', 'B'];
  expect(
    render({
      kind: 'D',
      path,
    }),
  ).toEqual([path.join('.')]);
});

test('Test render A', () => {
  const path = ['A', 'B'];
  const index = 0;
  const item = 'item';
  expect(
    render({
      kind: 'A',
      path,
      index,
      item,
    }),
  ).toEqual([`${path.join('.')}[${index}]`, item]);
});

test('Test render Unknown', () => {
  expect(
    render({
      kind: 'Unknown',
    }),
  ).toEqual([]);
});

test('Test diffLogger with different state', () => {
  const mockGroupCollapsed = jest.fn(() => {});
  const mockGroupEnd = jest.fn(() => {});
  diffLogger(
    {
      count: 0,
    },
    {
      count: 1,
    },
    {
      groupCollapsed: mockGroupCollapsed,
      group: () => {},
      log: () => {},
      groupEnd: mockGroupEnd,
    },
    true,
  );
  expect(mockGroupCollapsed).toHaveBeenCalledWith('diff');
  expect(mockGroupEnd).toHaveBeenCalled();
});

test('Test diffLogger with same state', () => {
  const mockLog = jest.fn(() => {});

  diffLogger(
    {
      count: 0,
    },
    {
      count: 0,
    },
    {
      groupCollapsed: () => {},
      group: () => {},
      log: mockLog,
      groupEnd: () => {},
    },
    true,
  );
  expect(mockLog).toHaveBeenCalledWith('—— no diff ——');
});

test('Test diffLogger when isCollapsed is false', () => {
  const mockGroup = jest.fn(() => {});

  diffLogger(
    {
      count: 0,
    },
    {
      count: 1,
    },
    {
      groupCollapsed: () => {},
      group: mockGroup,
      log: () => {},
      groupEnd: () => {},
    },
    false,
  );
  expect(mockGroup).toHaveBeenCalledWith('diff');
});

test('Test diffLogger handle exception', () => {
  const mockLog = jest.fn(() => {});

  diffLogger(
    {
      count: 0,
    },
    {
      count: 1,
    },
    {
      groupCollapsed: null,
      group: () => {},
      log: mockLog,
      groupEnd: null,
    },
    true,
  );

  expect(mockLog).toHaveBeenCalledWith('—— diff end —— ');
});
