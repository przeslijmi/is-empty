
# @przeslijmi/is-empty

Modern, TypeScript-friendly utility for checking whether a value is *empty* — the spiritual successor to the old [`is-empty`](https://www.npmjs.com/package/is-empty) npm package.
It includes configuration options, type safety, and helper aliases for common patterns.

Using all options set to their **default values**, this package behaves exactly like the original `is-empty` package — just modernized for today’s JavaScript and TypeScript environments.

---

## 🚀 Installation

```bash
npm install @przeslijmi/is-empty
```

---

## 🧩 Usage

### Basic example

```ts
import { isEmpty } from '@przeslijmi/is-empty';

isEmpty(null);        // true
isEmpty(undefined);   // true
isEmpty('');          // true
isEmpty('text');      // false
isEmpty([]);          // true
isEmpty({});          // true
isEmpty([1]);         // false
```

---

## ⚙️ Options

You can globally or per-call control behavior through the `IsEmptyOptions` interface.

```ts
import { setIsEmptyOptions, isEmpty } from '@przeslijmi/is-empty';

setIsEmptyOptions({ treatSpacesAsEmpty: true });

isEmpty(' '); // true (because of global config)
isEmpty(' ', { treatSpacesAsEmpty: false }); // false (per-call override)
```

**Available options**

| Option                         | Type      | Default | Description |
|--------------------------------|-----------|---------|-------------|
| `treatBooleanAsNonEmpty`       | `boolean` | `true`  | When `true`, boolean values (`true` / `false`) are always treated as **non-empty**.                               |
| `treatSpaceAsEmpty`            | `boolean` | `false` | When `true`, strings containing only whitespace (e.g. `"   "`) are considered **empty**.                          |
| `treatZeroAsEmpty`             | `boolean` | `false` | When `true`, numeric `0` and string `"0"` are treated as **empty**.                                               |
| `treatNumericStringsAsNumbers` | `boolean` | `false` | When `true`, numeric-looking strings (e.g. `"42"`, `"3.14"`) are treated as numbers instead of strings.           |
| `testArraysRecursively`        | `boolean` | `true`  | When `true`, arrays are checked recursively — e.g. `[[]]` or `[null]` are considered **empty**.                   |
| `testFunctionsBody`            | `boolean` | `true`  | When `true`, functions are analyzed to determine if their body is **empty** (e.g. `function() {}` or `() => {}`). |

You can also pass `Partial<IsEmptyOptions>` so only the options you specify are overridden.

---

## 🧠 Helper functions

```ts
import {
  isEmpty,
  isNotEmpty,
  empty,
  notEmpty,
  undefinedIfEmpty,
} from '@przeslijmi/is-empty';
```

### `isNotEmpty(value, options?)`

Inverse of `isEmpty`.

```ts
isNotEmpty('abc'); // true
```

### `empty(value, options?)` and `notEmpty(value, options?)`

Alias helpers — same logic, different naming preferences.

### `undefinedIfEmpty<T>(value, options?)`

Returns `undefined` if value is empty, otherwise returns it typed as `T`.

```ts
undefinedIfEmpty('');     // undefined
undefinedIfEmpty('text'); // 'text'
```

That is especially usefull in chained calls:
```ts
const name = undefinedIfEmpty(formData.name) ?? 'Default Name';
```

---

## 🧪 Testing

This package is fully tested with [Vitest](https://vitest.dev/).

Run tests:

```bash
npm test
```

Example coverage includes:

* Handling of `null`, `undefined`, empty strings, arrays, and objects
* Configurable behavior for whitespace strings
* Function detection (including empty functions)
* Aliases and numeric conversion helpers

---

## 🧾 Versioning

This project follows **[Semantic Versioning (SemVer)](https://semver.org/)**:

- **MAJOR** version → breaking changes
- **MINOR** version → new features, backward compatible
- **PATCH** version → bug fixes and small improvements

All versions are published and tagged on [npm](https://www.npmjs.com/package/@przeslijmi/is-empty) and [GitHub Releases](https://github.com/przeslijmi/is-empty/releases).

---

## 📜 License

MIT © [Karol Nowakowski](https://github.com/przeslijmi)
