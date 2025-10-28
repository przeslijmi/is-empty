import { describe, it, expect } from 'vitest';
import { isEmpty } from '../src/index.js';
import { setGlobalOptions } from '../src/options.js';

describe('isEmpty with changed options', () => {

  it('test treatBooleanAsNonEmpty option', () => {

    // This works cause `treatBooleanAsNonEmpty` is true by default.
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);

    // Now `treatBooleanAsNonEmpty` is set to false for the runtime.
    setGlobalOptions({
      treatBooleanAsNonEmpty: false,
    });

    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(true);
  });

});
