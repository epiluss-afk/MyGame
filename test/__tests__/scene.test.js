const { game } = require('../../scene');

describe('Scene initialization', () => {
  test('scene object exists', () => {
    expect(game.scene).toBeDefined();
  });

  test('renderer is defined', () => {
    expect(game.renderer).toBeDefined();
  });
});
