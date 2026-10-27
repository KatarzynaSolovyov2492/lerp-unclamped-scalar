# lerp-unclamped-scalar

Performs linear interpolation between two scalar values with an extrapolating parameter outside the zero to one range.

```js
import { lerpUnclampedScalar } from 'lerp-unclamped-scalar';

lerpUnclampedScalar(0, 100, 0.5);   // 50
lerpUnclampedScalar(0, 100, 1.5);   // 150 — extrapolated, not clamped
lerpUnclampedScalar(0, 100, -0.5);  // -50
```

## Why

Most lerp implementations clamp the parameter to `[0, 1]`, which is the right default for animation and UI tweening. But extrapolation is sometimes the actual requirement — predicting a value beyond a known range, extending a trend, or feeding a parameter that is deliberately allowed to overshoot. A clamping lerp silently turns those cases into the nearest endpoint, which hides the logic error rather than reporting it.

This library does one thing: `a + t * (b - a)` with no clamping. The trade-off is that callers who actually wanted clamping must do it themselves. That is preferable to a magic flag or a second function that nobody remembers to call.

## Edge cases

- `t = 0` returns `a`; `t = 1` returns `b`.
- `NaN` in any argument propagates as `NaN`. This is deliberate — swallowing `NaN` into a zero would hide upstream data bugs.
- When `a === b` and `t` is finite, the result is `a` regardless of `t`. When `a === b` and `t` is `Infinity`, the result is `NaN` because `Infinity * 0` is `NaN` under IEEE-754. If you interpolate over a zero-width interval with an unbounded parameter, check your inputs.
