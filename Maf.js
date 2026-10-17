// Current version.
const VERSION = "2.0.0";

const PI = Math.PI;
const TAU = 2 * PI;

// https://www.opengl.org/sdk/docs/man/html/clamp.xhtml

function clamp(v, minVal, maxVal) {
  return Math.min(maxVal, Math.max(minVal, v));
}

// https://www.opengl.org/sdk/docs/man/html/step.xhtml

function step(edge, v) {
  return v < edge ? 0 : 1;
}

// https://www.opengl.org/sdk/docs/man/html/smoothstep.xhtml

function smoothStep(edge0, edge1, v) {
  if (edge0 === edge1) return step(edge0, v);
  var t = clamp((v - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

const smoothstep = smoothStep;

// The same with a smoother start and end, by Ken Perlin.
function smootherStep(edge0, edge1, v) {
  if (edge0 === edge1) return step(edge0, v);
  var t = clamp((v - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

const smootherstep = smootherStep;

// http://docs.unity3d.com/ScriptReference/Mathf.html
// https://web.archive.org/web/20161221231840/http://www.shaderific.com/glsl-functions/
// https://www.opengl.org/sdk/docs/man4/html/
// https://msdn.microsoft.com/en-us/library/windows/desktop/ff471376(v=vs.85).aspx
// https://github.com/mout/mout/blob/master/doc/math.md#map
// https://code.google.com/p/kuda/source/browse/public/js/hemi/utils/mathUtils.js?r=8d581c02651077c4ac3f5fc4725323210b6b13cc

// Converts from degrees to radians.
function deg2Rad(degrees) {
  return (degrees * Math.PI) / 180;
}

const toRadians = deg2Rad;

// Converts from radians to degrees.
function rad2Deg(radians) {
  return (radians * 180) / Math.PI;
}

const toDegrees = rad2Deg;

function clamp01(v) {
  return clamp(v, 0, 1);
}

const saturate = clamp01;

// https://www.opengl.org/sdk/docs/man/html/mix.xhtml

// The plain ones do the maths and nothing else, like the ones of GLSL: outside of
// the range they keep going. The ones that say Clamped stop at its ends.

function mix(x, y, a) {
  return x + a * (y - x);
}

const lerp = mix;
const mixUnclamped = mix;
const lerpUnclamped = mix;

function mixClamped(x, y, a) {
  return mix(x, y, clamp01(a));
}

const lerpClamped = mixClamped;

function inverseMix(a, b, v) {
  if (a === b) return 0;
  return (v - a) / (b - a);
}

const inverseLerp = inverseMix;

function inverseMixClamped(a, b, v) {
  return clamp01(inverseMix(a, b, v));
}

const inverseLerpClamped = inverseMixClamped;

// https://www.opengl.org/sdk/docs/man/html/fract.xhtml

function fract(v) {
  return v - Math.floor(v);
}

const frac = fract;

// http://stackoverflow.com/questions/4965301/finding-if-a-number-is-a-power-of-2

function isPowerOfTwo(v) {
  return Number.isInteger(v) && v > 0 && Number.isInteger(Math.log2(v));
}

// https://web.archive.org/web/20150510091207/http://bocoup.com/weblog/find-the-closest-power-of-2-with-javascript/

function closestPowerOfTwo(v) {
  if (!(v > 0)) return 0;
  var lower = Math.pow(2, Math.floor(Math.log2(v)));
  return v - lower < 2 * lower - v ? lower : 2 * lower;
}

function nextPowerOfTwo(v) {
  if (!(v > 0)) return 0;
  return Math.pow(2, Math.ceil(Math.log2(v)));
}

// http://stackoverflow.com/questions/1878907/the-smallest-difference-between-2-angles

//function mod(a, n) { return a - Math.floor(a/n) * n; }
function mod(a, n) {
  return ((a % n) + n) % n;
}

const repeat = mod;

// The value brought into a range that repeats.
function wrap(v, minVal, maxVal) {
  return minVal + mod(v - minVal, maxVal - minVal);
}

// Goes up to length and back down, over and over.
function pingPong(v, length = 1) {
  return length - Math.abs(mod(v, 2 * length) - length);
}

// The closest multiple of step.
function snap(v, step, offset = 0) {
  return Math.round((v - offset) / step) * step + offset;
}

function roundTo(v, decimals = 0) {
  var k = Math.pow(10, decimals);
  return Math.round(v * k) / k;
}

// http://docs.unity3d.com/ScriptReference/Mathf.MoveTowards.html

// Towards the target, by maxDelta at most, without going past it.
function moveTowards(current, target, maxDelta) {
  if (Math.abs(target - current) <= maxDelta) return target;
  return current + Math.sign(target - current) * maxDelta;
}

// https://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/

// Towards the target, the same whatever the time between frames is.
// lambda is how fast: at 1 it covers 63% of the way in a second.
function damp(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

// The shortest way from a to b, with its sign: from -180 to 180.
function deltaAngle(a, b) {
  var d = mod(b - a, 360);
  if (d > 180) d -= 360;
  return d;
}

const deltaAngleDeg = deltaAngle;

function deltaAngleRad(a, b) {
  return toRadians(deltaAngle(toDegrees(a), toDegrees(b)));
}

function lerpAngle(a, b, t) {
  return mod(a + lerp(0, deltaAngle(a, b), t), 360);
}

const lerpAngleDeg = lerpAngle;

function lerpAngleRad(a, b, t) {
  return toRadians(lerpAngleDeg(toDegrees(a), toDegrees(b), t));
}

function moveTowardsAngle(current, target, maxDelta) {
  var d = deltaAngle(current, target);
  if (Math.abs(d) <= maxDelta) return mod(target, 360);
  return mod(current + Math.sign(d) * maxDelta, 360);
}

function moveTowardsAngleRad(current, target, maxDelta) {
  return toRadians(
    moveTowardsAngle(toDegrees(current), toDegrees(target), toDegrees(maxDelta))
  );
}

function dampAngle(current, target, lambda, dt) {
  return mod(current + damp(0, deltaAngle(current, target), lambda, dt), 360);
}

function dampAngleRad(current, target, lambda, dt) {
  return toRadians(dampAngle(toDegrees(current), toDegrees(target), lambda, dt));
}

// http://gamedev.stackexchange.com/questions/74324/gamma-space-and-linear-space-with-shader

function gammaToLinearSpace(v) {
  return Math.pow(v, 2.2);
}

function linearToGammaSpace(v) {
  return Math.pow(v, 1 / 2.2);
}

// https://www.w3.org/Graphics/Color/srgb

// The exact ones, that the gamma of 2.2 is close to.
function sRGBToLinear(v) {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSRGB(v) {
  return v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

function map(from1, to1, from2, to2, v) {
  if (from1 === to1) return from2;
  return from2 + ((v - from1) * (to2 - from2)) / (to1 - from1);
}

const scale = map;

// The same, that doesn't leave the second range.
function mapClamped(from1, to1, from2, to2, v) {
  return clamp(
    map(from1, to1, from2, to2, v),
    Math.min(from2, to2),
    Math.max(from2, to2)
  );
}

// https://iquilezles.org/articles/functions/

function almostIdentity(x, m, n) {
  if (x > m) return x;

  var a = 2 * n - m;
  var b = 2 * m - 3 * n;
  var t = x / m;

  return (a * t + b) * t * t + n;
}

function impulse(k, x) {
  var h = k * x;
  return h * Math.exp(1 - h);
}

function cubicPulse(c, w, x) {
  x = Math.abs(x - c);
  if (x > w) return 0;
  x /= w;
  return 1 - x * x * (3 - 2 * x);
}

function expStep(x, k, n) {
  return Math.exp(-k * Math.pow(x, n));
}

function parabola(x, k) {
  return Math.pow(4 * x * (1 - x), k);
}

function powerCurve(x, a, b) {
  var k = Math.pow(a + b, a + b) / (Math.pow(a, a) * Math.pow(b, b));
  return k * Math.pow(x, a) * Math.pow(1 - x, b);
}

function sinc(x, k) {
  var a = PI * (k * x - 1);
  return a === 0 ? 1 : Math.sin(a) / a;
}

// https://en.wikipedia.org/wiki/Schlick%27s_approximation and http://blog.demofox.org/2012/09/24/bias-and-gain-are-your-friend/

// Pushes the values of 0 to 1 towards one of the ends: b below .5 to 0, above to 1.
function bias(x, b) {
  return x / ((1 / b - 2) * (1 - x) + 1);
}

// Pushes them towards the middle with g below .5, and away from it above.
function gain(x, g) {
  if (x < 0.5) return bias(x * 2, g) / 2;
  return bias(x * 2 - 1, 1 - g) / 2 + 0.5;
}

// https://iquilezles.org/articles/smin/ ?

// Degrees to a point on the unit sphere, with y up.
function latLonToCartesian(lat, lon) {
  var phi = toRadians(90 - lat);
  var theta = toRadians(-lon);
  var x = Math.sin(phi) * Math.cos(theta);
  var y = Math.cos(phi);
  var z = Math.sin(phi) * Math.sin(theta);

  return { x: x, y: y, z: z };
}

// The opposite: a point, at any distance, to degrees.
function cartesianToLatLon(x, y, z) {
  var n = Math.sqrt(x * x + y * y + z * z);
  return {
    lat: 90 - toDegrees(Math.acos(clamp(y / n, -1, 1))),
    lon: toDegrees(Math.atan2(-z, x)),
  };
}

// A function like Math.random, that gives the same numbers for the same seed.
// https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32

function seededRandom(seed = 0) {
  var a = typeof seed === "number" ? seed : hashInt(...Array.from(String(seed), (c) => c.charCodeAt(0)));
  a = a >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// All the random ones take the function that gives the numbers, Math.random by default.

function randomInRange(min, max, random = Math.random) {
  return min + random() * (max - min);
}

// A whole number, that can be any of the two ends.
function randomInt(min, max, random = Math.random) {
  return Math.floor(min + random() * (max - min + 1));
}

function randomSign(random = Math.random) {
  return random() < 0.5 ? -1 : 1;
}

function randomItem(array, random = Math.random) {
  return array[Math.floor(random() * array.length)];
}

// Around the mean, closer to it more often.
function randomGaussian(mean = 0, deviation = 1, random = Math.random) {
  var u = 1 - random();
  var v = random();
  return mean + deviation * Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

// A point on the sphere of radius 1, all of them as likely.
function randomOnSphere(random = Math.random) {
  var y = 2 * random() - 1;
  var r = Math.sqrt(1 - y * y);
  var a = TAU * random();
  return { x: r * Math.cos(a), y: y, z: r * Math.sin(a) };
}

// Changes the order of the array, and returns it.
function shuffle(array, random = Math.random) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

function norm(v, minVal, maxVal) {
  return inverseMix(minVal, maxVal, v);
}

// The bits of any numbers, mixed into a whole number of 32 bits.
// https://github.com/aappleby/smhasher/wiki/MurmurHash3

const _float = new Float64Array(1);
const _bits = new Uint32Array(_float.buffer);

function hashInt() {
  var h = 0x811c9dc5;
  for (var i = 0; i < arguments.length; i++) {
    // -0 is 0
    _float[0] = arguments[i] + 0;
    h = Math.imul(h ^ _bits[0], 0x85ebca6b);
    h = (h << 13) | (h >>> 19);
    h = Math.imul(h ^ _bits[1], 0xc2b2ae35);
    h = (h << 17) | (h >>> 15);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

// A number from 0 to 1 that looks random, and is the same for the same numbers.
function hash() {
  return hashInt.apply(null, arguments) / 4294967296;
}

function noise2d(x, y) {
  return hash(x, y);
}

// Noise that changes smoothly, from 0 to 1: the hash of the whole numbers, and what is between them.
function valueNoise(x, y = 0, z = 0) {
  var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  var u = smoothStep(0, 1, x - ix), v = smoothStep(0, 1, y - iy), w = smoothStep(0, 1, z - iz);
  var front = mixUnclamped(
    mixUnclamped(hash(ix, iy, iz), hash(ix + 1, iy, iz), u),
    mixUnclamped(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), u),
    v
  );
  if (w === 0) return front;
  var back = mixUnclamped(
    mixUnclamped(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), u),
    mixUnclamped(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), u),
    v
  );
  return mixUnclamped(front, back, w);
}

// https://mrl.cs.nyu.edu/~perlin/noise/

function gradient(ix, iy, iz, x, y, z) {
  var h = hashInt(ix, iy, iz) & 15;
  var u = h < 8 ? x : y;
  var v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// The noise of Ken Perlin, from -1 to 1. It is 0 at the whole numbers.
function perlinNoise(x, y = 0, z = 0) {
  var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  x -= ix;
  y -= iy;
  z -= iz;
  var u = smootherStep(0, 1, x), v = smootherStep(0, 1, y), w = smootherStep(0, 1, z);
  return mixUnclamped(
    mixUnclamped(
      mixUnclamped(gradient(ix, iy, iz, x, y, z), gradient(ix + 1, iy, iz, x - 1, y, z), u),
      mixUnclamped(gradient(ix, iy + 1, iz, x, y - 1, z), gradient(ix + 1, iy + 1, iz, x - 1, y - 1, z), u),
      v
    ),
    mixUnclamped(
      mixUnclamped(gradient(ix, iy, iz + 1, x, y, z - 1), gradient(ix + 1, iy, iz + 1, x - 1, y, z - 1), u),
      mixUnclamped(gradient(ix, iy + 1, iz + 1, x, y - 1, z - 1), gradient(ix + 1, iy + 1, iz + 1, x - 1, y - 1, z - 1), u),
      v
    ),
    w
  );
}

// Noise with detail: several of them added, each one smaller and finer than the one before.
function fbm(x, y = 0, z = 0, options = {}) {
  var octaves = options.octaves || 5;
  var lacunarity = options.lacunarity || 2;
  var gain = options.gain || 0.5;
  var noise = options.noise || perlinNoise;
  var sum = 0, amplitude = 1, frequency = 1, total = 0;
  for (var i = 0; i < octaves; i++) {
    sum += amplitude * noise(x * frequency, y * frequency, z * frequency);
    total += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  return sum / total;
}

// https://iquilezles.org/articles/smin/

// The biggest is taken out before the exponentials, so they don't overflow.
function smoothMax(a, b, k) {
  var m = Math.max(a, b);
  return m + Math.log(Math.exp(k * (a - m)) + Math.exp(k * (b - m))) / k;
}

function smoothMin(a, b, k) {
  return -smoothMax(-a, -b, k);
}

function almost(a, b, epsilon = 0.0001) {
  return Math.abs(a - b) < epsilon;
}

export {
  VERSION,
  PI,
  TAU,
  clamp,
  clamp01,
  saturate,
  step,
  smoothStep,
  smoothstep,
  smootherStep,
  smootherstep,
  fract,
  frac,
  mod,
  repeat,
  wrap,
  pingPong,
  snap,
  roundTo,
  mix,
  lerp,
  mixUnclamped,
  lerpUnclamped,
  mixClamped,
  lerpClamped,
  inverseMix,
  inverseLerp,
  inverseMixClamped,
  inverseLerpClamped,
  norm,
  map,
  scale,
  mapClamped,
  moveTowards,
  damp,
  smoothMin,
  smoothMax,
  gammaToLinearSpace,
  linearToGammaSpace,
  sRGBToLinear,
  linearToSRGB,
  almostIdentity,
  impulse,
  cubicPulse,
  expStep,
  parabola,
  powerCurve,
  sinc,
  bias,
  gain,
  deg2Rad,
  toRadians,
  rad2Deg,
  toDegrees,
  deltaAngle,
  deltaAngleDeg,
  deltaAngleRad,
  lerpAngle,
  lerpAngleDeg,
  lerpAngleRad,
  moveTowardsAngle,
  moveTowardsAngleRad,
  dampAngle,
  dampAngleRad,
  seededRandom,
  randomInRange,
  randomInt,
  randomSign,
  randomItem,
  randomGaussian,
  randomOnSphere,
  shuffle,
  hash,
  hashInt,
  noise2d,
  valueNoise,
  perlinNoise,
  fbm,
  isPowerOfTwo,
  closestPowerOfTwo,
  nextPowerOfTwo,
  latLonToCartesian,
  cartesianToLatLon,
  almost,
};
