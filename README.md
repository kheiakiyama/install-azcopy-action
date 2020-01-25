# install-azcopy-action

<a href="https://github.com/kheiakiyama/install-azcopy-action/actions"><img alt="install-azcopy-action status" src="https://github.com/kheiakiyama/install-azcopy-action/workflows/build-test/badge.svg"></a>

# Usage

## Basic
```
steps:
- uses: actions/checkout@v2
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
- run: azcopy --source {SOURCE} --destination {DEST} --dest-key ${{ secrets.STORAGE_KEY }} --recursive --set-content-type
```

## Use with credential
```
steps:
- uses: actions/checkout@v2
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
    cred: ${{ secrets.AZURE_CREDENTIALS }}
- run: azcopy --source {SOURCE} --destination {DEST} --recursive --set-content-type
```

This credentials feature is for sharing same credentials with [azure-login](https://github.com/marketplace/actions/azure-login).  
How to create Azure credentials?  
-> Please check [azure-login page](https://github.com/marketplace/actions/azure-login#configure-azure-credentials).

# Develop

install-azcopy-action is tested below.
- ubuntu-latest
- macOS-latest
- windows-latest

See [develop-references.yml](develop-references.yml)
