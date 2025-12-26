import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const stage = document.getElementById("blackHoleStage");
if (!stage) throw new Error("Missing #blackHoleStage");

const getSize = () => {
  const w = stage.clientWidth || window.innerWidth || 1;
  const h = stage.clientHeight || window.innerHeight || 1;
  return { w, h, aspect: w / h };
};

const { w: initialW, h: initialH, aspect: initialAspect } = getSize();

// Constants for black hole visualization
const BLACK_HOLE_RADIUS = 1.3;
const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.2;
const DISK_OUTER_RADIUS = 8.0;
const DISK_TILT_ANGLE = Math.PI / 3.0; // Tilted for more dynamic view

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000010, 0.05);

// Camera setup with more dramatic angle
const camera = new THREE.PerspectiveCamera(60, initialAspect, 0.1, 1000);
camera.position.set(-6.5, 5, 6.5);
camera.lookAt(0, 0, 0);

// Renderer setup with improved quality
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(initialW, initialH);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setClearColor(0x000000);
renderer.domElement.style.touchAction = "pan-y";
stage.appendChild(renderer.domElement);

// Post-processing setup
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Enhanced bloom effect
const bloomPass = new UnrealBloomPass(new THREE.Vector2(initialW, initialH), 0.8, 0.4, 0.85);
bloomPass.threshold = 0.1;
bloomPass.strength = 1.2;
bloomPass.radius = 0.7;
composer.addPass(bloomPass);

