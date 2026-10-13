import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as Maf from '../Maf.js';

const near = ( a, b, e = 1e-9 ) => Math.abs( a - b ) < e;
const check = ( name, fn ) => test( name, () => assert.ok( fn() ) );

check( 'exports', () => [ 'smoothstep', 'smoothStep', 'lerpAngle', 'lerp', 'mix', 'TAU', 'almost' ].every( n => n in Maf ) && Object.keys( Maf ).length === 84 );
check( 'clamp', () => Maf.clamp( 5, 0, 1 ) === 1 && Maf.clamp( - 5, 0, 1 ) === 0 && Maf.clamp01( .3 ) === .3 );
check( 'step', () => Maf.step( .5, .4 ) === 0 && Maf.step( .5, .5 ) === 1 );
check( 'smoothStep', () => Maf.smoothStep( 0, 1, .5 ) === .5 && Maf.smoothstep( 0, 1, 2 ) === 1 && Maf.smoothStep( 2, 4, 2 ) === 0 );
check( 'angles', () => near( Maf.toRadians( 180 ), Math.PI ) && near( Maf.rad2Deg( Math.PI ), 180 ) );
check( 'mix does not clamp', () => Maf.mix( 10, 20, .5 ) === 15 && Maf.lerp( 10, 20, 2 ) === 30 && Maf.mix( 10, 20, - 1 ) === 0 && Maf.mix( 3, 7, 0 ) === 3 && Maf.mix( 3, 7, 1 ) === 7 );
check( 'mixClamped', () => Maf.mixClamped( 10, 20, .5 ) === 15 && Maf.lerpClamped( 10, 20, 2 ) === 20 && Maf.mixClamped( 10, 20, - 1 ) === 10 && Maf.lerpClamped === Maf.mixClamped );
check( 'inverseMixClamped', () => Maf.inverseMixClamped( 10, 20, 15 ) === .5 && Maf.inverseLerpClamped( 10, 20, 25 ) === 1 && Maf.inverseMixClamped( 10, 20, 5 ) === 0 && Maf.inverseMix( 10, 20, 25 ) === 1.5 );
check( 'mixUnclamped is mix', () => Maf.mixUnclamped === Maf.mix && Maf.lerpUnclamped === Maf.mix && Maf.lerp === Maf.mix );
check( 'inverseMix', () => Maf.inverseLerp( 10, 20, 15 ) === .5 );
check( 'fract', () => near( Maf.fract( 1.25 ), .25 ) && near( Maf.frac( - .25 ), .75 ) );
check( 'isPowerOfTwo', () => [ 1, 2, 4, 1024, 2 ** 40 ].every( Maf.isPowerOfTwo ) && ! [ 0, - 2, 3, 6, 2.5, .5, NaN, Infinity ].some( Maf.isPowerOfTwo ) );
check( 'closestPowerOfTwo', () => Maf.closestPowerOfTwo( 5 ) === 4 && Maf.closestPowerOfTwo( 5.9 ) === 4 && Maf.closestPowerOfTwo( 6.1 ) === 8 && Maf.closestPowerOfTwo( 1000 ) === 1024 && Maf.closestPowerOfTwo( 16 ) === 16 && Maf.closestPowerOfTwo( .3 ) === .25 && Maf.closestPowerOfTwo( 0 ) === 0 );
check( 'nextPowerOfTwo', () => Maf.nextPowerOfTwo( 5 ) === 8 && Maf.nextPowerOfTwo( 16 ) === 16 && Maf.nextPowerOfTwo( 17 ) === 32 && Maf.nextPowerOfTwo( - 1 ) === 0 );
check( 'mod', () => Maf.mod( - 1, 5 ) === 4 && Maf.mod( 7, 5 ) === 2 );
check( 'deltaAngle', () => Maf.deltaAngle( 10, 350 ) === - 20 && Maf.deltaAngle( 350, 10 ) === 20 && Maf.deltaAngle( 0, 180 ) === 180 && Maf.deltaAngle( 0, 181 ) === - 179 && Maf.deltaAngleDeg( 720, 90 ) === 90 && near( Maf.deltaAngleRad( 0, - Math.PI / 2 ), - Math.PI / 2 ) );
check( 'lerpAngle', () => Maf.lerpAngle( 10, 350, .5 ) === 0 && Maf.lerpAngle( 350, 10, .5 ) === 0 && Maf.lerpAngle( 0, 90, .5 ) === 45 && Maf.lerpAngleDeg( 350, 10, .25 ) === 355 && near( Maf.lerpAngleRad( 0, Math.PI / 2, .5 ), Math.PI / 4 ) && Maf.lerpAngle( 10, 350, 1 ) === 350 && Maf.lerpAngle( 0, 90, 2 ) === 180 && Maf.lerpAngle( 0, 90, - 1 ) === 270 );
check( 'gamma', () => near( Maf.linearToGammaSpace( Maf.gammaToLinearSpace( .5 ) ), .5 ) );
check( 'map', () => Maf.map( 0, 10, 100, 200, 5 ) === 150 && Maf.scale( 0, 1, 1, 0, .25 ) === .75 && Maf.norm( 15, 10, 20 ) === .5 );
check( 'shaping', () => near( Maf.impulse( 2, .5 ), 1 ) && Maf.cubicPulse( 0, 1, 0 ) === 1 && Maf.cubicPulse( 0, 1, 2 ) === 0 && Maf.parabola( .5, 2 ) === 1 && Maf.parabola( 0, 1 ) === 0 && Maf.expStep( 0, 1, 2 ) === 1 && near( Maf.powerCurve( .5, 1, 1 ), 1 ) && Maf.almostIdentity( 2, 1, .1 ) === 2 && near( Maf.almostIdentity( 0, 1, .1 ), .1 ) );
const there = Maf.latLonToCartesian( 41.38, 2.17 ), back = Maf.cartesianToLatLon( there.x * 3, there.y * 3, there.z * 3 );
const pole = Maf.latLonToCartesian( 90, 0 ), far = Maf.cartesianToLatLon( ...Object.values( Maf.latLonToCartesian( - 88, - 170 ) ) );
check( 'latLon', () => near( back.lat, 41.38, 1e-9 ) && near( back.lon, 2.17, 1e-9 ) && near( pole.y, 1 ) && near( Math.hypot( there.x, there.y, there.z ), 1 ) && near( far.lat, - 88, 1e-9 ) && near( far.lon, - 170, 1e-9 ) && near( Maf.latLonToCartesian( 0, 0 ).x, 1 ) );
const rnd = Array.from( { length: 1000 }, () => Maf.randomInRange( 5, 6 ) );
check( 'random', () => Math.min( ...rnd ) >= 5 && Math.max( ...rnd ) < 6 );

