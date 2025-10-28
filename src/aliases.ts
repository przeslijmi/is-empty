import { isEmpty } from './index.js';
import { IsEmptyOptions } from './options.js';

export function isNotEmpty(value?: any, options: Partial<IsEmptyOptions> = {}): boolean {
  return !isEmpty(value, options);
}

export function empty(value?: any, options: Partial<IsEmptyOptions> = {}): boolean {
  return isEmpty(value, options);
}

export function notEmpty(value?: any, options: Partial<IsEmptyOptions> = {}): boolean {
  return !isEmpty(value, options);
}

export function undefinedIfEmpty<T>(value: T, options: Partial<IsEmptyOptions> = {}): T|undefined {
  return ( isEmpty(value, options) ? undefined : value );
}
