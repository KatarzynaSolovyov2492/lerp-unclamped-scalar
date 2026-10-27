import { test } from 'node:test';
import assert from 'node:assert/strict';

import { lerpUnclampedScalar } from '../src/index.js';

const EPS = 1e-12;

function approxEqual(got, want) {
  if (Number.isNaN(got) && Number.isNaN(want)) return;
  assert.ok(
    Math.abs(got - want) < EPS,
    `expected ${want}, got ${got}`
  );
}

test('returns a when t is 0', () => {
  approxEqual(lerpUnclampedScalar(10, 20, 0), 10);
});

test('returns b when t is 1', () => {
  approxEqual(lerpUnclampedScalar(10, 20, 1), 20);
});

test('returns midpoint when t is 0.5', () => {
  approxEqual(lerpUnclampedScalar(10, 20, 0.5), 15);
});

test('extrapolates below a when t is negative', () => {
  approxEqual(lerpUnclampedScalar(10, 20, -1), 0);
});

test('extrapolates above b when t exceeds 1', () => {
  approxEqual(lerpUnclampedScalar(10, 20, 2), 30);
});

test('handles negative endpoints', () => {
  approxEqual(lerpUnclampedScalar(-10, -20, 0.5), -15);
});

test('handles mixed-sign endpoints', () => {
  approxEqual(lerpUnclampedScalar(-10, 10, 0.5), 0);
});

test('handles fractional extrapolation', () => {
  approxEqual(lerpUnclampedScalar(2, 4, -0.5), 1);
});

test('handles zero-width interval', () => {
  approxEqual(lerpUnclampedScalar(5, 5, 100), 5);
});

test('propagates NaN from any argument', () => {
  assert.ok(Number.isNaN(lerpUnclampedScalar(NaN, 10, 0.5)));
  assert.ok(Number.isNaN(lerpUnclampedScalar(10, NaN, 0.5)));
  assert.ok(Number.isNaN(lerpUnclampedScalar(10, 20, NaN)));
});

test('propagates Infinity from t', () => {
  assert.strictEqual(lerpUnclampedScalar(1, 2, Infinity), Infinity);
  assert.strictEqual(lerpUnclampedScalar(1, 2, -Infinity), -Infinity);
});

test('returns 0 from 0 * Infinity when interval is zero and t is infinite', () => {
  // (b - a) is 0, so t * 0 = NaN under IEEE-754, and a + NaN = NaN.
  assert.ok(Number.isNaN(lerpUnclampedScalar(5, 5, Infinity)));
});

test('handles very small t values', () => {
  approxEqual(lerpUnclampedScalar(0, 1, 1e-15), 1e-15);
});

test('handles large endpoint magnitudes', () => {
  approxEqual(lerpUnclampedScalar(1e15, 2e15, 0.5), 1.5e15);
});