check( 'smoothMin', () => Maf.smoothMin( 1, 5, 8 ) < 1 && near( Maf.smoothMin( 1, 5, 8 ), 1, 1e-3 ) && near( Maf.smoothMin( 2, 2, 4 ), 2 - Math.log( 2 ) / 4 ) );
check( 'smoothMax', () => Maf.smoothMax( 1, 5, 8 ) > 5 && near( Maf.smoothMax( 1, 5, 8 ), 5, 1e-3 ) && near( Maf.smoothMax( 2, 2, 4 ), 2 + Math.log( 2 ) / 4 ) && near( Maf.smoothMax( 1, 5, 8 ), - Maf.smoothMin( - 1, - 5, 8 ) ) );
check( 'almost', () => Maf.almost( 1, 1.00001 ) && ! Maf.almost( 1, 1.01 ) && Maf.almost( 1, 1.01, .1 ) );
check( 'version', () => Maf.VERSION === '2.0.0' && Maf.TAU === 2 * Math.PI );

// ---- what version 2 adds

check( 'degenerate ranges', () => Maf.map( 0, 0, 1, 2, 5 ) === 1 && Maf.smoothStep( 1, 1, 1 ) === 1 && Maf.smoothStep( 1, 1, .5 ) === 0 && Maf.inverseMix( 3, 3, 9 ) === 0 && Maf.norm( 9, 3, 3 ) === 0 );
check( 'smoothMin and smoothMax of big numbers', () => near( Maf.smoothMin( 30, 40, 32 ), 30, 1e-6 ) && near( Maf.smoothMin( 100, 200, 32 ), 100 ) && near( Maf.smoothMax( 100, 200, 8 ), 200 ) && near( Maf.smoothMax( - 100, - 200, 32 ), - 100 ) && near( Maf.smoothMin( 1e6, 1e6 + 1, 4 ), 1e6, 1e-1 ) );
check( 'saturate', () => Maf.saturate( 2 ) === 1 && Maf.saturate === Maf.clamp01 );
check( 'smootherStep', () => Maf.smootherStep( 0, 1, .5 ) === .5 && Maf.smootherstep( 0, 1, 0 ) === 0 && Maf.smootherStep( 0, 1, 1 ) === 1 && Maf.smootherStep( 0, 1, .25 ) < Maf.smoothStep( 0, 1, .25 ) && Maf.smootherStep( 2, 2, 3 ) === 1 );
check( 'wrap, repeat and pingPong', () => Maf.wrap( 370, 0, 360 ) === 10 && Maf.wrap( - 190, - 180, 180 ) === 170 && Maf.wrap( 5, 2, 4 ) === 3 && Maf.repeat( - 1, 3 ) === 2 && Maf.pingPong( .25 ) === .25 && Maf.pingPong( 1.25 ) === .75 && Maf.pingPong( 2.5 ) === .5 && Maf.pingPong( 7, 3 ) === 1 && Maf.pingPong( - .25 ) === .25 );
check( 'snap and roundTo', () => Maf.snap( 7, 5 ) === 5 && Maf.snap( 8, 5 ) === 10 && near( Maf.snap( .34, .25 ), .25 ) && Maf.snap( 7, 5, 1 ) === 6 && Maf.roundTo( 3.14159, 2 ) === 3.14 && Maf.roundTo( 1234, - 2 ) === 1200 && Maf.roundTo( 2.5 ) === 3 );
check( 'mapClamped', () => Maf.mapClamped( 0, 1, 10, 20, 2 ) === 20 && Maf.mapClamped( 0, 1, 20, 10, 2 ) === 10 && Maf.mapClamped( 0, 1, 10, 20, .5 ) === 15 && Maf.mapClamped( 0, 1, 20, 10, - 1 ) === 20 );
check( 'moveTowards', () => Maf.moveTowards( 0, 10, 3 ) === 3 && Maf.moveTowards( 9, 10, 3 ) === 10 && Maf.moveTowards( 0, - 10, 3 ) === - 3 && Maf.moveTowards( 5, 5, 1 ) === 5 );
check( 'damp is the same at any frame rate', () => {

	const run = ( dt ) => { let v = 0; for ( let t = 0; t < 1 - 1e-9; t += dt ) v = Maf.damp( v, 10, 3, dt ); return v; };
	return near( run( 1 / 60 ), run( 1 / 10 ), 1e-9 ) && near( run( 1 / 60 ), 10 * ( 1 - Math.exp( - 3 ) ), 1e-9 ) && Maf.damp( 2, 8, 5, 0 ) === 2;

} );
check( 'angles towards a target', () => Maf.moveTowardsAngle( 350, 10, 5 ) === 355 && Maf.moveTowardsAngle( 10, 350, 5 ) === 5 && Maf.moveTowardsAngle( 350, 10, 90 ) === 10 && near( Maf.moveTowardsAngleRad( 0, Math.PI, Math.PI / 4 ), Math.PI / 4 ) && Maf.dampAngle( 350, 10, 1e9, 1 ) === 10 && near( Maf.dampAngle( 350, 10, 1, 1 ), Maf.mod( 350 + 20 * ( 1 - Math.exp( - 1 ) ), 360 ) ) && near( Maf.dampAngleRad( 0, 1, 1e9, 1 ), 1 ) );
check( 'sRGB', () => near( Maf.sRGBToLinear( .5 ), .21404114, 1e-7 ) && near( Maf.linearToSRGB( Maf.sRGBToLinear( .3 ) ), .3 ) && near( Maf.linearToSRGB( Maf.sRGBToLinear( .01 ) ), .01 ) && Maf.sRGBToLinear( 0 ) === 0 && near( Maf.sRGBToLinear( 1 ), 1 ) );
check( 'bias, gain and sinc', () => near( Maf.bias( .5, .5 ), .5 ) && near( Maf.bias( .5, .2 ), .2 ) && Maf.bias( 0, .3 ) === 0 && near( Maf.bias( 1, .3 ), 1 ) && near( Maf.gain( .5, .2 ), .5 ) && Maf.gain( .25, .2 ) < .25 && Maf.gain( .25, .8 ) > .25 && near( Maf.gain( .3, .5 ), .3 ) && Maf.sinc( .5, 2 ) === 1 && near( Maf.sinc( 1, 1 ), 1 ) && Math.abs( Maf.sinc( 1, 3 ) ) < 1e-9 );
check( 'seededRandom', () => {

	const a = Maf.seededRandom( 42 ), b = Maf.seededRandom( 42 ), c = Maf.seededRandom( 43 ), s = Maf.seededRandom( 'maf' ), s2 = Maf.seededRandom( 'maf' );
	const first = [ a(), a(), a() ], values = Array.from( { length: 20000 }, a );
	return first.join() === [ b(), b(), b() ].join() && first[ 0 ] !== c() && s() === s2() && values.every( v => v >= 0 && v < 1 ) && near( values.reduce( ( x, y ) => x + y ) / values.length, .5, .01 );

} );
check( 'random helpers', () => {

	const random = Maf.seededRandom( 7 );
	const ints = Array.from( { length: 5000 }, () => Maf.randomInt( 2, 5, random ) );
	const gauss = Array.from( { length: 20000 }, () => Maf.randomGaussian( 10, 2, random ) );
	const mean = gauss.reduce( ( a, b ) => a + b ) / gauss.length, sd = Math.sqrt( gauss.reduce( ( a, b ) => a + ( b - mean ) ** 2, 0 ) / gauss.length );
	const p = Maf.randomOnSphere( random ), list = [ 1, 2, 3, 4, 5, 6, 7, 8 ], same = Maf.shuffle( list, random );
	return new Set( ints ).size === 4 && Math.min( ...ints ) === 2 && Math.max( ...ints ) === 5 && near( mean, 10, .1 ) && near( sd, 2, .1 ) && near( Math.hypot( p.x, p.y, p.z ), 1 ) && same === list && list.slice().sort().join() === '1,2,3,4,5,6,7,8' && list.join() !== '1,2,3,4,5,6,7,8' && [ 'a', 'b' ].includes( Maf.randomItem( [ 'a', 'b' ], random ) ) && [ - 1, 1 ].includes( Maf.randomSign( random ) ) && Maf.randomInRange( 5, 6, () => .5 ) === 5.5 && Maf.shuffle( [ 1, 2, 3 ], Maf.seededRandom( 1 ) ).join() === Maf.shuffle( [ 1, 2, 3 ], Maf.seededRandom( 1 ) ).join();

} );
check( 'hash', () => {

	const values = Array.from( { length: 20000 }, ( _, j ) => Maf.hash( j ) );
	const mean = values.reduce( ( a, b ) => a + b ) / values.length;
	// rows are not the same pattern moved
	const d = [ 0, 1, 2, 3 ].map( x => Maf.mod( Maf.noise2d( x, 5 ) - Maf.noise2d( x, 9 ), 1 ).toFixed( 4 ) );
	return Maf.hash( 3 ) === Maf.hash( 3 ) && Maf.hash( 2 ) !== Maf.hash( - 2 ) && Maf.hash( 1 ) !== Maf.hash( 1 + 2 * Math.PI ) && Maf.hash( 0 ) === Maf.hash( - 0 ) && values.every( v => v >= 0 && v < 1 ) && near( mean, .5, .01 ) && new Set( values ).size > 19990 && Maf.hash( 1, 2 ) !== Maf.hash( 2, 1 ) && Maf.hash( 1, 2, 3 ) !== Maf.hash( 1, 2 ) && Maf.noise2d( 1, 2 ) === Maf.hash( 1, 2 ) && new Set( d ).size === 4 && Number.isInteger( Maf.hashInt( 5 ) ) && Maf.hashInt( 5 ) >= 0 && Maf.hashInt( 5 ) < 2 ** 32;

} );
check( 'valueNoise', () => {

	let worst = 0, lo = 1, hi = 0;
	for ( let x = 0; x < 20; x += .01 ) { const a = Maf.valueNoise( x, .3, .7 ), b = Maf.valueNoise( x + .01, .3, .7 ); worst = Math.max( worst, Math.abs( a - b ) ); lo = Math.min( lo, a ); hi = Math.max( hi, a ); }
	return Maf.valueNoise( 3, 4 ) === Maf.hash( 3, 4, 0 ) && Maf.valueNoise( 2 ) === Maf.hash( 2, 0, 0 ) && worst < .03 && lo >= 0 && hi <= 1 && hi - lo > .5 && Maf.valueNoise( 1.5, 2.5, 3.5 ) === Maf.valueNoise( 1.5, 2.5, 3.5 ) && Maf.valueNoise( 1.5, 2.5, 3.5 ) !== Maf.valueNoise( 1.5, 2.5, 4.5 );

} );
check( 'perlinNoise and fbm', () => {

	let worst = 0, lo = 0, hi = 0, sum = 0, n = 0, fl = 0, fh = 0;
	for ( let x = 0; x < 40; x += .01 ) { const a = Maf.perlinNoise( x, x * .37, .5 ), b = Maf.perlinNoise( x + .01, ( x + .01 ) * .37, .5 ), f = Maf.fbm( x, .5 ); worst = Math.max( worst, Math.abs( a - b ) ); lo = Math.min( lo, a ); hi = Math.max( hi, a ); sum += a; n ++; fl = Math.min( fl, f ); fh = Math.max( fh, f ); }
	return Maf.perlinNoise( 3, 4, 5 ) === 0 && worst < .05 && lo < - .4 && hi > .4 && lo >= - 1 && hi <= 1 && Math.abs( sum / n ) < .1 && fl < - .2 && fh > .2 && fl >= - 1 && fh <= 1 && Maf.fbm( 1.3, 2.1, 0, { octaves: 1 } ) === Maf.perlinNoise( 1.3, 2.1, 0 ) && Maf.fbm( 1.3, 2.1, 0, { octaves: 3, noise: Maf.valueNoise } ) > 0;

} );
