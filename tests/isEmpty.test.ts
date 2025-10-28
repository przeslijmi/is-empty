import { describe, it, expect } from 'vitest';
import { isEmpty } from '../src/index.js';
import { isNotEmpty, empty, notEmpty } from '../src/aliases.js'

describe('isEmpty with default options', () => {

  it('returns true for empty values', () => {
    expect(isEmpty()).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([''])).toBe(true);
    expect(isEmpty([undefined])).toBe(true);
    expect(isEmpty([null])).toBe(true);
    expect(isEmpty([[]])).toBe(true);
    expect(isEmpty([['']])).toBe(true);
    expect(isEmpty([[undefined]])).toBe(true);
    expect(isEmpty([[null]])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(' ')).toBe(true);
    expect(isEmpty('  ')).toBe(true);
    expect(isEmpty('   ')).toBe(true); // Alt+0160 (&nbsp;) in the middle
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(0.0)).toBe(true);
    expect(isEmpty('0')).toBe(true);
    expect(isEmpty('0.0')).toBe(true);
    expect(isEmpty(function(){})).toBe(true);
    expect(isEmpty(function(){/*return true;*/})).toBe(true);
    expect(isEmpty(function(){return true;})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Error())).toBe(true);
  });

  it('returns false for non-empty values', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(['a', 'b'])).toBe(false);
    expect(isEmpty({ a: 'b' })).toBe(false);
    expect(isEmpty('string')).toBe(false);
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(function(a,b){})).toBe(false);
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
    expect(isEmpty(new Error('fail'))).toBe(false);
  });

});

describe('isEmpty with changed options', () => {

  it('test treatBooleanAsNonEmpty option', () => {
    expect(isEmpty(true, { treatBooleanAsNonEmpty: true })).toBe(false);
    expect(isEmpty(false, { treatBooleanAsNonEmpty: true })).toBe(false);
    expect(isEmpty(true, { treatBooleanAsNonEmpty: false })).toBe(false);
    expect(isEmpty(false, { treatBooleanAsNonEmpty: false })).toBe(true);
  });

  it('test treatSpaceAsEmpty option', () => {
    expect(isEmpty(' ', { treatSpaceAsEmpty: true })).toBe(true);
    expect(isEmpty(' ', { treatSpaceAsEmpty: false })).toBe(false);
  });

  it('test treatZeroAsEmpty option', () => {
    expect(isEmpty(0, { treatZeroAsEmpty: true })).toBe(true);
    expect(isEmpty(0, { treatZeroAsEmpty: false })).toBe(false);
  });

  it('test treatNumericStringsAsNumbers option', () => {
    expect(isEmpty('0', { treatNumericStringsAsNumbers: true, treatZeroAsEmpty: false })).toBe(false); // As number zero - non-empty.
    expect(isEmpty('0', { treatNumericStringsAsNumbers: true })).toBe(true);                           // As number zero - empty.
    expect(isEmpty('0', { treatNumericStringsAsNumbers: false })).toBe(false);                         // As non-empty string.
  });

  it('test testArraysRecursively option', () => {
    expect(isEmpty([undefined], { testArraysRecursively: true })).toBe(true);
    expect(isEmpty([[null]], { testArraysRecursively: true })).toBe(true);
    expect(isEmpty([['a']], { testArraysRecursively: true })).toBe(false);
    expect(isEmpty([undefined], { testArraysRecursively: false })).toBe(false);
    expect(isEmpty([[null]], { testArraysRecursively: false })).toBe(false);
    expect(isEmpty([['a']], { testArraysRecursively: false })).toBe(false);
  });

  it('test testFunctionsBody option', () => {

    expect(isEmpty(function(){}, { testFunctionsBody: false })).toBe(true);
    expect(isEmpty(function(){/*return true;*/}, { testFunctionsBody: false })).toBe(true);
    expect(isEmpty(function(){return true;}, { testFunctionsBody: false })).toBe(true);
    expect(isEmpty(function(a,b){}, { testFunctionsBody: false })).toBe(false);

    expect(isEmpty(function(){}, { testFunctionsBody: true })).toBe(true);
    expect(isEmpty(function(){/*return true;*/}, { testFunctionsBody: true })).toBe(true); // Body exists - but it's only comment.
    expect(isEmpty(function(){return true;}, { testFunctionsBody: true })).toBe(false);    // There is body.
    expect(isEmpty(function(a,b){}, { testFunctionsBody: true })).toBe(false);             // There are parameters - so body is not considered.

  });

});

describe('aliases', () => {

  const toCheck:any[] = [
    undefined,
    null,
    '',
    '  ',
    0,
    '0',
    function(){},
    ['a', 'b'],
    'string',
    function(a,b){},
  ];

  it('empty works', () => {
    toCheck.forEach((v: any) => {
      expect(isEmpty(v)).toBe(empty(v));
    })
  });

  it('notEmpty works', () => {
    toCheck.forEach((v: any) => {
      expect(isEmpty(v)).toBe(!notEmpty(v));
    })
  });

  it('isNotEmpty works', () => {
    toCheck.forEach((v: any) => {
      expect(isEmpty(v)).toBe(!isNotEmpty(v));
    })
  });

});
