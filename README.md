Maf.js
=============

A library for doin' maf innit

About
-----

Maf.js implements many common useful functions that are not supported in the JavaScript Math library. Instead of adding methods to Math.prototype and risking potential conflicts with future implementations, let's create a Math library with those methods.

There's a mix of GLSL, HLSL, Unity and other libraries and languages.

Methods
------

- clamp( v, minVal, maxVal );
- step( edge, v );
- smoothstep( edge0, edge1, v );
- deg2Rad( degress ), toRadians( degress );
- rad2Deg( radians ), toDegrees( radians );
- clamp01( v );
- mix( x, y, a ), lerp( x, y, a );
- inverseMix( a, b, v ), inverseLerp( a, b, v );
- mixUnclamped( x, y, a ), lerpUnclamped( x, y, a ),
- fract( v );
- isPowerOfTwo( v );
- closestPowerOfTwo( v );
- nextPowerOfTwo( v );
- deltaAngle( a, b ), deltaAngleDeg( a, b ), deltaAngleRad( a, b );
- lerpAngle, lerpAngleDeg, lerpAngleRad;
- gammaToLinearSpace( v );
- linearToGammaSpace( v );
- map( from1, to1, from2, to2, v ), scale( from1, to1, from2, to2, v );
- latLonToCartesian( lat, lon );
- cartesianToLatLon( x, y, z );
- randomInRange( min, max );
- norm( v, minVal, maxVal );
- hash( n );
- noise2d( x, y );
- smoothMin( a, b, k );
- smoothMax( a, b, k );

Coming up (?)
-------
- almostIdentity( x, m, n )
- impulse( k, x );
- cubicPulse( c, w, x );
- expStep( x, k, n );
- parabola( x, k );
- powerCurve( x, a, b );

Discarded
-------
- smoothDamp / smoothDampAngle, smoothDampAngleDeg, smoothDampAngleRad; Can be done with basic functions and easing the time value
- easing functions: there's libraries for that (TweenMax, tween.js)
- perlin functions: there's ImprovedNoise.js

License
-------

MIT licensed

Copyright (C) 2015 Jaume Sanchez Elias http://twitter.com/thespite

http://www.clicktorelease.com
