// server/utils/index.test.js

const { sortCompactToStr } = require('.');

describe('Utils', () => {
  describe('sortCompactStr', () => {
    test('Descendant', () => {
      const result = sortCompactToStr('createdAt', 'desc');
      const expected = '-createdAt';

      expect(result).toEqual(expected);
    });
    test('Ascendant', () => {
      const result = sortCompactToStr('createdAt', 'asc');
      const expected = 'createdAt';

      expect(result).toEqual(expected);
    });
  });
});
