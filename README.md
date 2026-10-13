Maf.js
=============

A library for doin' maf innit

Maf.js implements many common useful functions that are not supported in the JavaScript Math library. Instead of adding methods to Math.prototype and risking potential conflicts with future implementations, let's create a Math library with those methods.

There's a mix of GLSL, HLSL, Unity and other libraries and languages.

[![npm](https://img.shields.io/npm/v/spite-maf.svg)](https://www.npmjs.com/package/spite-maf)

Demo
-----

- **[Every function, plotted](https://spite.github.io/Maf.js/demo/)**: each plot is drawn by calling the function that it shows, and reads its values under the pointer. The noises are there as pictures

2026 update
-----

**Disclaimer:** this library is from 2015. `Math` still doesn't have most of these, so it's as useful as it was. If you use three.js, check `MathUtils` first (it's had that name since r113, 2020): it has `clamp`, `lerp`, `inverseLerp`, `mapLinear`, `smoothstep`, `degToRad`, `isPowerOfTwo` and others

The library has been reviewed and has grown. What was fixed from version 1:

- `mix()` and `lerp()` don't clamp, like the `mix` of GLSL and the `lerp` of three.js: outside of 0 and 1 they keep going. They stopped at the ends, and so did `mixUnclamped()`, which was a copy of them. **This is the change most likely to affect your code**: use `mixClamped()` or `lerpClamped()` where you counted on it
- `lerpAngle()` doesn't clamp either
- `deltaAngle()` returns the shortest way from one angle to the other with its sign, from -180 to 180, like the one of Unity. It returned its size only
- `lerpAngle()` takes the shortest way in both directions. It went the long way round when the shortest one was backwards. It's also exported now, only `lerpAngleDeg()` and `lerpAngleRad()` were
- `smoothMax()` uses `k`, it gave the wrong value for any `k` other than 1. And both `smoothMin()` and `smoothMax()` work with big numbers, they returned `Infinity`
- `hash()` and `noise2d()` are a real hash. `hash()` repeated itself every 2π and was the same for a number and its negative, and `noise2d()` had the same pattern in every row. Their values are different from the ones of version 1
- `cartesianToLatLon()` is the opposite of `latLonToCartesian()`: degrees, with y up. It returned radians of a different sphere. `latLonToCartesian()` doesn't limit the latitude to 85 degrees anymore
- `isPowerOfTwo()` is false for 0, for negative numbers and for the ones that are not whole
- `closestPowerOfTwo()` returns the closest one. It could return the next one when the previous was closer, 8 for 5.9
- `map()`, `inverseMix()`, `norm()` and `smoothStep()` return a number when the range they get is empty, not `Infinity` or `NaN`
- the package says it's an ES module, so it can be imported in Node

And what is new:

- moving towards a target: `damp()` and `dampAngle()`, that are the same at any frame rate, and `moveTowards()` and `moveTowardsAngle()`
- random numbers that can be repeated, with `seededRandom()`, and `randomInt()`, `randomSign()`, `randomItem()`, `randomGaussian()`, `randomOnSphere()` and `shuffle()`
- noise: `valueNoise()`, `perlinNoise()` and `fbm()`, in one, two or three dimensions
- clamped versions of the functions that have a range: `mixClamped()`, `lerpClamped()`, `inverseMixClamped()`, `inverseLerpClamped()` and `mapClamped()`
- `smootherStep()`, `wrap()`, `repeat()`, `pingPong()`, `snap()`, `roundTo()`, `saturate()`
- `bias()`, `gain()` and `sinc()` to shape values
- `sRGBToLinear()` and `linearToSRGB()`, the exact ones
- `smoothstep()` with the name it has in GLSL, and `almost()` takes how close is close enough
- types for TypeScript, tests, and a demo

One thing is as it was, and worth knowing: the value goes last in the functions that come from GLSL, like `step()` and `map()`, and first in the others.

How to use
-----

Use npm to install it
```
npm i spite-maf
```
and import what you need, or all of it
```js
import { clamp, lerp, smoothStep } from 'spite-maf';
import * as Maf from 'spite-maf';

Maf.clamp( 1.5, 0, 1 ); // 1
```
It's a single ES module with no dependencies, [Maf.js](Maf.js), so it also works without npm or a bundler. It has types for TypeScript, and `npm test` runs its tests.

Methods
------

Clamping and steps

- `clamp( v, minVal, maxVal )`: the value, not below one nor above the other
- `clamp01( v )`, `saturate( v )`: the same, between 0 and 1
- `step( edge, v )`: 0 below the edge, 1 from it on
- `smoothStep( edge0, edge1, v )`, `smoothstep( edge0, edge1, v )`: from 0 to 1 between the two edges, starting and ending slowly
- `smootherStep( edge0, edge1, v )`, `smootherstep( edge0, edge1, v )`: the same, starting and ending even slower
- `fract( v )`, `frac( v )`: what is after the point
- `mod( a, n )`, `repeat( a, n )`: the remainder, that is never negative
- `wrap( v, minVal, maxVal )`: the value brought into a range that repeats, like an angle into -180 to 180
- `pingPong( v, length )`: goes up to length and back down, over and over
- `snap( v, step, offset )`: the closest multiple of step
- `roundTo( v, decimals )`: rounded to that many decimals

Mixing and mapping

The plain ones do the maths and nothing else: outside of their range they keep going. The ones that say Clamped stop at its ends.

- `mix( x, y, a )`, `lerp( x, y, a )`: from x to y as a goes from 0 to 1. `mixUnclamped()` and `lerpUnclamped()` are other names for them
- `mixClamped( x, y, a )`, `lerpClamped( x, y, a )`: the same, that stops at x and at y
- `inverseMix( a, b, v )`, `inverseLerp( a, b, v )`: where v is between a and b, 0 at a and 1 at b
- `inverseMixClamped( a, b, v )`, `inverseLerpClamped( a, b, v )`: the same, from 0 to 1 and no further
- `norm( v, minVal, maxVal )`: `inverseMix()` with the value first
- `map( from1, to1, from2, to2, v )`, `scale( from1, to1, from2, to2, v )`: a value of one range, in another
- `mapClamped( from1, to1, from2, to2, v )`: the same, that doesn't leave the second range
- `smoothMin( a, b, k )`, `smoothMax( a, b, k )`: the smallest or the biggest of two values, without a corner where they cross. A bigger k is closer to the real one
- `gammaToLinearSpace( v )`, `linearToGammaSpace( v )`: a color value from gamma space to linear and back, with a gamma of 2.2
- `sRGBToLinear( v )`, `linearToSRGB( v )`: the same with the exact curve of sRGB

Moving towards a target

- `damp( current, target, lambda, dt )`: closer to the target on every call, fast at first and slower as it gets there. `dt` is the time since the last call, in seconds, and the result is the same whatever the frame rate is. `lambda` is how fast: with 1 it covers 63% of the way in a second
- `moveTowards( current, target, maxDelta )`: towards the target by maxDelta at most, without going past it
```js
// on every frame, with the seconds since the last one
position = damp( position, target, 4, dt );
```

Shaping, from the [functions of Inigo Quilez](https://iquilezles.org/articles/functions/) and others

- `almostIdentity( x, m, n )`: x, but below m it bends to end at n instead of at zero
- `impulse( k, x )`: grows fast to 1 and falls slowly. The peak is at 1 / k
- `cubicPulse( c, w, x )`: a bump of width w around c
- `expStep( x, k, n )`: a step that falls from 1, sharper with a bigger n
- `parabola( x, k )`: 0 at both ends and 1 in the middle, sharper with a bigger k
- `powerCurve( x, a, b )`: 0 at both ends, with the top where a and b put it
- `sinc( x, k )`: a wave that fades, with its top at 1 / k
- `bias( x, b )`: pushes the values of 0 to 1 towards 0 with b below .5, and towards 1 above
- `gain( x, g )`: pushes them towards the middle with g below .5, and away from it above

Angles, in degrees unless they say Rad

- `deg2Rad( degrees )`, `toRadians( degrees )`
- `rad2Deg( radians )`, `toDegrees( radians )`
- `deltaAngle( a, b )`, `deltaAngleDeg( a, b )`, `deltaAngleRad( a, b )`: the shortest way from a to b, with its sign
- `lerpAngle( a, b, t )`, `lerpAngleDeg( a, b, t )`, `lerpAngleRad( a, b, t )`: from a to b the shortest way. Like `mix()`, it keeps going when t is outside of 0 and 1
- `dampAngle( current, target, lambda, dt )`, `dampAngleRad( ... )`: `damp()` for angles, the shortest way
- `moveTowardsAngle( current, target, maxDelta )`, `moveTowardsAngleRad( ... )`: `moveTowards()` for angles

Random

- `seededRandom( seed )`: returns a function like `Math.random`, that gives the same numbers every time for the same seed. The seed is a number or a string
- `randomInRange( min, max )`
- `randomInt( min, max )`: a whole number, that can be any of the two
- `randomSign()`: 1 or -1
- `randomItem( array )`: one of them
- `randomGaussian( mean, deviation )`: around the mean, closer to it more often
- `randomOnSphere()`: the `{ x, y, z }` of a point of the sphere of radius 1, all of them as likely
- `shuffle( array )`: changes the order of the array, and returns it

All of them take the function that gives the numbers as their last parameter, `Math.random` by default:
```js
const random = seededRandom( 'my sketch' );

randomInRange( 0, 10, random );
shuffle( cards, random );
```

Noise

- `hash( ...values )`: a number from 0 to 1 that looks random, and is the same for the same numbers. It takes as many as you give it
- `hashInt( ...values )`: the same, as a whole number of 32 bits
- `noise2d( x, y )`: `hash( x, y )`
- `valueNoise( x, y, z )`: noise that changes smoothly, from 0 to 1. `y` and `z` are optional, in all of them
- `perlinNoise( x, y, z )`: the noise of Ken Perlin, from -1 to 1. It's 0 at the whole numbers
- `fbm( x, y, z, options )`: several noises added, each one smaller and finer than the one before, from -1 to 1. The options are `octaves` (5), `lacunarity` (2), `gain` (0.5) and `noise`, the function that is added (`perlinNoise`)

The rest

- `isPowerOfTwo( v )`
- `closestPowerOfTwo( v )`
- `nextPowerOfTwo( v )`: the power of two that is v or the first after it
- `latLonToCartesian( lat, lon )`: latitude and longitude in degrees, to the `{ x, y, z }` of a point of a sphere of radius 1, with y up
- `cartesianToLatLon( x, y, z )`: the opposite, to `{ lat, lon }` in degrees
- `almost( a, b, epsilon )`: if two values are closer than epsilon, 0.0001 by default
- `PI`, `TAU`, `VERSION`

Discarded
-------
- smoothDamp / smoothDampAngle, smoothDampAngleDeg, smoothDampAngleRad: `damp()` and `dampAngle()` do that job without having to keep a velocity
- easing functions: there's libraries for that (GSAP, tween.js)
- vectors, matrices and colors: every function takes numbers. three.js and gl-matrix have those

License
-------

MIT licensed

Copyright (C) 2015 Jaume Sanchez Elias https://twitter.com/thespite

https://www.clicktorelease.com
