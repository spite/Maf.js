/** A function like Math.random: a number from 0 to 1, without the 1. */
export type Random = () => number;

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface LatLon {
  lat: number;
  lon: number;
}

export interface FbmOptions {
  /** How many noises are added. 5 by default. */
  octaves?: number;
  /** How much finer each one is than the one before. 2 by default. */
  lacunarity?: number;
  /** How much smaller each one is than the one before. 0.5 by default. */
  gain?: number;
  /** The noise that is added. perlinNoise by default. */
  noise?: (x: number, y: number, z: number) => number;
}

export const VERSION: string;
export const PI: number;
export const TAU: number;

export function clamp(v: number, minVal: number, maxVal: number): number;
export function clamp01(v: number): number;
export const saturate: typeof clamp01;
export function step(edge: number, v: number): number;
export function smoothStep(edge0: number, edge1: number, v: number): number;
export const smoothstep: typeof smoothStep;
export function smootherStep(edge0: number, edge1: number, v: number): number;
export const smootherstep: typeof smootherStep;
export function fract(v: number): number;
export const frac: typeof fract;
/** The remainder, that is never negative. */
export function mod(a: number, n: number): number;
export const repeat: typeof mod;
export function wrap(v: number, minVal: number, maxVal: number): number;
export function pingPong(v: number, length?: number): number;
export function snap(v: number, step: number, offset?: number): number;
export function roundTo(v: number, decimals?: number): number;

/** From x to y as a goes from 0 to 1, and further outside of that, like the one of GLSL. */
export function mix(x: number, y: number, a: number): number;
export const lerp: typeof mix;
export const mixUnclamped: typeof mix;
export const lerpUnclamped: typeof mix;
/** From x to y as a goes from 0 to 1, and no further. */
export function mixClamped(x: number, y: number, a: number): number;
export const lerpClamped: typeof mixClamped;
export function inverseMix(a: number, b: number, v: number): number;
export const inverseLerp: typeof inverseMix;
/** Where v is between a and b, from 0 to 1 and no further. */
export function inverseMixClamped(a: number, b: number, v: number): number;
export const inverseLerpClamped: typeof inverseMixClamped;
export function norm(v: number, minVal: number, maxVal: number): number;
export function map(from1: number, to1: number, from2: number, to2: number, v: number): number;
export const scale: typeof map;
export function mapClamped(from1: number, to1: number, from2: number, to2: number, v: number): number;
export function moveTowards(current: number, target: number, maxDelta: number): number;
/** Towards the target, the same whatever the time between frames is. */
export function damp(current: number, target: number, lambda: number, dt: number): number;
export function smoothMin(a: number, b: number, k: number): number;
export function smoothMax(a: number, b: number, k: number): number;

export function gammaToLinearSpace(v: number): number;
export function linearToGammaSpace(v: number): number;
export function sRGBToLinear(v: number): number;
export function linearToSRGB(v: number): number;

export function almostIdentity(x: number, m: number, n: number): number;
export function impulse(k: number, x: number): number;
export function cubicPulse(c: number, w: number, x: number): number;
export function expStep(x: number, k: number, n: number): number;
export function parabola(x: number, k: number): number;
export function powerCurve(x: number, a: number, b: number): number;
export function sinc(x: number, k: number): number;
export function bias(x: number, b: number): number;
export function gain(x: number, g: number): number;

export function deg2Rad(degrees: number): number;
export const toRadians: typeof deg2Rad;
export function rad2Deg(radians: number): number;
export const toDegrees: typeof rad2Deg;
/** The shortest way from a to b in degrees, with its sign: from -180 to 180. */
export function deltaAngle(a: number, b: number): number;
export const deltaAngleDeg: typeof deltaAngle;
export function deltaAngleRad(a: number, b: number): number;
export function lerpAngle(a: number, b: number, t: number): number;
export const lerpAngleDeg: typeof lerpAngle;
export function lerpAngleRad(a: number, b: number, t: number): number;
export function moveTowardsAngle(current: number, target: number, maxDelta: number): number;
export function moveTowardsAngleRad(current: number, target: number, maxDelta: number): number;
export function dampAngle(current: number, target: number, lambda: number, dt: number): number;
export function dampAngleRad(current: number, target: number, lambda: number, dt: number): number;

/** A function like Math.random, that gives the same numbers for the same seed. */
export function seededRandom(seed?: number | string): Random;
export function randomInRange(min: number, max: number, random?: Random): number;
/** A whole number, that can be any of the two ends. */
export function randomInt(min: number, max: number, random?: Random): number;
export function randomSign(random?: Random): 1 | -1;
export function randomItem<T>(array: ArrayLike<T>, random?: Random): T;
export function randomGaussian(mean?: number, deviation?: number, random?: Random): number;
export function randomOnSphere(random?: Random): Point;
/** Changes the order of the array, and returns it. */
export function shuffle<T extends unknown[]>(array: T, random?: Random): T;

/** A number from 0 to 1 that looks random, and is the same for the same numbers. */
export function hash(...values: number[]): number;
/** The same, as a whole number of 32 bits. */
export function hashInt(...values: number[]): number;
export function noise2d(x: number, y: number): number;
/** Noise that changes smoothly, from 0 to 1. */
export function valueNoise(x: number, y?: number, z?: number): number;
/** The noise of Ken Perlin, from -1 to 1. */
export function perlinNoise(x: number, y?: number, z?: number): number;
export function fbm(x: number, y?: number, z?: number, options?: FbmOptions): number;

export function isPowerOfTwo(v: number): boolean;
export function closestPowerOfTwo(v: number): number;
export function nextPowerOfTwo(v: number): number;
/** Degrees to a point on the sphere of radius 1, with y up. */
export function latLonToCartesian(lat: number, lon: number): Point;
export function cartesianToLatLon(x: number, y: number, z: number): LatLon;
export function almost(a: number, b: number, epsilon?: number): boolean;
