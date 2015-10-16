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

Coming up (?)
-------
- smoothDamp;
- smoothDampAngle, smoothDampAngleDeg, smoothDampAngleRad;

License
-------

MIT licensed

Copyright (C) 2015 Jaume Sanchez Elias http://twitter.com/thespite

http://www.clicktorelease.com