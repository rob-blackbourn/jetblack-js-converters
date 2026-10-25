# jetblack-converters

A TypeScript unit conversion library for Node.js and modern browsers, with exact
fraction arithmetic and built-in metric, imperial, customary, temperature,
kitchen utensil, and food definitions.

## Usage

```ts
import { REPOSITORY, Fraction, Real } from 'jetblack-converters';

const inches = REPOSITORY.find({ system: 'imperial', name: 'inch' });
const millimeters = REPOSITORY.find({ name: 'millimeter' });
if (inches && millimeters) {
  console.log(inches.convert(1, millimeters).valueOf()); // 25.4
}

const half = new Real(new Fraction(1, 2));
console.log(half.add(half).toString()); // "1"
```

CommonJS consumers can use `require('jetblack-converters')`. The package exports
`UnitConverter`, `DomainConverter`, `ConverterRepository`,
`DomainConverterRepository`, `REPOSITORY`, `Real`, `Fraction`, and the existing
`numbers` namespace. Lookups return `undefined` when no matching unit exists.

The build produces `dist/index.cjs` for CommonJS, `dist/index.mjs` for ES modules,
and declarations in `dist/types`. Bundlers select the ES module entry via package
exports. The ES2020 module has no runtime dependencies or Node-specific APIs and
can also be imported directly in modern browsers:

```html
<script type="module">
  import { REPOSITORY } from './dist/index.mjs';
  const meters = REPOSITORY.find({ name: 'meter' });
  const centimeters = REPOSITORY.find({ name: 'centimeter' });
  console.log(meters.convert(1, centimeters).valueOf()); // 100
</script>
```

For mass/volume conversions, supply the scalar (litres per gramme) as the fourth
argument to `REPOSITORY.convert(source, value, target, scalar)`. A missing scalar
throws an error. Converting units without a shared conversion path also throws.
Repository conversions between domains without a registered bridge return
`undefined`.

## Development

Requires Node.js 18 or newer.

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Tests use Jest with TypeScript checking through ts-jest. `npm pack` builds the
publishable package automatically; only build artifacts are included.

## Visual Studio Code

Open the repository root (the folder containing `.vscode`) in VS Code, then run
`npm ci` from `jetblack-converters` if dependencies are not installed. Install the
recommended Jest extension when prompted. The workspace points Jest at the
nested package and uses its installed TypeScript version; select **Use Workspace
Version** if VS Code prompts you.

- **Terminal > Run Build Task** builds the CommonJS and ES module outputs.
- **Terminal > Run Task > Typecheck** reports TypeScript errors in Problems.
- **Terminal > Run Test Task** runs the Jest suite. The recommended Jest extension
  also provides tests in the Testing panel.
- In **Run and Debug**, choose **Debug all Jest tests**, or open a `.test.ts` file
  and choose **Debug current Jest test file**. Set breakpoints in TypeScript and
  press F5. Both debug configurations work without the Jest extension.

TypeScript uses VS Code's built-in formatter. Generated build and coverage files
are excluded from workspace searches and file watching.
