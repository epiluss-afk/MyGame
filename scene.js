// scene.js
// This file initializes the Three.js scene, camera, renderer, and core game objects.
// It is intended to be modularized from the inline HTML.  The script assumes the
// <canvas id="glcanvas"> element already exists.

// Add fallback for THREEx if not available
const THREE = (typeof global !== 'undefined' && global.THREE) ? global.THREE : require('three');
if (typeof global !== 'undefined' && !global.THREE) { global.THREE = THREE; }
// Initialize canvas
const canvas = document.getElementById('glcanvas') || document.createElement('canvas');
// Polyfill getContext for jsdom environment
if (typeof canvas.getContext !== 'function') {
  canvas.getContext = function(type) {
    if (type === 'webgl' || type === 'webgl2') return {};
    return null;
  };
}



// Initialize renderer with fallback in test environment
let renderer;
// Attempt to create a real WebGL renderer only if a context is available
let context;
try {
  context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
} catch (e) {
  context = null;
}
if (context) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} else {
  renderer = {
    setSize: () => {},
    setPixelRatio: () => {},
    domElement: canvas
  };
}


const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x111111, 20, 100);

// Lights
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
hemi.intensity = 2.0;
scene.add(hemi);
const amb = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(amb);

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 6, 12);
const cameraOffset = new THREE.Vector3(0, 5, 10);

// Player
const playerGeo = new THREE.BoxGeometry(1, 2, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0x00aaee });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(0, 1, 0);
player.castShadow = true;
scene.add(player);

// Floor
const floorGeo = new THREE.PlaneGeometry(200, 200);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = - Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Obstacles
const blockGeo = new THREE.BoxGeometry(1, 1, 1);
const blockMat = new THREE.MeshStandardMaterial({ color: 0x777777 });
const blocks = [];
for (let i = -5; i <= 5; i++) {
  for (let j = -5; j <= 5; j++) {
    if (Math.random() < 0.2) {
      const block = new THREE.Mesh(blockGeo, blockMat);
      block.position.set(i, 0.5, j);
      block.castShadow = true;
      block.receiveShadow = true;
      scene.add(block);
      blocks.push(block);
    }
  }
}
const blockRadius = Math.sqrt(0.5 * 0.5 * 3);

// Expose via a global object for later use.
window.game = {
  scene,
  renderer,
  camera,
  player,
  blocks,
  blockRadius,
  cameraOffset
};

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Export for module usage (optional)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { game };
}

