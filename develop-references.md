These documents are copied from [typescript-action](https://github.com/actions/typescript-action/blob/master/README.md).

## Requirements
- node: v16.20.2
- npm: 8.19.4
- typescript: 4.9.5

## Code in Master

Install the dependencies  
```bash
$ npm install
```

Build the typescript
```bash
$ npm run build
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## How to publish

1. Make a release from `master` branch.  
(This repository intentionaly include `dist/` directory. It is used by users.)  
Write description about changes.  
Determine version name as `v(x.x.x)`.
2. Update `v(x)` tag for compatibility or create `v(x)` major version tag with following commands.
```
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

Your action is now published! :rocket: 

Try to test v1 on your github action like [this Action](https://github.com/kheiakiyama/kheiakiyama.github.com/actions/workflows/deploy-blob.yml).  


See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
