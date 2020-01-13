const example = require('./example.hbs');
const utils = require('../../../../test/jest/utils');

describe('app-launcher', () => {

  describe('automated accessibility testing', () => {
    it('should have no DAP violations', async () => {
      const container = utils.render(example);
      await expect(container).toHaveNoDAPViolations('app-launcher');
    });
  });
});