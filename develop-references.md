These documents are based on
[typescript-action](https://github.com/actions/typescript-action).

## Requirements

- node: >= 24.0.0
- npm: >= 11.0.0

## Development Flow

Install dependencies:

```bash
npm install
```

Format code:

```bash
npm run format:write
```

Check code formatting and lint:

```bash
npm run format:check
npm run lint
```

Run tests:

```bash
npm test
```

Bundle action for distribution (`dist/` directory):

```bash
npm run bundle
```

Run all verification steps (format, lint, test, coverage, package):

```bash
npm run all
```

## How to publish

Use the release helper script:

```bash
script/release
```

Or manually:

1. Make sure `dist/` is bundled and committed.
2. Tag a new semantic release:
   ```bash
   git tag -fa v1.x.x -m "Release v1.x.x"
   git tag -fa v1 -m "Update v1 tag"
   git push origin v1.x.x
   git push origin v1 --force
   ```

See the
[versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md).
