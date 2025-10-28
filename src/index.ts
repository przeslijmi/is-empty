import { toNumberIfNumeric } from './numerization.js';
import { defaultOptions, globalOptions, IsEmptyOptions } from './options.js';

export function isEmpty(
  value?: any,
  options: Partial<IsEmptyOptions> = {},
): boolean {
  const opts: IsEmptyOptions = { ...defaultOptions, ...globalOptions, ...options };

  // Basic tests.
  if (value === null || value === undefined) return true;

  // Boolean test.
  if (typeof value === 'boolean') {
    return (opts.treatBooleanAsNonEmpty ? false : !value);
  }

  // Convert numeric strings into numbers if needed.
  if (typeof value === 'string' && opts.treatNumericStringsAsNumbers) {
    value = toNumberIfNumeric(value);
  }

  // String specific validation.
  if (typeof value === 'string') {
    const str = opts.treatSpaceAsEmpty ? value.trim() : value;
    return str.length === 0;
  }

  // Number specific validation.
  if (typeof value === 'number') {
    return opts.treatZeroAsEmpty ? value === 0 : false;
  }

  // Array specific validation + recursiveness.
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    if (value.length === 1 && opts.testArraysRecursively) return isEmpty(value[0], options);
  }

  // Object specific validation.
  if (typeof value === 'object') {

    if (value instanceof Error) return !value.message;

    const objStr = value.toString();

    if ([ '[object File]', '[object Map]', '[object Set]'].some(s => s === objStr)) {
      return value.size === 0;
    } else {
      return Object.keys(value).length === 0;
    }
  }

  // Function specific validation.
  if (typeof value === 'function') {

    // Quick parameter check — skip multi-param functions fast
    if (value.length > 0) return false;

    if (!opts.testFunctionsBody) return true;

    // Stringify and normalize the function
    const fnStr = value
      .toString()
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, '');                    // remove whitespace

    // Match truly empty bodies
    if (fnStr === 'function(){}' || fnStr === '()=>{}') return true;

    return false;
  }

  return false;
}

export { undefinedIfEmpty, isNotEmpty, empty, notEmpty } from './aliases.js'
