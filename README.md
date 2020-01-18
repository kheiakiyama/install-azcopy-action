# install-azcopy-action

<a href="https://github.com/kheiakiyama/install-azcopy-action/actions"><img alt="install-azcopy-action status" src="https://github.com/kheiakiyama/install-azcopy-action/workflows/build-test/badge.svg"></a>

# Usage

```
steps:
- uses: actions/checkout@v2
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
- run: azcopy --source {SOURCE} --destination {DEST} --dest-key ${{ secrets.STORAGE_KEY }} --recursive --set-content-type
```

install-azcopy-action is tested below.
- ubuntu-latest
- macOS-latest
- windows-latest

# Develop

See [develop-references.yml](develop-references.yml)
