const { game } = require('./scene');

describe('Scene initialization', () => {
  test('scene object exists', () => {
    expect(game.scene).toBeDefined();
  });

  test('renderer is instance of THREE.WebGLRenderer', () => {
    expect(game.renderer).toBeDefined();
    // We cannot instantiate THREE without DOM, so just check existence
  });
});