// Custom lensing shader for gravitational distortion
const lensingShader = {
  uniforms: {
    tDiffuse: { value: null },
    blackHoleScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
    blackHoleStrength: { value: 0.7 },
    blackHoleRadius: { value: 0.12 },
    aspectRatio: { value: initialAspect },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 blackHoleScreenPos;
    uniform float blackHoleStrength;
    uniform float blackHoleRadius;
    uniform float aspectRatio;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 center = blackHoleScreenPos;

      vec2 aspectCorrected = vec2(1.0, 1.0/aspectRatio);
      vec2 diff = (uv - center) * aspectCorrected;
      float dist = length(diff);

      if (dist < blackHoleRadius * 2.0) {
        float strength = (blackHoleRadius * 2.0 - dist) / (blackHoleRadius * 2.0);
        strength = pow(strength, 2.0) * blackHoleStrength;

        vec2 dir = normalize(diff);
        float pullStrength = strength * blackHoleRadius * 0.5;

        float distortion = dist * dist * strength * 10.0;
        uv -= dir * distortion;

        // Create a subtle accretion glow
        float glowDist = abs(dist - blackHoleRadius * 1.2);
        float glow = (1.0 - smoothstep(0.0, blackHoleRadius, glowDist)) * strength * 2.0;
        vec3 glowColor = vec3(0.3, 0.6, 0.9) * glow;

        vec4 color = texture2D(tDiffuse, uv);
        color.rgb += glowColor;

        // Darken the center
        if (dist < blackHoleRadius) {
          float darkness = 1.0 - dist / blackHoleRadius;
          darkness = pow(darkness, 2.0);
          color.rgb *= (1.0 - darkness * 0.9);
        }

        gl_FragColor = color;
      } else {
        gl_FragColor = texture2D(tDiffuse, uv);
      }
    }
  `,
};

const lensingPass = new ShaderPass(lensingShader);
composer.addPass(lensingPass);

// Improved orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.enableZoom = false;
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 100;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;

// Auto rotate toggle functionality
let autoRotate = false;
const autoRotateToggle = document.getElementById("autoRotateToggle");
if (autoRotateToggle) {
  autoRotateToggle.innerHTML = `
    <svg class="rotate-icon" viewBox="0 0 24 24">
      <path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6" />
    </svg>
    <span>Auto Rotate</span>
  `;

  const setPressed = (pressed) => {
    autoRotateToggle.setAttribute("aria-pressed", pressed ? "true" : "false");
  };
  if (!autoRotateToggle.hasAttribute("role")) autoRotateToggle.setAttribute("role", "button");
  if (!autoRotateToggle.hasAttribute("tabindex")) autoRotateToggle.setAttribute("tabindex", "0");
  setPressed(autoRotate);

  const toggleAutoRotate = () => {
    autoRotate = !autoRotate;
    controls.autoRotate = autoRotate;
    setPressed(autoRotate);
    autoRotateToggle.style.color = autoRotate ? "rgba(120, 200, 255, 0.95)" : "rgba(255, 255, 255, 0.85)";
  };

  autoRotateToggle.addEventListener("click", toggleAutoRotate);
  autoRotateToggle.addEventListener("keydown", (e) => {
    if (e.code !== "Enter" && e.code !== "Space") return;
    e.preventDefault();
    toggleAutoRotate();
  });
}

// STARFIELD - Enhanced with shader material
const starCount = 25000;
const starGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);
const sizes = new Float32Array(starCount);

// Star color palette for variety
const starPalette = [
  new THREE.Color(0x88aaff),
  new THREE.Color(0xffaaff),
  new THREE.Color(0xaaffff),
  new THREE.Color(0xffddaa),
  new THREE.Color(0xffeecc),
  new THREE.Color(0xffffff),
  new THREE.Color(0xff8888),
  new THREE.Color(0x88ff88),
  new THREE.Color(0xffff88),
  new THREE.Color(0x88ffff),
];

for (let i = 0; i < starCount; i++) {
  // Random spherical distribution with higher density in center
  const radius = Math.random() * 100 + 30;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  // Assign random color from palette
  const colorIndex = Math.floor(Math.random() * starPalette.length);
  const color = starPalette[colorIndex];

  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;

  // Random size variation
  sizes[i] = Math.random() * 0.5 + 0.1;
}

starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

// Star shader material with twinkling effect
const starMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    pixelRatio: { value: renderer.getPixelRatio() },
  },
  vertexShader: `
    uniform float time;
    uniform float pixelRatio;
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

      float dist = length(position);
      vTwinkle = sin(dist * 0.05 + time * 2.0) * 0.5 + 0.5;

      gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      float r = length(gl_PointCoord - vec2(0.5));
      if (r > 0.5) discard;

      float alpha = (0.5 - r) * 2.0;
      alpha = pow(alpha, 1.5) * (0.3 + vTwinkle * 0.7);

      gl_FragColor = vec4(vColor, alpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// BLACK HOLE - Event horizon with subtle glow
const eventHorizonGeometry = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, 64, 64);
const eventHorizonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec3 vPosition;

    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec3 vPosition;

    void main() {
      float dist = length(vPosition) / ${BLACK_HOLE_RADIUS.toFixed(2)};
      float edge = smoothstep(0.7, 1.0, dist);

      float glow = (1.0 - edge) * 0.5;
      float pulse = sin(time * 0.5) * 0.05 + 0.95;

      vec3 color = vec3(0.0, 0.0, 0.0);
      vec3 glowColor = vec3(0.0, 0.05, 0.1) * glow * pulse;

      gl_FragColor = vec4(color + glowColor, 1.0);
    }
  `,
});

const eventHorizon = new THREE.Mesh(eventHorizonGeometry, eventHorizonMaterial);
scene.add(eventHorizon);

// Simple black hole mesh for lensing calculations
const blackHoleGeometry = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, 32, 32);
const blackHoleMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0,
});

const blackHoleMesh = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
scene.add(blackHoleMesh);

// ACCRETION DISK - Improved with more realistic physics
const diskGeometry = new THREE.RingGeometry(DISK_INNER_RADIUS, DISK_OUTER_RADIUS, 128, 8);

// UV coordinates for better shader mapping
const diskUvs = diskGeometry.attributes.uv;
const diskPositions = diskGeometry.attributes.position;

// Create custom UV mapping based on radius
for (let i = 0; i < diskUvs.count; i++) {
  const x = diskPositions.getX(i);
  const y = diskPositions.getY(i);
  const radius = Math.sqrt(x * x + y * y);
  const angle = Math.atan2(y, x);

  // Map radius and angle to UV space
  diskUvs.setX(i, (radius - DISK_INNER_RADIUS) / (DISK_OUTER_RADIUS - DISK_INNER_RADIUS));
  diskUvs.setY(i, (angle + Math.PI) / (Math.PI * 2));
}

const diskMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;

    void main() {
      vUv = uv;
      vPosition = position;
      vRadius = length(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;

    // Improved noise function for turbulence
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec2 mod289(vec2 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);

      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);

      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;

      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));

      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;

      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;

      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;

      return 130.0 * dot(m, g);
    }

    // Smooth color palette for disk
    vec3 diskPalette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 0.7, 0.4);
      vec3 d = vec3(0.0, 0.15, 0.2);

      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      // Convert UV to polar coordinates
      float radius = vUv.x;
      float angle = vUv.y * 6.28318;

      // Calculate distance from black hole
      float normalizedRadius = (vRadius - ${DISK_INNER_RADIUS.toFixed(2)}) / (${DISK_OUTER_RADIUS.toFixed(2)} - ${DISK_INNER_RADIUS.toFixed(2)});
      normalizedRadius = clamp(normalizedRadius, 0.0, 1.0);

      // Create swirl effect based on radius and time
      float swirlFactor = mix(15.0, 2.0, normalizedRadius);
      float swirl = angle + time * mix(3.0, 0.5, normalizedRadius) - normalizedRadius * swirlFactor;

      // Turbulence with improved noise
      float noiseScale = mix(3.0, 8.0, normalizedRadius);
      vec2 noiseCoord = vec2(
        cos(swirl) * normalizedRadius * noiseScale,
        sin(swirl) * normalizedRadius * noiseScale
      );

      float n1 = snoise(noiseCoord + vec2(time * 0.1, time * 0.15));
      float n2 = snoise(noiseCoord * 2.0 + vec2(-time * 0.2, time * 0.1));
      float n3 = snoise(noiseCoord * 4.0 + vec2(time * 0.05, -time * 0.25));

      float noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
      noise = noise * 0.5 + 0.5; // Normalize to 0-1

      // Temperature gradient - hotter near the black hole
      float temperature = pow(1.0 - normalizedRadius, 0.7) * 1.5;

      // Add noise variation to temperature
      temperature *= mix(0.8, 1.2, noise);

      // Color based on temperature
      vec3 baseColor = diskPalette(temperature);

      // Hot inner ring
      float innerGlow = smoothstep(0.0, 0.2, 1.0 - normalizedRadius) * 1.5;
      vec3 innerColor = vec3(0.9, 0.6, 0.3) * innerGlow;

      // Cool outer ring with blue tint
      float outerCool = smoothstep(0.5, 1.0, normalizedRadius);
      vec3 outerColor = vec3(0.2, 0.4, 0.7) * outerCool * 0.5;

      // Combine colors
      vec3 color = baseColor + innerColor + outerColor;

      // Add brighter filaments
      float filamentNoise = pow(noise, 3.0);
      float filaments = smoothstep(0.7, 1.0, filamentNoise) * temperature;
      color += vec3(1.0, 0.9, 0.8) * filaments;

      // Alpha based on radius with smoother falloff
      float alpha = smoothstep(0.0, 0.05, normalizedRadius) *
                    (1.0 - smoothstep(0.85, 1.0, normalizedRadius));
      alpha *= mix(0.7, 1.0, noise);

      // Add subtle pulsing
      float pulse = sin(time * 2.0 + angle * 5.0) * 0.05 + 0.95;
      alpha *= pulse;

      // Fade to black hole
      float holeFade = smoothstep(0.0, 0.3, normalizedRadius);
      vec3 finalColor = mix(vec3(0.0), color, holeFade);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const disk = new THREE.Mesh(diskGeometry, diskMaterial);
disk.rotation.x = DISK_TILT_ANGLE;
scene.add(disk);

// Fade out info after 6 seconds
setTimeout(() => {
  const info = document.getElementById("info");
  if (info) info.style.opacity = "0";
}, 6000);

// Resize handler
let resizeTimeout;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const { w, h, aspect } = getSize();
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloomPass.resolution.set(w, h);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      starMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio();
      lensingShader.uniforms.aspectRatio.value = aspect;
    }, 150);
  },
  false
);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  // Update uniforms
  starMaterial.uniforms.time.value = time;
  eventHorizonMaterial.uniforms.time.value = time;
  diskMaterial.uniforms.time.value = time;

  // Rotate stars slightly for motion effect
  stars.rotation.y += 0.0001;
  stars.rotation.x += 0.00005;

  // Rotate disk
  disk.rotation.z = time * 0.2;

  // Update black hole screen position for lensing
  const blackHolePos = new THREE.Vector3();
  blackHoleMesh.getWorldPosition(blackHolePos);
  blackHolePos.project(camera);

  lensingShader.uniforms.blackHoleScreenPos.value.set((blackHolePos.x + 1) * 0.5, (blackHolePos.y + 1) * 0.5);

  // Update controls
  controls.update();

  // Render with post-processing
  composer.render();
}

animate();
